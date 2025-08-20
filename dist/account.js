"use strict";
// type UserInfo = {
//     userName: string;
//     email: string;
//     password: number;
// };
// ====== Load User from localStorage ======
function loadUser() {
    const data = localStorage.getItem("currentUser");
    if (!data)
        return null;
    return JSON.parse(data);
}
// ====== Render User Info on Page ======
function renderUserInfo() {
    const user = loadUser();
    // Profile Header
    const nameEl = document.getElementById("name");
    const emailEl = document.getElementById("email");
    // Account Info Section
    const accountNameEl = document.getElementById("accountName");
    const accountEmailEl = document.getElementById("accountEmail");
    const accountPhoneEl = document.getElementById("accountPhone");
    const accountAddressEl = document.getElementById("accountAddress");
    if (user) {
        nameEl.textContent = user.userName;
        emailEl.textContent = user.email;
        accountNameEl.textContent = user.userName;
        accountEmailEl.textContent = user.email;
        accountPhoneEl.textContent = user.phone || "+92 300 1234567";
        accountAddressEl.textContent = user.address || "Karachi, Pakistan";
    }
    else {
        nameEl.textContent = "Guest User";
        emailEl.textContent = "No email available";
        accountNameEl.textContent = "Guest User";
        accountEmailEl.textContent = "No email available";
        accountPhoneEl.textContent = "-";
        accountAddressEl.textContent = "-";
    }
}
// ====== Logout Function ======
function setupLogout() {
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn === null || logoutBtn === void 0 ? void 0 : logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("currentUser");
        renderUserInfo();
        alert("Logged out successfully!");
    });
}
// ====== Initialize ======
document.addEventListener("DOMContentLoaded", () => {
    renderUserInfo();
    setupLogout();
});
// Get cart items from localStorage
function getCartItems() {
    const items = localStorage.getItem("cartItems");
    return items ? JSON.parse(items) : [];
}
function renderCartPreview() {
    const container = document.getElementById("cartPreviewContainer");
    if (!container)
        return;
    const cartItems = getCartItems();
    const previewItems = cartItems.slice(0, 3);
    container.innerHTML = `
    <div class="bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-6 hover:shadow-lg transition-all">
      <h3 class="text-lg font-semibold mb-4 text-gray-900">Your Cart</h3>
      <div class="space-y-3">
        ${previewItems
        .map((item) => `
          <div class="flex justify-between items-center border-b pb-3">
            <div class="flex items-center gap-3">
              <img src="${item.imageUrl}" alt="${item.name}" class="w-12 h-12 rounded-lg">
              <div>
                <p class="font-medium">${item.name}</p>
                <span class="text-sm text-gray-500"> ${item.description}</span>
              </div>
            </div>
            <span class="text-gray-900 font-semibold">$${(item.price).toFixed(2)}</span>
          </div>
        `)
        .join("")}
      </div>
      ${cartItems.length > 3 ? `<button id="cartMoreBtn" class="mt-4 w-full px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition">More</button>` : ""}
    </div>
  `;
    const moreBtn = document.getElementById("cartMoreBtn");
    moreBtn === null || moreBtn === void 0 ? void 0 : moreBtn.addEventListener("click", () => {
        window.location.href = "cart.html";
    });
}
// Call renderCartPreview on page load
document.addEventListener("DOMContentLoaded", () => {
    renderCartPreview();
});
//# sourceMappingURL=account.js.map