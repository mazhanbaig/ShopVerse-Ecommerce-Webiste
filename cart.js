// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');
const cart = document.getElementById("cart");
// Mobile menu toggle
mobileMenuButton?.addEventListener('click', () => {
    mobileMenuButton.classList.toggle('hamburger-active');
    mobileMenu?.classList.toggle('hidden');
});
// ========== GLOBAL COUNT FUNCTIONS ==========
// Update cart count globally
document.addEventListener("DOMContentLoaded", () => {
    const updateCartCount = () => {
        const cartCountElements = document.querySelectorAll("#cart span, #mobileCart span");
        const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
        if (cart)
            cart.textContent = cartItems.length.toString();
    };
    updateCartCount();
});
// Update favorite count globally
window.updateFavoriteCount = () => {
    const favoriteCountElements = document.querySelectorAll("#favourite span, #mobileFavourite span");
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    favoriteCountElements.forEach(element => {
        element.textContent = favorites.length.toString();
    });
};
document.addEventListener("DOMContentLoaded", () => {
    // ========== INITIALIZE COUNTS ON LOAD ==========
    if (typeof window.updateCartCount === 'function')
        window.updateCartCount();
    if (typeof window.updateFavoriteCount === 'function')
        window.updateFavoriteCount();
    // ========== CART PAGE FUNCTIONALITY ==========
    // Load cart items from localStorage with proper type assertion
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    // Get DOM elements with type assertions
    const cartItemsContainer = document.getElementById("cartItems");
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("total");
    const checkoutBtn = document.getElementById("checkoutBtn");
    // Render cart items function
    const renderCartItems = () => {
        if (!cartItemsContainer || !subtotalElement || !totalElement || !checkoutBtn) {
            console.error("Required DOM elements not found");
            return;
        }
        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = `
        <div class="text-center py-12">
          <i class="fas fa-shopping-cart text-5xl text-gray-300 mb-4"></i>
          <p class="text-gray-500">Your cart is empty</p>
          <a href="index.html" class="mt-4 inline-block bg-pink-600 hover:bg-pink-500 text-white py-2 px-4 rounded-lg font-medium transition">
            Continue Shopping
          </a>
        </div>
      `;
            subtotalElement.textContent = "Rs 0.00";
            totalElement.textContent = "Rs 0.00";
            checkoutBtn.disabled = true;
            checkoutBtn.classList.add("opacity-50", "cursor-not-allowed");
            return;
        }
        let subtotal = 0;
        cartItemsContainer.innerHTML = "";
        cartItems.forEach((item, index) => {
            subtotal += item.price;
            const cartItem = document.createElement("div");
            cartItem.className = "flex items-start py-4 border-b border-gray-200";
            cartItem.innerHTML = `
        <div class="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
          <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
        </div>
        <div class="ml-4 flex-1">
          <div class="flex justify-between">
            <h3 class="text-lg font-medium text-gray-800">${item.name}</h3>
            <p class="text-lg font-medium">Rs ${item.price}</p>
          </div>
          <p class="text-sm text-gray-500 mt-1">${item.description}</p>
          <div class="flex items-center mt-3">
            <button class="text-gray-500 hover:text-gray-700" onclick="removeItem(${index})">
              <i class="fas fa-trash"></i> Remove
            </button>
          </div>
        </div>
      `;
            cartItemsContainer.appendChild(cartItem);
        });
        subtotalElement.textContent = `Rs ${subtotal}`;
        totalElement.textContent = `Rs ${subtotal}`;
        checkoutBtn.disabled = false;
        checkoutBtn.classList.remove("opacity-50", "cursor-not-allowed");
    };
    // Remove item from cart function
    window.removeItem = (index) => {
        cartItems.splice(index, 1);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        renderCartItems();
        window.updateCartCount(); // Update count globally
    };
    // Checkout button event listener
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            alert(`Proceeding to checkout with ${cartItems.length} items`);
            // In a real app, you would redirect to a checkout page
        });
    }
    // Mobile menu toggle
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenuDropdown = document.getElementById("mobileMenuDropdown");
    if (menuBtn && mobileMenuDropdown) {
        menuBtn.addEventListener("click", () => {
            mobileMenuDropdown.classList.toggle("hidden");
        });
    }
    // Initial render
    renderCartItems();
});
export {};
