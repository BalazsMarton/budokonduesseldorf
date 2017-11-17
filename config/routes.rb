Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'pages#home'

  get 'home', to: 'pages#home'
  get 'budokon', to: 'pages#budokon'
  get 'attila', to: 'pages#attila'
  get 'services', to: 'pages#services'
  get 'schedule', to: 'pages#schedule'
  get 'events', to: 'pages#events'
  get 'contact', to: 'pages#contact'
  get 'policy', to: 'pages#policy'

  get 'services/personal_training', to: 'pages#oneonone'
  get 'services/massage', to: 'pages#massage'
  get 'services/group_training', to: 'pages#group'
  
end
