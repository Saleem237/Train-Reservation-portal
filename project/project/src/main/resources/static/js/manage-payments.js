let payments = [];

window.onload = function () {

    loadPayments();

};

// Load payments
function loadPayments() {

    fetch("/payments")

    .then(response => response.json())

    .then(data => {

        payments = data;

        displayPayments(payments);

        calculateRevenue();

    });

}

// Display payments
function displayPayments(list) {

    let rows = "";

    if (list.length === 0) {

        rows = `
        <tr>
            <td colspan="6" class="text-center text-danger">
                No Payments Found
            </td>
        </tr>
        `;

    } else {

        list.forEach(payment => {

            rows += `

            <tr>

                <td>${payment.id}</td>

                <td>${payment.bookingId}</td>

                <td>${payment.transactionId}</td>

                <td>₹${payment.amount}</td>

                <td>${payment.paymentMethod}</td>

                <td>

                    <span class="badge bg-success">

                        ${payment.paymentStatus}

                    </span>

                </td>

            </tr>

            `;

        });

    }

    document.getElementById("paymentTable").innerHTML = rows;

}

// Search payment
function searchPayment() {

    const keyword = document
        .getElementById("searchPayment")
        .value
        .toLowerCase();

    const filtered = payments.filter(payment =>

        payment.transactionId.toLowerCase().includes(keyword)

    );

    displayPayments(filtered);

}

// Total revenue
function calculateRevenue() {

    let total = 0;

    payments.forEach(payment => {

        total += payment.amount;

    });

    document.getElementById("totalRevenue").innerText = "₹" + total;

}

// Logout
function logout() {

    localStorage.clear();

    window.location.href = "login.html";

}