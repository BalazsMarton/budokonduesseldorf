class Front::BookingController < FrontController
    def token
        @token = Simplybook.get_token
        render json: {:token => @token}
    end

    def events
        @events = Simplybook.get_eventlist
        render json: {:token => @events}
    end

end