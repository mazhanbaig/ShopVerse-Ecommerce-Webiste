"use strict";
// Wait until page is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Get HTML elements
    const formTitle = document.getElementById("formTitle");
    const toggleBtn = document.getElementById("toggleBtn");
    const toggleText = document.getElementById("toggleText");
    const extraField = document.getElementById("extraField");
    const submitBtn = document.getElementById("submitbtn");
    const form = document.querySelector("form");
    const emailInp = document.getElementById("email");
    const passwordInp = document.getElementById("password");
    const userNameInp = document.getElementById("userName");
    // Start with Sign In mode
    let isSignIn = true;
    // Change form between Sign In and Sign Up
    toggleBtn.addEventListener("click", () => {
        if (isSignIn) {
            // Switch to Sign Up
            isSignIn = false;
            formTitle.textContent = "Sign Up";
            toggleText.textContent = "Already have an account?";
            toggleBtn.textContent = "Sign In";
            extraField.classList.remove("hidden");
        }
        else {
            // Switch to Sign In
            isSignIn = true;
            formTitle.textContent = "Sign In";
            toggleText.textContent = "Don’t have an account?";
            toggleBtn.textContent = "Sign Up";
            extraField.classList.add("hidden");
        }
    });
    // When submit button is clicked
    submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        // Get user input values
        const email = emailInp.value.trim();
        const password = Number(passwordInp.value.trim());
        const userName = userNameInp.value.trim();
        // Get saved users from localStorage (if none, use empty array)
        let users = JSON.parse(localStorage.getItem("userInfo") || "[]");
        if (isSignIn) {
            // Check if user exists
            let foundUser = users.find((u) => u.email === email && u.password === password);
            if (foundUser) {
                alert("Welcome back, " + foundUser.userName + "!");
                localStorage.setItem("currentUser", JSON.stringify(foundUser));
                window.location.href = "index.html"; // Go to account page
            }
            else {
                alert("Invalid email or password!");
            }
        }
        else {
            // Sign Up (new user)
            let alreadyUser = users.some((u) => u.email === email);
            if (alreadyUser) {
                alert("User already exists!");
            }
            else {
                let newUser = { userName, email, password };
                users.push(newUser);
                localStorage.setItem("userInfo", JSON.stringify(users));
                localStorage.setItem("currentUser", JSON.stringify(newUser));
                alert("Account created successfully!");
                window.location.href = "index.html";
            }
        }
        // Clear form
        form.reset();
    });
});
//# sourceMappingURL=auth.js.map