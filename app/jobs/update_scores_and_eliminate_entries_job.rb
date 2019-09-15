class UpdateScoresAndEliminateEntriesJob < ApplicationJob
  queue_as :default

  def perform(*args)
    # Do something later
    this_year = Time.now.year
    @this_weeks_games = Game.where(start_time: Time.now.beginning_of_week+1.day..Time.now.end_of_week+1.day)
    this_week = @this_weeks_games.first.week
    scrape_games(this_year, this_week)
    eliminate_losers
  end

  private
    def scrape_games(year, week)
      require 'net/http'
      uri = URI("http://www.nfl.com/ajax/scorestrip?season=#{year}&seasonType=REG&week=#{week.number}")
      xml = Net::HTTP.get(uri)
      hash = Hash.from_xml(xml)
      games = hash["ss"]["gms"]["g"]
      games.each do |game|
        final = game["q"] == "F" || game["q"] === "FO"
        next if !final
        home_team = Team.find_by(name: game["hnn"].capitalize)
        away_team = Team.find_by(name: game["vnn"].capitalize)
        home_team_id = home_team.id
        away_team_id = away_team.id
        home_team_score = game["hs"].to_i
        away_team_score = game["vs"].to_i
        winner = if home_team_score > away_team_score
          home_team_id
        elsif home_team_score < away_team_score
          away_team_id
        end
        
        game_to_update = @this_weeks_games.where(home_team_id: home_team_id)[0]
        next if !game_to_update
        game_to_update.update(
          home_team_score: home_team_score,
          away_team_score: away_team_score,
          final: final,
          winning_team_id: winner
        )
      end
    end

    def eliminate_losers
      @this_weeks_games.where(final: true).each do |game|
        Pick.where(game_id: game.id).each do |pick|
          next if pick.team_id == game.winning_team_id
          pick.entry.eliminate!
        end
      end
    end
end



