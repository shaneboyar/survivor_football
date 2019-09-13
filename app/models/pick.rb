class Pick < ApplicationRecord
  belongs_to :game
  belongs_to :team
  belongs_to :entry
end
