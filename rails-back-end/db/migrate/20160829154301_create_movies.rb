class CreateMovies < ActiveRecord::Migration[5.0]
  def change
    create_table :movies do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.string :poster_url
      t.integer :year

      t.timestamps(null: false)
    end
  end
end
