Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'pages#home'

  get 'home', to: 'pages#home'
  get 'budokon', to: 'pages#budokon'
  get 'attila', to: 'pages#attila'
  get 'services', to: 'pages#services'
  get 'schedule', to: 'pages#schedule'
  get 'events', to: 'pages#events'
  get 'event', to: 'pages#event'
  get 'contacts', to: 'pages#contact'
  post 'contact', to: 'message#create'
  get 'contact_error', to: 'message#contact_error', as: 'contact_error'
  get 'contact_sent', to: 'message#contact_sent', as: 'contact_sent'
  get 'policy', to: 'pages#policy'

  scope "/services" do
    get 'personal_training', to: 'pages#oneonone'
    get 'massage', to: 'pages#massage'
    get 'group_training', to: 'pages#group'
  end

end
