# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create!(username: "cauliflowerking", full_name: "Tony", email:"fake@email.com", encrypted_password: "password", type: "Reviewer")
User.create!(username: "dvdlin214", full_name: "David", email:"david@email.com", encrypted_password: "password", type: "Plebeian")
User.create!(username: "savagesnake", full_name: "Wolfgang", email:"wolfgang@email.com", encrypted_password: "password", type: "Reviewer")
User.create!(username: "marcomartinez10", full_name: "Marco", email:"marco@email.com", encrypted_password: "password", type: "Plebeian")
User.create!(username: "nwang9", full_name: "Nico", email:"nico@email.com", encrypted_password: "password", type: "Reviewer")
User.create!(username: "chainsawbucktooth", full_name: "Neill", email:"neill@email.com", encrypted_password: "password", type: "Plebeian")

Genre.create!(name: "action")
Genre.create!(name: "comedy")
Genre.create!(name: "romance")


Movie.create!(title: "Batman v Superman: Dawn of Justice", description: "Batman tries to kill Superman. Kills general Zod instead", poster_url: "http://t1.gstatic.com/images?q=tbn:ANd9GcS61fdKkVcQIKtObjNGAELqVwyzhwFoIfNGZVbC-rqta12xBfLa", year: 2016)
Movie.create!(title: "Suicide Squad", description: "Bad guys go on missions to kill other bad guys.", poster_url: "http://www.gstatic.com/tv/thumb/movieposters/11319046/p11319046_p_v8_af.jpg", year: 2016)
Movie.create!(title: "Titanic", description: "Pan and Juilia go on a cruise. Only Julia comes back. Celine Dion sings too.", poster_url: "http://t0.gstatic.com/images?q=tbn:ANd9GcQhYjUIu2o5v5u3rfJpCq5Cz0Q9WK--XdYxai_N2d0ImohPiIOp", year: 1997)
Movie.create!(title: "50 First Dates", description: "Guy goes on date with girl", poster_url: "http://www.gstatic.com/tv/thumb/movieposters/33587/p33587_p_v8_ab.jpg", year: 2004)
Movie.create!(title: "Zoolander", description: "Good looking guy saves the prime minister of Asian country", poster_url: "http://t2.gstatic.com/images?q=tbn:ANd9GcTSNVaidBcksRzbIxrYyxm-5Oyy_Z5ncdEcvR4R2sz8nzu1jg19", year: 2001)
Movie.create!(title: "Hot Fuzz", description: "Police officer goes to quiet town and arrests half the residents", poster_url: "http://www.gstatic.com/tv/thumb/movieposters/163411/p163411_p_v8_ad.jpg", year: 2007)

MovieGenre.create!(movie_id: 1, genre_id: 1)
MovieGenre.create!(movie_id: 2, genre_id: 1)
MovieGenre.create!(movie_id: 3, genre_id: 3)
MovieGenre.create!(movie_id: 4, genre_id: 3)
MovieGenre.create!(movie_id: 5, genre_id: 2)
MovieGenre.create!(movie_id: 6, genre_id: 2)


Review.create!(title: "Batman v Superman is a good film", body: "I really loved this film", movie_id: 1, reviewer_id: 1)
Review.create!(title: "Suicide squad is really boring", body: "Really hated this film", movie_id: 2, reviewer_id: 1)
Review.create!(title: "Titanic was very romantic", body: "I dont want to be on a boat anymore", movie_id: 3, reviewer_id: 3)
Review.create!(title: "Dating lesson", body: "The guy tries really hard", movie_id: 4, reviewer_id: 3)
Review.create!(title: "Modeling goes global", body: "I laughed alot", movie_id: 5, reviewer_id: 5)
Review.create!(title: "Very funny", body: "Being a police officer is a hard job", movie_id: 6, reviewer_id: 5)


Rating.create!(value: 5, movie_id: 1, user_id: 1)
Rating.create!(value: 5, movie_id: 2, user_id: 1)
Rating.create!(value: 4, movie_id: 3, user_id: 3)
Rating.create!(value: 4, movie_id: 4, user_id: 3)
Rating.create!(value: 3, movie_id: 5, user_id: 5)
Rating.create!(value: 3, movie_id: 6, user_id: 5)

Rating.create!(value: 5, movie_id: 1, user_id: 2)
Rating.create!(value: 5, movie_id: 3, user_id: 2)
Rating.create!(value: 2, movie_id: 2, user_id: 4)
Rating.create!(value: 2, movie_id: 4, user_id: 4)
Rating.create!(value: 1, movie_id: 5, user_id: 6)
Rating.create!(value: 1, movie_id: 6, user_id: 6)


Comment.create!(user_id: 1, review_id: 1, body: "First")
Comment.create!(user_id: 1, review_id: 4, body: "Totally agree")
Comment.create!(user_id: 2, review_id: 2, body: "Yep")
Comment.create!(user_id: 2, review_id: 3, body: "You suck")
Comment.create!(user_id: 3, review_id: 6, body: "False")
Comment.create!(user_id: 3, review_id: 5, body: "You go girl!!")
Comment.create!(user_id: 4, review_id: 4, body: "Did they pay you?")
Comment.create!(user_id: 4, review_id: 1, body: "boooo")
Comment.create!(user_id: 5, review_id: 2, body: "Bad review")
Comment.create!(user_id: 5, review_id: 3, body: "Yessir")
Comment.create!(user_id: 6, review_id: 4, body: "hahaha you're a joke")
Comment.create!(user_id: 6, review_id: 5, body: "Super job")
Comment.create!(user_id: 6, review_id: 6, body: "Great review")


Vote.create!(votable_id: 1, votable_type: "Comment", value: 1, user_id: 1)
Vote.create!(votable_id: 1, votable_type: "Review", value: 1, user_id: 2)
Vote.create!(votable_id: 1, votable_type: "Comment", value: 1, user_id: 3)
Vote.create!(votable_id: 1, votable_type: "Review", value: 1, user_id: 4)
Vote.create!(votable_id: 1, votable_type: "Comment", value: 1, user_id: 5)
Vote.create!(votable_id: 1, votable_type: "Review", value: 1, user_id: 6)
