Rails.application.routes.draw do
  devise_for :users, :controllers => {registrations: "users/registrations"}

  get 'genres', to: 'genres#index'
  get 'genres/:genre', to: 'genres#show'


  resources :movies, only: [:index, :show] do 
    resources :reviews, only: [:index, :show, :new, :create, :destroy]
  end

  post 'comments', to: 'comments#create'

  get 'users/:id', to: 'users#show'

  root to: "home#index"

  scope :auth do
    get 'is_signed_in', to: 'auth#is_signed_in?'
    post 'sign_user_in', to: 'auth#sign_user_in'
  end

end
