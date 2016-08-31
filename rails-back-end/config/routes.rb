Rails.application.routes.draw do
  devise_for :users, :controllers => {registrations: "users/registrations", sessions: "users/sessions"}

  get 'genres', to: 'genres#index'
  get 'genres/:genre', to: 'genres#show'

  get 'reviews/:id/users/:user_id/upvote', to: 'votes#upvote_review'
  get 'reviews/:id/users/:user_id/downvote', to: 'votes#downvote_review'

  get 'comments/:id/users/:user_id/upvote', to: 'votes#upvote_comment'
  get 'comments/:id/users/:user_id/downvote', to: 'votes#downvote_comment'


  resources :movies, only: [:index, :show] do
    resources :reviews, only: [:index, :show, :new, :create, :destroy]
  end

  post 'comments', to: 'comments#create'

  post 'ratings', to: 'ratings#create'

  get 'users/:id', to: 'users#show'

  root to: "home#index"

  scope :auth do
    get 'is_signed_in', to: 'auth#is_signed_in?'
    post 'sign_user_in', to: 'auth#sign_user_in'
  end

end
