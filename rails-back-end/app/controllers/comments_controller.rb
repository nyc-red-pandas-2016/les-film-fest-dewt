class CommentsController < ApplicationController
  def create
    comment = Comment.new(comment_params)
    if comment.save
      render json: comment.to_json
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:body, :user_id, :review_id)
  end
end