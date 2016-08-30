class ReviewsController < ApplicationController
  def index
    movie = Movie.find(params[:movie_id])
    reviews = movie.reviews
    render json: reviews.to_json
  end

  def show
    review = Review.find(params[:id])
    review_hash = { review: review, comments: review.comments }
    render json: review_hash.to_json
  end

  def create
    review = Review.new(review_params)
    if review.save
      render json: review.to_json
    end
  end

  private
  def review_params
    params.require(:review).permit(:title, :body, :reviewer_id, :movie_id)
  end
end