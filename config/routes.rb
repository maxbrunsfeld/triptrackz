TripcastStore::Application.routes.draw do
  root :to => "home#index"

  match '/login', :to => "sessions#new", :as => :login
  delete '/logout' => "sessions#destroy"
  match '/auth/:provider/callback', :to => 'sessions#create'

  # only in specs
  get '/specs' => "specs#index"

  resources 'tripclips'
  resources 'users'
end
