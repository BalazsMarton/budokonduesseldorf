class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :set_gmapskey

  def set_gmapskey
    @gmaps_api_key = ENV['GMAPS_KEY']
  end

end
