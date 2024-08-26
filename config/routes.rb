Rails.application.routes.draw do
  root 'application#index'
  namespace :api do
    resources :users do
      resources :addresses, only: [:index, :create, :update, :destroy]
    end
  end
end