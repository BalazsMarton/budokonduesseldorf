Rails.application.routes.draw do

  scope module: 'front' do
    root 'pages#home'

    get 'home', to: 'pages#home'
    get 'budokon', to: 'pages#budokon'
    get 'attila', to: 'pages#attila'
    get 'services', to: 'pages#services'
    get 'schedule', to: 'pages#schedule'
    get 'events', to: 'pages#events'
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

    #demo events
    get 'event', to: 'pages#event'
    get 'event2', to: 'pages#event2'
    get 'event3', to: 'pages#event3'
    get 'event4', to: 'pages#event4'
    get 'event5', to: 'pages#event5'

  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  devise_for :admins, path: 'admin', skip: :registrations
  scope module: 'admin', path: 'admin' do
    root 'pages#adminpaneldemo'
  end

end
