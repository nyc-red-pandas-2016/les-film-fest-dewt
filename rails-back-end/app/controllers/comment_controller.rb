class CommentController < ApplicationController

  def show
    comment = Comment.find(params[:id])
    render json: comment.to_json
  end
end