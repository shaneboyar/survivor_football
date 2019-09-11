class CreateWeeks < ActiveRecord::Migration[6.0]
  def change
    create_table :weeks do |t|
      t.integer :number
      t.boolean :current

      t.timestamps
    end
  end
end
