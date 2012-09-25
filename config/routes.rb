TripcastStore::Application.routes.draw do
  root :to => "home#index"

  match '/login', :to => "sessions#new"
  delete '/logout' => "sessions#destroy"
  match '/auth/:provider/callback', :to => 'sessions#create'
end
