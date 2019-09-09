class CreateTeams < ActiveRecord::Migration[6.0]
  def change
    create_table :teams do |t|
      t.string :location
      t.string :abbreviation
      t.string :name
      t.string :conference
      t.string :division

      t.timestamps
    end
  end
end
