class ReviewController < ApplicationController

  def show
    review = Review.find(params[:id])
    render json: review.to_json
  end
end