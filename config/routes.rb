Rails.application.routes.draw do
  resources :teams
  devise_for :users
  get 'pages/root'

  root to: "pages#root"
end
