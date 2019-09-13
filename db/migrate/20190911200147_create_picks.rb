class CreatePicks < ActiveRecord::Migration[6.0]
  def change
    create_table :picks do |t|
      t.integer :entry_id
      t.integer :game_id
      t.integer :team_id
      t.boolean :correct

      t.timestamps
    end
  end
end
