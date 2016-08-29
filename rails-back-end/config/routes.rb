Rails.application.routes.draw do
  devise_for :users
  
  root to: "home#index"

  scope :auth do
    get 'is_signed_in', to: 'auth#is_signed_in?'
  end

end
