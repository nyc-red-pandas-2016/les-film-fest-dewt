class ReviewsController < ApplicationController
  def index
    movie = Movie.find(params[:movie_id])
    reviews = movie.reviews
    render json: reviews.to_json
  end

  def show
    print "Here are the params: #{params}"
    review = Review.find(params[:id])
    review_hash = { review: review, comments: review.comments }
    render json: review_hash.to_json
  end
end