Rails.application.routes.draw do
  api_guard_routes for: 'users'
  namespace :api do
    namespace :v1 do
      resources :teams
    end
  end
end
