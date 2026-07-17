const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const toggle = document.getElementById("togglePassword");

toggle.onclick = function () {

    if (password.type === "password") {

        password.type = "text";
        toggle.classList.replace("bi-eye-fill", "bi-eye-slash-fill");

    } else {

        password.type = "password";
        toggle.classList.replace("bi-eye-slash-fill", "bi-eye-fill");

    }

};

password.addEventListener("input", () => {

    let value = password.value;
    let strength = 0;

    if (value.length >= 6) strength += 25;
    if (/[A-Z]/.test(value)) strength += 25;
    if (/[0-9]/.test(value)) strength += 25;
    if (/[^A-Za-z0-9]/.test(value)) strength += 25;

    document.getElementById("strengthBar").style.width = strength + "%";

});

document.getElementById("registerForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    if (password.value !== confirmPassword.value) {
        alert("Passwords do not match");
        return;
    }

    const user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        password: password.value,
        role: "USER"
    };

    try {

        const response = await fetch("http://localhost:8080/auth/register", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(user)

        });

        if (response.ok) {

            alert("Registration Successful!");

            window.location.href = "login.html";

        } else {

            const message = await response.text();
            alert(message);

        }

    } catch (error) {

        console.error(error);
        alert("Unable to connect to server.");

    }

});