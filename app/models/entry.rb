class Entry < ApplicationRecord
  belongs_to :user
  belongs_to :league
  has_many :picks


  def eliminate!
    update_attribute(:eliminated, true)
  end
end
