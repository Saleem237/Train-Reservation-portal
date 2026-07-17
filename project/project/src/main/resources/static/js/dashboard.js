// ==============================
// TrainEase Dashboard
// ==============================

// Check Login
const user = JSON.parse(sessionStorage.getItem("loggedInUser"));

if (!user) {

    alert("Please login first.");

    window.location.href = "login.html";

}

// ==============================
// Welcome User
// ==============================

const heading = document.querySelector(".topbar h2");

const hours = new Date().getHours();

let greeting = "Good Evening";

if (hours < 12) {

    greeting = "Good Morning";

} else if (hours < 18) {

    greeting = "Good Afternoon";

}

heading.innerHTML = `${greeting}, ${user.name} 👋`;

// ==============================
// Search Train
// ==============================

document.querySelector(".search-btn").addEventListener("click", () => {

    window.location.href = "trains.html";

});

// ==============================
// Logout
// ==============================

document.querySelector(".sidebar a[href='index.html']")
.addEventListener("click", function (e) {

    e.preventDefault();

    sessionStorage.removeItem("loggedInUser");

    alert("Logged out successfully.");

    window.location.href = "login.html";

});