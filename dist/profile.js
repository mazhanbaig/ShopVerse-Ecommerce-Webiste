"use strict";
document.addEventListener("DOMContentLoaded", () => {
    // Get data from localStorage
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const user = JSON.parse(localStorage.getItem("user")) || {
        name: "Guest",
        email: "guest@example.com",
        phone: "N/A",
        address: "N/A",
    };
    // -------------------
    // Render Account Info
    // -------------------
    document.getElementById("accountInfo").innerHTML = `
      <p><span class="font-medium">Name:</span> ${user.name}</p>
      <p><span class="font-medium">Email:</span> ${user.email}</p>
      <p><span class="font-medium">Phone:</span> ${user.phone}</p>
      <p><span class="font-medium">Address:</span> ${user.address}</p>
    `;
    // -------------------
    // Render Recent Orders (cartItems)
    // -------------------
    const ordersContainer = document.getElementById("recentOrders");
    if (cartItems.length === 0) {
        ordersContainer.innerHTML = `<p class="text-gray-500">No recent orders.</p>`;
    }
    else {
        ordersContainer.innerHTML = cartItems
            .map((item, idx) => `
          <div class="flex justify-between items-center border-b pb-3">
            <div>
              <p class="font-medium">${item.name}</p>
              <span class="text-sm text-gray-500">Order #${1000 + idx}</span>
            </div>
            <span class="text-green-600 text-sm font-semibold">Delivered</span>
          </div>
        `)
            .join("");
    }
    // -------------------
    // Render Wishlist (just use first 2 products for now)
    // -------------------
    const wishlistContainer = document.getElementById("wishlistItems");
    if (products.length === 0) {
        wishlistContainer.innerHTML = `<p class="text-gray-500">No wishlist items yet.</p>`;
    }
    else {
        wishlistContainer.innerHTML = products
            .slice(0, 2) // just show 2 for now
            .map((p) => `
          <div class="border rounded-lg p-3 hover:shadow-md transition">
            <img src="${p.imageUrl}" alt="${p.name}" class="rounded-lg mb-2 w-full h-32 object-cover">
            <h4 class="font-medium">${p.name}</h4>
            <p class="text-sm text-gray-500">Rs ${p.price}</p>
          </div>
        `)
            .join("");
    }
    // -------------------
    // Cart Badge Update
    // -------------------
    document.getElementById("cart").textContent = cartItems.length;
    document.getElementById("cartMobile").textContent = cartItems.length;
});
//# sourceMappingURL=profile.js.map