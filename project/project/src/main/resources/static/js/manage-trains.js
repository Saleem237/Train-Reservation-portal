// ===============================
// Train Management
// ===============================

const API_URL = "http://localhost:8080/trains";

const trainTable = document.getElementById("trainTable");
const searchInput = document.getElementById("searchTrain");

const trainForm = document.getElementById("trainForm");

const trainModal = new bootstrap.Modal(
    document.getElementById("trainModal")
);

const saveBtn = document.getElementById("saveBtn");
const updateBtn = document.getElementById("updateBtn");

let trainList = [];

// ===============================
// Load All Trains
// ===============================

async function loadTrains() {

    try {

        const response = await fetch(API_URL);

        trainList = await response.json();

        displayTrains(trainList);

    }

    catch (error) {

        console.error(error);

        alert("Unable to load trains.");

    }

}

// ===============================
// Display Train Table
// ===============================

function displayTrains(trains) {

    trainTable.innerHTML = "";

    if (trains.length === 0) {

        trainTable.innerHTML =

        `
        <tr>

            <td colspan="10"
                class="text-center text-danger">

                No Trains Found

            </td>

        </tr>
        `;

        return;

    }

    trains.forEach(train => {

        trainTable.innerHTML +=

        `
        <tr>

            <td>${train.id}</td>

            <td>${train.trainNumber}</td>

            <td>${train.trainName}</td>

            <td>${train.source}</td>

            <td>${train.destination}</td>

            <td>${train.departureTime}</td>

            <td>${train.arrivalTime}</td>

            <td>₹ ${train.fare}</td>

            <td>

                ${train.availableSeats}

                /

                ${train.totalSeats}

            </td>

            <td>

                <button
                    class="btn btn-warning btn-sm me-2"
                    onclick="editTrain(${train.id})">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="deleteTrain(${train.id})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

}

// ===============================
// Search Train
// ===============================

searchInput.addEventListener("keyup", function () {

    const keyword = this.value.toLowerCase();

    const filtered = trainList.filter(train =>

        train.trainNumber.toLowerCase().includes(keyword)

        ||

        train.trainName.toLowerCase().includes(keyword)

    );

    displayTrains(filtered);

});

// ===============================
// Reset Form
// ===============================

function clearForm() {

    trainForm.reset();

    document.getElementById("trainId").value = "";

    saveBtn.style.display = "inline-block";

    updateBtn.style.display = "none";

}

// ===============================
// Open Add Train Modal
// ===============================

document.querySelector(

'[data-bs-target="#trainModal"]'

).addEventListener("click", () => {

    clearForm();

});

// ===============================
// Initial Load
// ===============================

loadTrains();
// ===============================
// Add Train
// ===============================

saveBtn.addEventListener("click", async () => {

    const train = {

        trainNumber: document.getElementById("trainNumber").value.trim(),

        trainName: document.getElementById("trainName").value.trim(),

        source: document.getElementById("source").value.trim(),

        destination: document.getElementById("destination").value.trim(),

        departureTime: document.getElementById("departureTime").value,

        arrivalTime: document.getElementById("arrivalTime").value,

        fare: parseFloat(document.getElementById("fare").value),

        totalSeats: parseInt(document.getElementById("totalSeats").value),

        availableSeats: parseInt(document.getElementById("totalSeats").value)

    };

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(train)

        });

        if (response.ok) {

            alert("Train Added Successfully");

            trainModal.hide();

            clearForm();

            loadTrains();

        }

        else {

            alert("Failed to Add Train");

        }

    }

    catch (error) {

        console.error(error);

        alert("Server Error");

    }

});

// ===============================
// Edit Train
// ===============================

async function editTrain(id) {

    try {

        const response = await fetch(API_URL + "/" + id);

        const train = await response.json();

        document.getElementById("trainId").value = train.id;

        document.getElementById("trainNumber").value = train.trainNumber;

        document.getElementById("trainName").value = train.trainName;

        document.getElementById("source").value = train.source;

        document.getElementById("destination").value = train.destination;

        document.getElementById("departureTime").value = train.departureTime;

        document.getElementById("arrivalTime").value = train.arrivalTime;

        document.getElementById("fare").value = train.fare;

        document.getElementById("totalSeats").value = train.totalSeats;

        saveBtn.style.display = "none";

        updateBtn.style.display = "inline-block";

        trainModal.show();

    }

    catch (error) {

        console.error(error);

        alert("Unable to Fetch Train");

    }

}

// ===============================
// Update Train
// ===============================

updateBtn.addEventListener("click", async () => {

    const id = document.getElementById("trainId").value;

    const train = {

        trainNumber: document.getElementById("trainNumber").value.trim(),

        trainName: document.getElementById("trainName").value.trim(),

        source: document.getElementById("source").value.trim(),

        destination: document.getElementById("destination").value.trim(),

        departureTime: document.getElementById("departureTime").value,

        arrivalTime: document.getElementById("arrivalTime").value,

        fare: parseFloat(document.getElementById("fare").value),

        totalSeats: parseInt(document.getElementById("totalSeats").value),

        availableSeats: parseInt(document.getElementById("totalSeats").value)

    };

    try {

        const response = await fetch(API_URL + "/" + id, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(train)

        });

        if (response.ok) {

            alert("Train Updated Successfully");

            trainModal.hide();

            clearForm();

            loadTrains();

        }

        else {

            alert("Update Failed");

        }

    }

    catch (error) {

        console.error(error);

        alert("Server Error");

    }

});

// ===============================
// Delete Train
// ===============================

async function deleteTrain(id) {

    const confirmDelete = confirm("Are you sure you want to delete this train?");

    if (!confirmDelete) {

        return;

    }

    try {

        const response = await fetch(API_URL + "/" + id, {

            method: "DELETE"

        });

        if (response.ok) {

            alert("Train Deleted Successfully");

            loadTrains();

        }

        else {

            alert("Delete Failed");

        }

    }

    catch (error) {

        console.error(error);

        alert("Server Error");

    }

}

// ===============================
// Close Modal Cleanup
// ===============================

document.getElementById("trainModal").addEventListener("hidden.bs.modal", () => {

    clearForm();

});