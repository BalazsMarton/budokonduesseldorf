class Front::BookingController < FrontController
    def initialize
        super
        @simply_book = SimplyBook.new
    end

    def token
        render json: {:token => @simply_book.get_token}
    end

    def events
        token = request.headers['X-Auth-Token']
        events = @simply_book.get_events(token)
        render json: events
    end

    def available_times
        token = request.headers['X-Auth-Token']
        event_id = params[:eventId]
        date = params[:date]

        available_times = @simply_book.get_available_times(token, event_id, date)
        render json: available_times
    end

    def work_days
        token = request.headers['X-Auth-Token']
        year = params[:year]
        month = params[:month]

        work_days = @simply_book.get_work_days(token, year, month)
        render json: work_days
    end

end
