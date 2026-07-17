const API_URL = "http://localhost:8080/bookings";


// ===============================
// Check Login
// ===============================

const loggedInUser = JSON.parse(
    sessionStorage.getItem("loggedInUser")
);


if (!loggedInUser) {

    alert("Please login first!");

    window.location.href = "login.html";

}


const userId = loggedInUser.id;



// ===============================
// Load Bookings
// ===============================

window.onload = function () {

    loadBookings();

};



function loadBookings() {


    fetch(API_URL + "/user/" + userId)

        .then(response => {


            if (!response.ok) {

                throw new Error("Unable to load bookings.");

            }


            return response.json();


        })


        .then(bookings => {


            displayBookings(bookings);


        })


        .catch(error => {


            console.error(error);

            alert(error.message);


        });


}




// ===============================
// Display Bookings
// ===============================

function displayBookings(bookings) {


    let rows = "";


    if (bookings.length === 0) {


        rows = `

        <tr>

            <td colspan="10" 
            class="text-center text-danger">

                No Bookings Found

            </td>

        </tr>

        `;


    }

    else {


        bookings.forEach(booking => {


            let badgeClass =
            booking.bookingStatus === "BOOKED"
            ?
            "bg-success"
            :
            "bg-danger";



            rows += `


            <tr>


                <td>
                    ${booking.bookingId}
                </td>



                <td>

                    ${booking.pnrNumber}

                </td>



                <td>

                    ${booking.train.trainNumber}

                    <br>

                    <small>
                    ${booking.train.trainName}
                    </small>

                </td>



                <td>

                    ${booking.passengerName}

                </td>




                <td>

                    ${booking.coach}

                </td>




                <td>

                    <span class="badge bg-primary">

                        ${booking.seatNumber}

                    </span>

                </td>




                <td>

                    ${booking.journeyDate}

                </td>




                <td>

                    ₹${booking.totalFare}

                </td>




                <td>


                    <span class="badge ${badgeClass}">

                        ${booking.bookingStatus}

                    </span>


                </td>




                <td>


                    ${
                        booking.bookingStatus === "BOOKED"

                        ?

                        `

                        <button

                        class="btn btn-danger btn-sm"

                        onclick="cancelBooking(${booking.bookingId})">


                            Cancel


                        </button>


                        `

                        :

                        `

                        <span class="text-danger fw-bold">

                            Cancelled

                        </span>


                        `

                    }


                </td>



            </tr>


            `;



        });


    }



    document.getElementById("bookingTable").innerHTML = rows;


}





// ===============================
// Cancel Booking
// ===============================

function cancelBooking(id) {


    if(!confirm("Are you sure you want to cancel this booking?")) {

        return;

    }



    fetch(API_URL + "/cancel/" + id, {


        method:"PUT"


    })


    .then(response=>{


        if(!response.ok){


            throw new Error("Unable to cancel booking.");


        }


        return response.text();


    })


    .then(message=>{


        alert(message);


        loadBookings();


    })


    .catch(error=>{


        console.error(error);


        alert(error.message);


    });



}




// ===============================
// Logout
// ===============================

function logout(){


    sessionStorage.clear();


    window.location.href="login.html";


}