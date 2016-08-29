Rails.application.routes.draw do
  devise_for :users, :controllers => {registrations: "users/registrations"}
  get 'movies/:id', to: 'movie#show'

  root to: "home#index"

  scope :auth do
    get 'is_signed_in', to: 'auth#is_signed_in?'
  end

end
