Rails.application.routes.draw do
  api_guard_routes for: 'users'
  namespace :api do
    namespace :v1 do
      resources :teams, only: [:index, :show]
      resources :games, only: [:index, :show]
      resources :leagues do
        resources :entries, controller: 'leagues/entries' do
          resources :weeks, only: [] do
            resources :picks, controller: 'leagues/entries/weeks/picks'
          end
        end
      end
      resources :weeks do
        resources :games, only: [:index]
        resources :picks, controller: 'weeks/picks'
      end
      resources :picks
    end
  end
end
