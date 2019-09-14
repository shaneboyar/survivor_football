json.array! @games do |game|
  json.id             game.id
  json.weekNumber     game.week.number
  json.weekId         game.week.id
  json.startTime      game.start_time
  json.homeTeamId     game.home_team.id
  json.homeTeamName   game.home_team.name
  json.homeTeamScore  game.home_team_score
  json.awayTeamId     game.away_team.id
  json.awayTeamName   game.away_team.name
  json.awayTeamScore  game.away_team_score
  json.final          game.final
  json.winningTeamId  game.winning_team_id
end