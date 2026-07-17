const API_URL = "http://localhost:8080/bookings";

const bookingTable = document.getElementById("bookingTable");
const searchInput = document.getElementById("searchBooking");

let bookings = [];

// =======================
// Load Bookings
// =======================

async function loadBookings() {

    try {

        const response = await fetch(API_URL);

        bookings = await response.json();

        displayBookings(bookings);

    }

    catch (error) {

        console.error(error);

        alert("Unable to load bookings.");

    }

}

// =======================
// Display Table
// =======================

function displayBookings(data) {

    bookingTable.innerHTML = "";

    if (data.length === 0) {

        bookingTable.innerHTML =

        `

        <tr>

            <td colspan="12"

            class="text-center">

            No Bookings Found

            </td>

        </tr>

        `;

        return;

    }

    data.forEach(booking => {

        bookingTable.innerHTML +=

        `

<tr>

<td>${booking.bookingId}</td>

<td>${booking.pnrNumber}</td>

<td>${booking.passengerName}</td>

<td>${booking.train?.trainNumber ?? "-"}</td>

<td>${booking.coach}-${booking.seatNumber}</td>

<td>${booking.journeyDate}</td>

<td>₹${booking.totalFare}</td>

<td>

<span class="badge bg-success">

${booking.paymentStatus}

</span>

</td>

<td>

<span class="badge bg-primary">

${booking.bookingStatus}

</span>

</td>

<td>

<button

class="btn btn-danger btn-sm"

onclick="cancelBooking(${booking.bookingId})">

Cancel

</button>

</td>

</tr>

`;

    });

}

// =======================
// Search
// =======================

searchInput.addEventListener("keyup", function () {

    const key = this.value.toLowerCase();

    const filtered = bookings.filter(booking =>

        booking.passengerName.toLowerCase().includes(key)

        ||

        booking.pnrNumber.toLowerCase().includes(key)

        ||

        booking.train?.trainNumber.toLowerCase().includes(key)

    );

    displayBookings(filtered);

});

// =======================
// Cancel Booking
// =======================

async function cancelBooking(id) {

    const ok = confirm("Cancel this booking?");

    if (!ok) return;

    try {

        const response = await fetch(

            API_URL + "/cancel/" + id,

            {

                method: "PUT"

            }

        );

        if (response.ok) {

            alert("Booking Cancelled");

            loadBookings();

        }

        else {

            alert("Cancellation Failed");

        }

    }

    catch (error) {

        console.error(error);

        alert("Server Error");

    }

}

loadBookings();