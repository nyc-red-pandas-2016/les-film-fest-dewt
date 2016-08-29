class CreateReviews < ActiveRecord::Migration[5.0]
  def change
    create_table :reviews do |t|
      t.string :title, null: false
      t.text :body, null: false
      t.integer :movie_id, null: false
      t.integer :reviewer_id, null: false

      t.timestamps(null: false)
    end

    add_index :reviews, [:movie_id, :reviewer_id]
  end
end
