json.array! @entries do |entry|
  json.id           entry.id
  json.nickname     entry.nickname
  json.leagueId     entry.league.id
  json.eliminated   entry.eliminated
  json.deleteable   entry.user.id == @current_user.id
end