class AddColumnsToTeams < ActiveRecord::Migration[5.1]
  def change
    add_column :teams, :abbreviation, :string
    add_column :teams, :conference, :string
    add_column :teams, :division, :string
  end
end
