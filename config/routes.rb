Rails.application.routes.draw do
  devise_for :users
  get 'pages/root'

  root to: "pages#root"
end
