Rails.application.routes.draw do
  get 'pages/root'

  root to: "pages#root"
end
