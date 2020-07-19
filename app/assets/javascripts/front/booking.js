document.addEventListener("turbolinks:load", async function() {
    if (app.dataset.controller === 'pages' && app.dataset.action === 'booking') {
        await initBooking();
    }
});

async function initBooking() {
    const bookingService = new BookingService(new BookingClient());
    await bookingService.login();

    console.log(await bookingService.getEvents());
    console.log(await bookingService.getAvailableTimes(1, '2020-07-20'));
}

class BookingClient {
    async getToken() {
        return this._client('/booking/token')
            .then(data => Promise.resolve(data.token));
    }

    async getEvents(token) {
        return this._client('/booking/events', {
            headers: {
                'X-Auth-Token': token
            }
        });
    }

    async getAvailableTimes(token, eventId, date) {
        return this._client(`/booking/available-times/${eventId}/${date}`, {
            headers: {
                'X-Auth-Token': token
            }
        });
    }

    async book(token) {
        return this._client(`/booking/add`, {
            method: 'POST',
            headers: {
                'X-Auth-Token': token
            }
        });
    }

    /**
     *
     * @param {Request|string} url
     * @param {RequestInit} initOptions
     * @returns {Promise<any>}
     * @private
     */
    async _client(url, initOptions = {}) {
        return fetch(url, initOptions)
            .then(response => response.json());
    }
}

class BookingService {
    _token = null;

    /**
     * @param {BookingClient} bookingClient
     */
    constructor(bookingClient) {
        this._bookingClient = bookingClient;
    }

    async login() {
        this._token = await this._bookingClient.getToken();
    }

    async getEvents() {
        return this._bookingClient.getEvents(this._token);
    }

    async getAvailableTimes(eventId, date) {
        return this._bookingClient.getAvailableTimes(this._token, eventId, date);
    }
}
