Rails.application.routes.draw do

  scope module: 'front' do
    root 'pages#home'

    get 'booking', to: 'pages#booking'
    get 'booking/token'

    post 'newsletter', to: 'newsletter#create', as: 'newsletter'

    get 'budokon', to: 'pages#budokon'
    get 'budokon/:id' => 'pages#budokon_show', as:'show_budokon'
    
    get 'classes', to: 'pages#classes'
    get 'classes/:id', to: 'pages#class_show', as:'show_class'

    get 'attila', to: 'pages#attila'
    get 'workshops', to: 'pages#workshops'
    get 'contacts', to: 'pages#contact'
    post 'contact', to: 'message#create'
    get 'contact_error', to: 'message#contact_error', as: 'contact_error'
    get 'contact_sent', to: 'message#contact_sent', as: 'contact_sent'
    get 'policy', to: 'pages#policy'

    scope "/services" do
      get 'personal_training', to: 'pages#oneonone'
      get 'massage', to: 'pages#massage'
    end

    get '/workshop/:id' => 'pages#workshop', as: 'show_workshop'
    post '/workshop/:id', to: 'applicant#create'
    
    #LEGACY
    #scope "/services" do
    #  get 'group_training', to: 'pages#group'
    #end
    #get 'home', to: 'pages#home'
    #get 'services', to: 'pages#services'
    #demo events
    #get 'event', to: 'pages#event'
    #get 'event2', to: 'pages#event2'
    #get 'event3', to: 'pages#event3'
    #get 'event4', to: 'pages#event4'
    #get 'event5', to: 'pages#event5'

  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  devise_for :admins, path: 'admin', skip: :registrations
  #scope module: 'admin', path: 'admin' do
  namespace :admin do
    root 'pages#adminpaneldemo'
    resources :events
    resources :applicants
    resources :creviews
    resources :budokoncards
    resources :ttdays
    resources :lessons
    resources :sponsors
  end

end
