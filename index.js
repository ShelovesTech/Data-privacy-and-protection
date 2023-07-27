document.addEventListener("DOMContentLoaded", function() {
    const signupForm = document.getElementById("signupForm");

    signupForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirm_password = document.getElementById("confirm_password").value;

        // Validate form data
        if (!username || !email || !password || !confirm_password) {
            alert("Please fill in all fields.");
            return;
        }

        if (password !== confirm_password) {
            alert("Passwords do not match.");
            return;
        }

        // For simplicity, let's assume the server-side validation is already done.
        // You can use AJAX to send the form data to the server.

        // For this example, we'll just submit the form.
        signupForm.submit();
    });
});
