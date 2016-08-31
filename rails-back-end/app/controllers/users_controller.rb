class UsersController < ApplicationController
  def show
    user = User.find(params[:id])
    user.type == "Reviewer" ? reviewer = true : reviewer = false
    user_response = {userInfo: user, reviewerStatus: reviewer }
    render json: user_response.to_json
  end
end