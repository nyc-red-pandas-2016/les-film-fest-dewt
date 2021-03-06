class MoviesController < ApplicationController
  def index
    all_movies
  end

  def show
    movie = Movie.find(params[:id])
    average_rating = '%.4f' % (movie.ratings.pluck("value").sum.to_f / movie.ratings.length)
    users_who_rated = movie.ratings.pluck("user_id")
    movie_hash = { movieInfo: movie, averageRating: average_rating, usersWhoRated: users_who_rated }
    render json: movie_hash.to_json 
  end


  private
  def all_movies
    @movies = Movie.all
    render json:@movies
  end
end
