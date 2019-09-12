class Game < ApplicationRecord
  belongs_to :week
  belongs_to :home_team, class_name: 'Team', foreign_key: 'home_team_id'
  belongs_to :away_team, class_name: 'Team', foreign_key: 'away_team_id'
  enum winner: [ 'home', 'away', 'tie' ]

  def home_team_name
    home_team.name
  end

  def away_team_name
    away_team.name
  end

  def winner_name
    if (start_time + 4.hours) > Time.now
      ''
    elsif winner == "home"
      home_team_name
    elsif winner == "away"
      away_team_name
    else
      'Tie'
    end
  end
end
