# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Populate Teams
Team.create(name:'Cardinals',abbreviation:'ARI',conference:'NFC',division:'West',location:'Arizona')
Team.create(name:'Falcons',abbreviation:'ATL',conference:'NFC',division:'South',location:'Atlanta')
Team.create(name:'Ravens',abbreviation:'BAL',conference:'AFC',division:'North',location:'Baltimore')
Team.create(name:'Bills',abbreviation:'BUF',conference:'AFC',division:'East',location:'Buffalo')
Team.create(name:'Panthers',abbreviation:'CAR',conference:'NFC',division:'South',location:'Carolina')
Team.create(name:'Bears',abbreviation:'CHI',conference:'NFC',division:'North',location:'Chicago')
Team.create(name:'Bengals',abbreviation:'CIN',conference:'AFC',division:'North',location:'Cincinnati')
Team.create(name:'Browns',abbreviation:'CLE',conference:'AFC',division:'North',location:'Cleveland')
Team.create(name:'Cowboys',abbreviation:'DAL',conference:'NFC',division:'East',location:'Dallas')
Team.create(name:'Broncos',abbreviation:'DEN',conference:'AFC',division:'West',location:'Denver')
Team.create(name:'Lions',abbreviation:'DET',conference:'NFC',division:'North',location:'Detroit')
Team.create(name:'Packers',abbreviation:'GB',conference:'NFC',division:'North',location:'Green Bay')
Team.create(name:'Texans',abbreviation:'HOU',conference:'AFC',division:'South',location:'Houston')
Team.create(name:'Colts',abbreviation:'IND',conference:'AFC',division:'South',location:'Indianapolis')
Team.create(name:'Jaguars',abbreviation:'JAX',conference:'AFC',division:'South',location:'Jacksonville')
Team.create(name:'Chiefs',abbreviation:'KC',conference:'AFC',division:'West',location:'Kansas City')
Team.create(name:'Dolphins',abbreviation:'MIA',conference:'AFC',division:'East',location:'Miami')
Team.create(name:'Vikings',abbreviation:'MIN',conference:'NFC',division:'North',location:'Minnesota')
Team.create(name:'Patriots',abbreviation:'NE',conference:'AFC',division:'East',location:'New England')
Team.create(name:'Saints',abbreviation:'NO',conference:'NFC',division:'South',location:'New Orleans')
Team.create(name:'Giants',abbreviation:'NYG',conference:'NFC',division:'East',location:'NY')
Team.create(name:'Jets',abbreviation:'NYJ',conference:'AFC',division:'East',location:'NY')
Team.create(name:'Raiders',abbreviation:'OAK',conference:'AFC',division:'West',location:'Oakland')
Team.create(name:'Eagles',abbreviation:'PHI',conference:'NFC',division:'East',location:'Philadelphia')
Team.create(name:'Steelers',abbreviation:'PIT',conference:'AFC',division:'North',location:'Pittsburgh')
Team.create(name:'Chargers',abbreviation:'LAC',conference:'AFC',division:'West',location:'Los Angeles')
Team.create(name:'49ers',abbreviation:'SF',conference:'NFC',division:'West',location:'San Francisco')
Team.create(name:'Seahawks',abbreviation:'SEA',conference:'NFC',division:'West',location:'Seattle')
Team.create(name:'Rams',abbreviation:'LA',conference:'NFC',division:'West',location:'Los Angeles')
Team.create(name:'Buccaneers',abbreviation:'TB',conference:'NFC',division:'South',location:'Tampa Bay')
Team.create(name:'Titans',abbreviation:'TEN',conference:'AFC',division:'South',location:'Tennessee')
Team.create(name:'Redskins',abbreviation:'WAS',conference:'NFC',division:'East',location:'Washington')

# Create Weeks
16.times do |i|
  Week.create(number: i+1, current: false)
end

# Populate Weeks
require 'net/http'

(1..17).each do |i|
  uri = URI("http://www.nfl.com/ajax/scorestrip?season=2019&seasonType=REG&week=#{i}")
  xml = Net::HTTP.get(uri)
  hash = Hash.from_xml(xml)
  games = hash["ss"]["gms"]["g"]
  games.each do |game|
    home_team_id = Team.find_by(name: game["hnn"].capitalize).id
    away_team_id = Team.find_by(name: game["vnn"].capitalize).id
    home_team_score = game["hs"].to_i
    away_team_score = game["vs"].to_i
    date = game["eid"][0..7].to_date
    time = Time.parse(game["t"]).seconds_since_midnight.seconds + 12.hours.seconds
    start_time = date + time
    winner = if home_team_score == away_team_score
      2
    elsif home_team_score > away_team_score
      0
    else
      1
    end
    final = start_time < Time.now

    Game.create(home_team_id: home_team_id, away_team_id: away_team_id, week_id: 0, start_time: start_time, home_team_score: home_team_score, away_team_score: away_team_score, final: final, winner: winner)
  end
end
