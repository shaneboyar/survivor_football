json.id             @league.id
json.name           @league.name
json.created_by     @league.creator.name || @league.creator.email
json.otherEntries        @league.entries.where.not(user_id: @current_user.id) do |entry|
  json.id             entry.id
  json.name           entry.nickname || entry.user.name
  json.email          entry.user.email
  json.eliminated     entry.eliminated
end
json.userEntries   @league.entries.where(user_id: @current_user.id) do |entry|
  json.id             entry.id
  json.name           entry.nickname || entry.user.name
  json.email          entry.user.email
  json.eliminated     entry.eliminated
end

