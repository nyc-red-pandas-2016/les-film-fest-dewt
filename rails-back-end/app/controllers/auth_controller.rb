class AuthController < ApplicationController
  def is_signed_in?
    if user_signed_in?
      render :json => {"signed_in" => true, "user" => current_user}.to_json()
    else
      render :json => {"signed_in" => false}.to_json()
    end

  end

  def sign_user_in(email)
    current_user = User.find_by(email)
    user_signed_in = true
  end

end
