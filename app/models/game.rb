class Game < ApplicationRecord
  belongs_to :week
  belongs_to :home_team, class_name: 'Team', foreign_key: 'home_team_id'
  belongs_to :away_team, class_name: 'Team', foreign_key: 'away_team_id'

  def home_team_name
    home_team.name
  end

  def away_team_name
    away_team.name
  end
end
