class CreateEntries < ActiveRecord::Migration[6.0]
  def change
    create_table :entries do |t|
      t.references :user, null: false, foreign_key: true
      t.references :league, null: false, foreign_key: true
      t.boolean :eliminated, default: false
      t.string :nickname

      t.timestamps
    end
  end
end
