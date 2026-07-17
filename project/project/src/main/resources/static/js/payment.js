const API_URL = "http://localhost:8080";

const selectedTrain = JSON.parse(sessionStorage.getItem("selectedTrain"));
const selectedSeat = JSON.parse(sessionStorage.getItem("selectedSeat"));
const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
const bookingFormData = JSON.parse(sessionStorage.getItem("bookingData"));

if (!selectedTrain || !selectedSeat || !loggedInUser || !bookingFormData) {
    alert("Booking data missing!");
    window.location.href = "trains.html";
}

window.onload = function () {
    document.getElementById("amount").innerHTML = selectedTrain.fare;
    showPaymentBox();
};

function showPaymentBox() {
    const method = document.getElementById("paymentMethod").value;
    const upiBox = document.getElementById("upiBox");
    const cardBox = document.getElementById("cardBox");

    if (method === "UPI") {
        upiBox.style.display = "block";
        cardBox.style.display = "none";
    } else {
        upiBox.style.display = "none";
        cardBox.style.display = "block";
    }
}

async function makePayment() {
    const paymentMethod = document.getElementById("paymentMethod").value;

    if (paymentMethod === "UPI") {
        const upi = document.getElementById("upiId").value.trim();
        if (!upi) {
            alert("Enter UPI ID");
            return;
        }
    }

    if (paymentMethod === "CARD") {
        const cardNumber = document.getElementById("cardNumber").value.trim();
        const expiry = document.getElementById("expiryDate").value.trim();
        const cvv = document.getElementById("cvv").value.trim();

        if (!cardNumber || !expiry || !cvv) {
            alert("Enter complete card details");
            return;
        }
    }

    alert("Payment Processing...");
    setTimeout(confirmBooking, 1000);
}

async function confirmBooking() {
    const bookingRequest = {
        bookingDate: new Date().toISOString().split("T")[0],
        journeyDate: bookingFormData.journeyDate,
        passengerName: bookingFormData.passengerName,
        age: Number(bookingFormData.age),
        gender: bookingFormData.gender,
        coach: selectedSeat.coach,
        seatNumber: selectedSeat.seatNumber,
        travelClass: bookingFormData.travelClass || "Sleeper",
        numberOfTickets: 1,
        totalFare: selectedTrain.fare,
        bookingStatus: "BOOKED",
        paymentStatus: "PAID",
        user: { id: loggedInUser.id },
        train: { id: selectedTrain.id }
    };

    try {
        const response = await fetch(`${API_URL}/bookings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookingRequest)
        });

        if (!response.ok) {
            const error = await response.text();
            console.error(error);
            throw new Error("Booking Failed");
        }

        const booking = await response.json();
        sessionStorage.setItem("confirmedBooking", JSON.stringify(booking));
        sessionStorage.setItem("selectedCoach", selectedSeat.coach);
        sessionStorage.setItem("selectedSeat", JSON.stringify(selectedSeat));

        alert("Payment Successful ??");
        window.location.href = "ticket.html";
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}
