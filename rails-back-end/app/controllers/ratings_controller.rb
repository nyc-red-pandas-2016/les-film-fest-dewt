class RatingsController < ApplicationController
  def create
    rating = Rating.new(rating_params)
    movie = Movie.find(params[:movie_id])
    if rating.save
      new_average = '%.4f' % (movie.ratings.pluck("value").sum.to_f / movie.ratings.length)
      render json: new_average.to_json
    end
  end

  private
  def rating_params
    params.require(:rating).permit(:value, :user_id, :movie_id)
  end
end