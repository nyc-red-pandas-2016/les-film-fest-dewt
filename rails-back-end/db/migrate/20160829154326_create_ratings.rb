class CreateRatings < ActiveRecord::Migration[5.0]
  def change
    create_table :ratings do |t|
      t.integer :value, null: false
      t.integer :movie_id, null: false
      t.integer :user_id, null: false

      t.timestamps(null: false)
    end
  end
end
