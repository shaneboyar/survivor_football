json.array! @games do |game|
  json.id game.id
  json.weekNumber game.week.number
  json.startTime game.start_time
  json.homeTeamName game.home_team.name
  json.homeTeamScore game.home_team_score
  json.awayTeamName game.away_team.name
  json.awayTeamScore game.away_team_score
  json.final game.final
  json.winner game.winner_name
end