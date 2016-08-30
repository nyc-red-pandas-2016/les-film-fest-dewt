Rails.application.routes.draw do
  devise_for :users, :controllers => {registrations: "users/registrations"}

  get 'genres', to: 'genres#index'
  get 'genres/:genre', to: 'genres#show'


  resources :movies, only: [:index, :show] do 
    resources :reviews, only: [:index, :show, :new, :create, :destroy]
  end

  get 'comments/:id', to: 'comment#show'


  root to: "home#index"

  scope :auth do
    get 'is_signed_in', to: 'auth#is_signed_in?'
  end

end
