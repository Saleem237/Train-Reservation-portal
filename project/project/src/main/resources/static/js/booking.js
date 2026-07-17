const train = JSON.parse(sessionStorage.getItem("selectedTrain"));
const selectedSeat = JSON.parse(sessionStorage.getItem("selectedSeat"));
const coach = sessionStorage.getItem("selectedCoach");

if (!train || !selectedSeat || !coach) {
    alert("Please select train, coach and seat");
    window.location.href = "trains.html";
}

const seatNumber = Number(selectedSeat.seatNumber);

document.getElementById("trainInfo").innerHTML = `${train.trainNumber} - ${train.trainName}`;
document.getElementById("route").innerHTML = `${train.source} → ${train.destination}`;
document.getElementById("coach").innerHTML = coach;
document.getElementById("seat").innerHTML = seatNumber;
document.getElementById("fare").innerHTML = train.fare;

document.getElementById("bookingForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const bookingData = {
        journeyDate: document.getElementById("journeyDate").value,
        passengerName: document.getElementById("passengerName").value,
        age: parseInt(document.getElementById("age").value),
        gender: document.getElementById("gender").value,
        coach: coach,
        seatNumber: seatNumber,
        numberOfTickets: 1,
        totalFare: train.fare,
        bookingStatus: "BOOKED",
        paymentStatus: "PENDING",
        train: { id: train.id },
        user: { id: JSON.parse(sessionStorage.getItem("loggedInUser")).id }
    };

    sessionStorage.setItem("bookingData", JSON.stringify(bookingData));
    window.location.href = "payment.html";
});
