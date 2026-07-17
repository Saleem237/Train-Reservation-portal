const API_URL = "http://localhost:8080/users";

const userTable = document.getElementById("userTable");

const searchInput = document.getElementById("searchUser");

let users = [];

// =========================
// Load Users
// =========================

async function loadUsers() {

    try {

        const response = await fetch(API_URL);

        users = await response.json();

        displayUsers(users);

    }

    catch (error) {

        console.error(error);

        alert("Unable to load users.");

    }

}

// =========================
// Display Users
// =========================

function displayUsers(data) {

    userTable.innerHTML = "";

    if (data.length === 0) {

        userTable.innerHTML = `

        <tr>

            <td colspan="6" class="text-center">

                No Users Found

            </td>

        </tr>

        `;

        return;

    }

    data.forEach(user => {

        userTable.innerHTML += `

        <tr>

            <td>${user.id}</td>

            <td>${user.name}</td>

            <td>${user.email}</td>

            <td>${user.phone}</td>

            <td>

                <span class="badge bg-primary">

                    ${user.role}

                </span>

            </td>

            <td>

                <button

                    class="btn btn-danger btn-sm"

                    onclick="deleteUser(${user.id})">

                    <i class="fa fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

}

// =========================
// Search
// =========================

searchInput.addEventListener("keyup", function () {

    const keyword = this.value.toLowerCase();

    const filtered = users.filter(user =>

        user.name.toLowerCase().includes(keyword)

        ||

        user.email.toLowerCase().includes(keyword)

        ||

        user.phone.toLowerCase().includes(keyword)

    );

    displayUsers(filtered);

});

// =========================
// Delete User
// =========================

async function deleteUser(id) {

    const ok = confirm("Delete this user?");

    if (!ok) return;

    try {

        const response = await fetch(API_URL + "/" + id, {

            method: "DELETE"

        });

        if (response.ok) {

            alert("User Deleted Successfully");

            loadUsers();

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

// =========================
// Initial Load
// =========================

loadUsers();