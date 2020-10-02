class BookingClient {
    constructor(csrfToken) {
        this._csrfToken = csrfToken;
    }

    async getToken() {
       const data = await this._client('/booking/token');

       return data['token'];
    }

    getEvents(token) {
        return this._client('/booking/events', {
            headers: {
                'X-Auth-Token': token
            }
        });
    }

    getNonWorkDays(token, year, month) {
        return this._client(`/booking/non-work-days/${year}/${month}`, {
            headers: {
                'X-Auth-Token': token
            }
        });
    }

    getAvailableTimes(token, eventId, date) {
        return this._client(`/booking/available-times/${eventId}/${date}`, {
            headers: {
                'X-Auth-Token': token
            }
        });
    }

    getTimeFrame(token) {
        return this._client('/booking/timeframe', {
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
     * @param {RequestInit} options
     * @returns {Promise<any>}
     * @private
     */
    async _client(url, options = {}) {
        const response = await fetch(url, options);

        return await response.json();
    }
}
