json.array! @leagues do |league|
  json.id league.id
  json.name league.name
  json.creator league.creator.name || league.creator.email
  json.deleteable league.creator.id == @current_user.id
end