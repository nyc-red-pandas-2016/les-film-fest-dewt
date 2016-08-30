class MoviesController < ApplicationController
  def index
    all_movies
  end

  def show
    movie = Movie.find(params[:id])
    render json: movie.to_json
  end


  private
  def all_movies
    movies = Movie.all
    render json: movies
  end

  def all_genres
    movies = Movie.all
    genres = movies.map{|movie| movie.genres}.flatten
    genresName = genres.map{|genre| genre.name}.uniq
     render json: genresName
  end
end
