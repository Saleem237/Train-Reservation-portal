loadDashboard();

// Dashboard counts
function loadDashboard() {

    fetch("/users")
        .then(response => response.json())
        .then(data => {

            document.getElementById("totalUsers").innerText = data.length;

        });

    fetch("/trains")
        .then(response => response.json())
        .then(data => {

            document.getElementById("totalTrains").innerText = data.length;

        });

    fetch("/bookings")
        .then(response => response.json())
        .then(data => {

            document.getElementById("totalBookings").innerText = data.length;

        });

    fetch("/payments")
        .then(response => response.json())
        .then(data => {

            document.getElementById("totalPayments").innerText = data.length;

        });

}

// Logout
function logout() {

    localStorage.clear();

    window.location.href = "login.html";

}