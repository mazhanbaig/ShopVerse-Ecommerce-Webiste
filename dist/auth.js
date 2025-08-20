"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const formTitle = document.getElementById("formTitle");
    const toggleBtn = document.getElementById("toggleBtn");
    const toggleText = document.getElementById("toggleText");
    const extraField = document.getElementById("extraField");
    const submitBtn = document.getElementById("submitbtn");
    const form = document.getElementsByTagName("form")[0];
    const emailInp = document.getElementById("email");
    const passwordInp = document.getElementById("password");
    const userNameInp = document.getElementById("userName");
    let isSignIn = true;
    // Toggle between Sign In and Sign Up
    toggleBtn.addEventListener("click", () => {
        isSignIn = !isSignIn;
        formTitle.textContent = isSignIn ? "Sign In" : "Sign Up";
        toggleText.textContent = isSignIn ? "Don’t have an account?" : "Already have an account?";
        toggleBtn.textContent = isSignIn ? "Sign Up" : "Sign In";
        extraField.classList.toggle("hidden");
    });
    // Handle form submit
    submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const email = emailInp.value.trim();
        const password = parseInt(passwordInp.value.trim());
        const userName = userNameInp.value.trim();
        // Load existing users or empty array
        const users = JSON.parse(localStorage.getItem("userInfo") || "[]");
        if (isSignIn) {
            // Sign In
            const user = users.find(u => u.email === email && u.password === password);
            if (user) {
                localStorage.setItem("currentUser", JSON.stringify(user));
                alert(`Welcome back, ${user.userName}!`);
                window.location.replace("account.html");
            }
            else {
                alert("Invalid email or password!");
            }
        }
        else {
            // Sign Up
            const exists = users.some(u => u.email === email);
            if (exists) {
                alert("User already exists with this email!");
            }
            else {
                const newUser = { userName, email, password };
                users.push(newUser);
                localStorage.setItem("userInfo", JSON.stringify(users));
                localStorage.setItem("currentUser", JSON.stringify(newUser));
                alert("Account created successfully!");
                window.location.replace("account.html");
            }
        }
        form.reset();
    });
});
//# sourceMappingURL=auth.js.map