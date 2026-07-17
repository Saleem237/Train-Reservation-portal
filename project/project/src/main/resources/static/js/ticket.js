const API_URL = "http://localhost:8080";

window.onload = function () {
    loadTicket();
};

async function loadTicket() {
    try {
        const confirmedBooking = JSON.parse(sessionStorage.getItem("confirmedBooking"));

        if (confirmedBooking) {
            displayTicket(confirmedBooking);
            return;
        }

        const user = JSON.parse(sessionStorage.getItem("loggedInUser"));
        if (!user) {
            alert("Please login first");
            window.location.href = "login.html";
            return;
        }

        const response = await fetch(`${API_URL}/bookings/user/${user.id}`);
        if (!response.ok) {
            throw new Error("Unable to get ticket");
        }

        const bookings = await response.json();
        if (bookings.length === 0) {
            alert("No ticket found");
            return;
        }

        const ticket = bookings[bookings.length - 1];
        displayTicket(ticket);
    } catch (error) {
        console.error(error);
        alert("Ticket loading failed");
    }
}

function displayTicket(ticket) {
    document.getElementById("pnr").textContent = ticket.pnrNumber || "--";
    document.getElementById("source").textContent = ticket.train?.source || "--";
    document.getElementById("destination").textContent = ticket.train?.destination || "--";
    document.getElementById("trainNumber").textContent = ticket.train?.trainNumber || "--";
    document.getElementById("trainName").textContent = ticket.train?.trainName || "--";
    document.getElementById("passenger").textContent = ticket.passengerName || "--";
    document.getElementById("date").textContent = ticket.journeyDate || "--";
    document.getElementById("coach").textContent = ticket.coach || "--";
    document.getElementById("seat").textContent = ticket.seatNumber || "--";
    document.getElementById("class").textContent = ticket.travelClass || "Sleeper";
    document.getElementById("fare").textContent = ` ${ticket.totalFare || 0}`;
    document.getElementById("status").textContent = ticket.bookingStatus || "CONFIRMED";

    const qrText = `PNR: ${ticket.pnrNumber}\nPassenger: ${ticket.passengerName}\nTrain: ${ticket.train?.trainName}\nCoach: ${ticket.coach}\nSeat: ${ticket.seatNumber}`;
    generateQr(qrText);
}

function generateQr(text) {
    const qrCodeContainer = document.getElementById("qrCode");
    qrCodeContainer.innerHTML = "";
    new QRCode(qrCodeContainer, {
        text: text,
        width: 140,
        height: 140,
        colorDark: "#0f172a",
        colorLight: "#ffffff"
    });
}

function printTicket() {
    window.print();
}

function goHome() {
    window.location.href = "trains.html";
}
