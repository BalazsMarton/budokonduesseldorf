document.addEventListener("turbolinks:load", async function() {
  if (app.dataset.controller === "pages" && app.dataset.action === "booking") {
    await initBooking();
  }
});

async function initBooking() {
  const csrfToken = document
    .querySelector("meta[name=csrf-token]")
    .getAttribute("content");
  const bookingClient = new BookingClient(csrfToken);
  const token = await bookingClient.getToken();
  const bookingService = new BookingService(bookingClient, token);

  console.log(await bookingService.getEvents());
  console.log(await bookingService.getNonWorkDays(2020, 10));
  console.log(await bookingService.getAvailableTimes(1, "2020-09-23"));
  //console.log(await bookingService.book(1, '2020-07-20', '13:00:00', 'name', 'email', '061234567'));
  
    const eventSelectContainer = document.querySelector('.event-select-events');
    const eventCustomSelect = eventSelectContainer.querySelector('.custom-select');
    let eventSelectEvents = await bookingService.getEvents();
    let selectedEvent;
    const bookingTimetable = document.querySelector(".booking-timetable");

    
    eventSelectEvents.forEach((element, i)=>{
        eventCustomSelect.innerHTML += `
        <option data-index="${element['id']}" value="${element['id']}">${element['name']}</option>
        `;
    });
    
    eventCustomSelect.addEventListener('change', function(){
        selectedEvent = this.selectedOptions[0].getAttribute('data-index');
        bookingTimetable.innerHTML = "";
    })

  $(".datepicker-container .booking-datepicker")
    .datepicker({
      dateFormat: "yy-mm-dd"
    })
    .on("changeDate", function(e) {
      let dd = e.date.getDate();
      let mm = e.date.getMonth() + 1;
      let yyyy = e.date.getFullYear();
      let actualDate = yyyy + "-" + mm + "-" + dd;

      bookingTimetable.innerHTML = "";
      
      bookingService.getAvailableTimes(selectedEvent, actualDate).then(timetableData => {
        let backdate = Object.keys(timetableData)[0];
        let result = timetableData[backdate];

        result.forEach(element => {
          bookingTimetable.innerHTML += `<div class="select-time button-link btn btn-outline-secondary btn-lg" data-bookhour="${element}">${element}</div>`;
        });

        let selectTimes = document.querySelectorAll(".select-time");

        selectTimes.forEach(element =>(element.onclick = function() {
            let bookHour = this.dataset.bookhour;

            let datepickerContainer = document.querySelector(".datepicker-container");

            datepickerContainer.innerHTML = `
            <div class="col-md-6 col-sm-12 offset-md-3">
                <form class="book-form" id="book-form">
                    <div class="row inputs-wrap">

                        <div class="form-group col-sm-12">
                        <input placeholder="Name" class="form-control" type="text" name="book[name]" id="book_name">
                        </div>

                        <div class="form-group col-sm-12">
                        <input placeholder="Email" class="form-control" type="text" name="book[email]" id="book_email">
                        </div>

                        <div class="form-group col-sm-12">
                        <input placeholder="PhoneNr" class="form-control" name="book[phonenr]" id="book_phonenr">
                        </div>
                    </div>
                    <div class="row">
                        <div class="book-error-message col-sm-12" style="color:red"></div>
                    </div>

                    <div class="row submit-wrap">
                        <div class="field col-sm-12">
                            <input type="submit" name="commit" value="Send" id="book_submit" class="button-link pull-right btn btn-outline-secondary btn-lg" data-disable-with="Send">
                        </div>
                    </div>
                </form>		
            </div>
                `;

            
                const bookSubmitButton= document.querySelector('#book_submit');
                
                
                bookSubmitButton.addEventListener('click', (e)=>{
                    e.preventDefault();
                    let inputsWrap = document.querySelector('.inputs-wrap');
                    let bookErrorWrap = document.querySelector('.book-error-message');
                    let bookName = document.querySelector('#book_name').value; 
                    let bookEmail = document.querySelector('#book_email').value;
                    let bookPhonenr = document.querySelector('#book_phonenr').value;
                    
                    function statusCondition(response){
                        if(response.hasOwnProperty('error')){
                            bookErrorWrap.innerHTML = response['error']['message']
                        }
                        else{
                            datepickerContainer.innerHTML='<p style="color:green">Thank you for your booking.</p>'
                        }
                        
                    }
                    
                    bookingService.book(1, actualDate, bookHour, bookName, bookEmail, bookPhonenr)
                    .then(statusCondition)
                })
            })

        );
      });
    });
}
