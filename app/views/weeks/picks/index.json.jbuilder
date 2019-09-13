json.array! @picks do |pick|
  json.id           pick.id
  json.entryName    pick.entry.nickname
  json.entryId      pick.entry.id
  json.gameId       pick.game_id
  json.teamId       pick.team_id
  json.deleteable   pick.entry.user.id == @current_user.id
end