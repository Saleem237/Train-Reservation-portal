const API_URL = "http://localhost:8080";

// ===============================
// Load Dashboard
// ===============================

window.onload = function () {

    loadDashboard();

    loadRecentBookings();

};

// ===============================
// Dashboard Cards
// ===============================

async function loadDashboard() {

    try {

        const response = await fetch(API_URL + "/admin/dashboard");

        const data = await response.json();

        document.getElementById("totalUsers").innerHTML = data.totalUsers;

        document.getElementById("totalTrains").innerHTML = data.totalTrains;

        document.getElementById("totalBookings").innerHTML = data.totalBookings;

        document.getElementById("cancelledBookings").innerHTML = data.cancelledBookings;

        document.getElementById("availableSeats").innerHTML = data.availableSeats;

        document.getElementById("totalRevenue").innerHTML =
            Number(data.totalRevenue).toFixed(2);

        createCharts(data);

    }

    catch (error) {

        console.log(error);

        alert("Unable to load Dashboard.");

    }

}

// ===============================
// Recent Bookings
// ===============================

async function loadRecentBookings() {

    try {

        const response = await fetch(API_URL + "/bookings");

        const bookings = await response.json();

        let table = document.getElementById("bookingTable");

        table.innerHTML = "";

        bookings.reverse();

        bookings.slice(0,10).forEach(booking => {

            let row = `
            <tr>

                <td>${booking.pnrNumber}</td>

                <td>${booking.passengerName ?? "-"}</td>

                <td>${booking.train.trainName}</td>

                <td>${booking.coach ?? "-"}</td>

                <td>${booking.seatNumber}</td>

                <td>

                    ${
                        booking.bookingStatus==="BOOKED"

                        ?

                        '<span class="badge bg-success">BOOKED</span>'

                        :

                        '<span class="badge bg-danger">CANCELLED</span>'
                    }

                </td>

                <td>

                    ₹${booking.totalFare}

                </td>

            </tr>
            `;

            table.innerHTML += row;

        });

    }

    catch(error){

        console.log(error);

    }

}

// ===============================
// Charts
// ===============================

function createCharts(data) {

    // -------- Booking Chart --------

    const bookingCanvas = document.getElementById("bookingChart");

    if (bookingCanvas) {

        new Chart(bookingCanvas, {

            type: "bar",

            data: {

                labels: [

                    "Users",
                    "Trains",
                    "Bookings",
                    "Cancelled"

                ],

                datasets: [{

                    label: "System Statistics",

                    data: [

                        data.totalUsers,
                        data.totalTrains,
                        data.totalBookings,
                        data.cancelledBookings

                    ],

                    backgroundColor: [

                        "#0d6efd",
                        "#198754",
                        "#fd7e14",
                        "#dc3545"

                    ],

                    borderRadius: 8

                }]

            },

            options: {

                responsive: true,

                plugins: {

                    legend: {

                        display: false

                    }

                },

                scales: {

                    y: {

                        beginAtZero: true

                    }

                }

            }

        });

    }

    // -------- Revenue Chart --------

    const revenueCanvas = document.getElementById("revenueChart");

    if (revenueCanvas) {

        new Chart(revenueCanvas, {

            type: "doughnut",

            data: {

                labels: [

                    "Revenue",
                    "Available Seats"

                ],

                datasets: [{

                    data: [

                        data.totalRevenue,
                        data.availableSeats

                    ],

                    backgroundColor: [

                        "#198754",
                        "#0d6efd"

                    ]

                }]

            },

            options: {

                responsive: true,

                plugins: {

                    legend: {

                        position: "bottom"

                    }

                }

            }

        });

    }

}

// ===============================
// Helper
// ===============================

function formatCurrency(value) {

    return "₹" + Number(value).toFixed(2);

}