class CreateLeagues < ActiveRecord::Migration[6.0]
  def change
    create_table :leagues do |t|
      t.string :name
      t.integer :created_by_id, null: false

      t.timestamps
    end
    add_index :leagues, :created_by_id
  end
end
