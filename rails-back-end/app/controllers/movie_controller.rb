class MovieController < ApplicationController

  def show
    movie = Movie.find(params[:id])
    render json: movie.to_json
  end

end
