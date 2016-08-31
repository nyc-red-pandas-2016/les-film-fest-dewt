class ReviewsController < ApplicationController
  def index
    movie = Movie.find(params[:movie_id])
    reviews = movie.reviews
    reviews_array = []
    reviews.each do |review|
      reviews_array << { reviewContent: review, comments: review.comments }
    end
    render json: reviews_array.to_json
  end

  def show
    review = Review.find(params[:id])
    review_hash = { review: review, comments: review.comments }
    render json: review_hash.to_json
  end

  def create
    review = Review.new(review_params)
    review_object = { reviewContent: review, comments: [] }
    if review.save
      render json: review_object.to_json
    end
  end

  private
  def review_params
    params.require(:review).permit(:title, :body, :reviewer_id, :movie_id)
  end
end