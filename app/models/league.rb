class League < ApplicationRecord
  belongs_to :creator, class_name: 'User', foreign_key: 'created_by_id'
  has_many :entries
  has_many :users, through: :entries
end
