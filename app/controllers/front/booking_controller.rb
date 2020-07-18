class Front::BookingController < FrontController
    def token
        @token = Simplybook.get_token
        render json: {:token => @token}
    end
end