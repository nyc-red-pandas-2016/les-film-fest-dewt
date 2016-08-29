Rails.application.routes.draw do
  devise_for :users, :controllers => {registrations: "users/registrations"}

  root to: "home#index"

  scope :auth do
    get 'is_signed_in', to: 'auth#is_signed_in?'
  end

end
