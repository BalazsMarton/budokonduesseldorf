document.addEventListener('turbolinks:load', async function() {
    if (app.dataset.controller === 'pages' && app.dataset.action === 'booking') {
        await initBooking();
    }
});

async function initBooking() {
    const csrfToken = document.querySelector('meta[name=csrf-token]').getAttribute('content');
    const bookingClient = new BookingClient(csrfToken);
    const token = await bookingClient.getToken();
    const bookingService = new BookingService(bookingClient, token);

    console.log(await bookingService.getEvents());
    console.log(await bookingService.getNonWorkDays(2020, 10));
    console.log(await bookingService.getAvailableTimes(1, '2020-09-23'));
    //console.log(await bookingService.book(1, '2020-07-20', '13:00:00', 'name', 'email', '061234567'));
}
