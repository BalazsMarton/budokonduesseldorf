document.addEventListener("turbolinks:load", async function() {
    if (app.dataset.controller === 'pages' && app.dataset.action === 'booking') {
        await initBooking();
    }
});

async function initBooking() {
    const csrfToken = document.querySelector('meta[name=csrf-token]').getAttribute('content');
    const bookingClient = new BookingClient(csrfToken);
    const bookingService = new BookingService(bookingClient);
    await bookingService.login();

    console.log(await bookingService.getEvents());
    console.log(await bookingService.getNonWorkDays(2020, 7));
    console.log(await bookingService.getAvailableTimes(1, '2020-07-20'));
    //console.log(await bookingService.book(1, '2020-07-20', '13:00:00', 'name', 'email', '061234567'));
}

class BookingClient {
    constructor(csrfToken) {
        this._csrfToken = csrfToken;
    }

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

    async getNonWorkDays(token, year, month) {
        return this._client(`/booking/non-work-days/${year}/${month}`, {
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

    async book(token, data) {
        return this._client(`/booking/book`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': token,
                'X-CSRF-Token': this._csrfToken
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

    async getNonWorkDays(year, month) {
        return this._bookingClient.getNonWorkDays(this._token, year, month);
    }

    async getAvailableTimes(eventId, date) {
        return this._bookingClient.getAvailableTimes(this._token, eventId, date);
    }

    async book(eventId, date, time, name, email, phone) {
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
