// =============================
// PASSWORD SHOW / HIDE
// =============================

const password = document.getElementById("password");
const toggle = document.getElementById("togglePassword");

toggle.addEventListener("click", () => {

    if (password.type === "password") {

        password.type = "text";

        toggle.classList.remove("bi-eye-fill");
        toggle.classList.add("bi-eye-slash-fill");

    } else {

        password.type = "password";

        toggle.classList.remove("bi-eye-slash-fill");
        toggle.classList.add("bi-eye-fill");

    }

});

// =============================
// LOGIN
// =============================

document.getElementById("loginForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const loginButton = document.querySelector(".login-btn");

    loginButton.disabled = true;

    loginButton.innerHTML = `
        <span class="spinner-border spinner-border-sm"></span>
        Logging in...
    `;

    const user = {

        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value

    };

    try {

        const response = await fetch("http://localhost:8080/auth/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(user)

        });

        const data = await response.json();

        if (response.ok) {

            // Save complete user object
            sessionStorage.setItem(
                "loggedInUser",
                JSON.stringify(data)
            );

            // Save user details
            sessionStorage.setItem("userId", data.id);
            sessionStorage.setItem("userName", data.name);
            sessionStorage.setItem("userEmail", data.email);
            sessionStorage.setItem("userRole", data.role);

            alert("Login Successful!");

            // =============================
            // ADMIN / USER REDIRECTION
            // =============================

            if (data.role &&
                data.role.toUpperCase() === "ADMIN") {

                window.location.href = "admin-dashboard.html";

            } else {

                window.location.href = "dashboard.html";

            }

        } else {

            alert(data.message || data);

        }

    } catch (error) {

        console.error(error);

        alert("Unable to connect to Spring Boot Server.");

    }

    loginButton.disabled = false;

    loginButton.innerHTML = `
        <i class="bi bi-box-arrow-in-right"></i>
        Login
    `;

});