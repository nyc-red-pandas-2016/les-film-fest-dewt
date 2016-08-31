class VotesController < ApplicationController

  def upvote_review
    review = Review.find(params[:id])
    review.votes.create(value: 1, user_id: params[:user_id])
  end

  def downvote_review
    review = Review.find(params[:id])
    review.votes.create(value: -1, user_id: params[:user_id])
  end

  def upvote_comment
    comment = Comment.find(params[:id])
    comment.votes.create(value: 1, user_id: params[:user_id])
  end

  def downvote_comment
    comment = Comment.find(params[:id])
    comment.votes.create(value: -1, user_id: params[:user_id])
  end

end
