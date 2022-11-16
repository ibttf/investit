Rails.application.routes.draw do
  resources :tickers, only: [:index]
  resources :portfolios

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  resources :users, only: [:create,:show]
  get "/buying_power", to: "portfolios#buying_power"
  get "/account_value", to: "portfolios#account_value"
  get "/tickers", to: "users#tickers"
  get "/me", to: "users#show"
  get "/daily_change", to: "portfolios#daily_change"
  get "/total_change", to: "portfolios#total_change"
  
  patch "/trade", to: "tickers#trade"
  post "/login", to: "sessions#create"
  post "/signup", to: "users#create"

  delete "/logout", to: "sessions#destroy"
  
  # Defines the root path route ("/")
  # root "articles#index"
end
