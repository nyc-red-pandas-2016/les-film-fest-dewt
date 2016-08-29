# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create!(username: "cauliflowerking", full_name: "Tony", email:"fake@email.com", encrypted_password: "password", type: "Reviewer")
User.create!(username: "dvdlin214", full_name: "David", email:"david@email.com", encrypted_password: "password", type: "Plebeian")
Genre.create!(name: "action")
Movie.create!(title: "Action Movie", description: "Action film", poster_url: "www.google.com", year: 2007)
MovieGenre.create!(movie_id: 1, genre_id: 1)
Review.create!(title: "Great film", body: "Loved this film", movie_id: 1, reviewer_id: 1)
Rating.create!(value: 5, movie_id: 1, user_id: 2)
Comment.create!(user_id: 2, review_id: 1, body: "Great review")
Vote.create!(votable_id: 1, votable_type: "Comment", value: 1, user_id: 1)
Vote.create!(votable_id: 1, votable_type: "Review", value: 1, user_id: 2)