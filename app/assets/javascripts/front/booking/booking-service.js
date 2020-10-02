class BookingService {

    /**
     * @param {BookingClient} bookingClient
     * @param {String} token
     */
    constructor(bookingClient, token) {
        this._bookingClient = bookingClient;
        this._token = token;
    }

    getEvents() {
        return this._bookingClient.getEvents(this._token);
    }

    getNonWorkDays(year, month) {
        return this._bookingClient.getNonWorkDays(this._token, year, month);
    }

    getAvailableTimes(eventId, date) {
        return this._bookingClient.getAvailableTimes(this._token, eventId, date);
    }

    getTimeFrame() {
        return this._bookingClient.getTimeFrame(this._token);
    }

    book(eventId, date, time, name, email, phone) {
        return this._bookingClient.book(this._token, {
            eventId,
            date,
            time,
            clientData: {
                name,
                email,
                phone
            }
        });
    }
}
