class GenresController < ApplicationController
  def index
    all_genres
  end
  def show
    filter_genre
  end
  private
  def filter_genre
    moviesGenre = Genre.find_by(name:params[:genre]).movies
    render json:moviesGenre
  end
  def all_genres
    genres = Genre.all
    render json:genres
  end
end
