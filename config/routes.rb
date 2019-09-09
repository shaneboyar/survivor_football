Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :teams
    end
  end
end
