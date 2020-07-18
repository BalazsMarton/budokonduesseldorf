class Front::BookingController < FrontController
    def token
        @token = Simplybook.get_token
        render json: {:token => @token}
    end

    def events
        @token = request.headers['X-Auth-Token']
        @events = Simplybook.get_eventlist(token)
        render json: {:events => @events}
    end

end
