// This runs when the page finishes loading
document.addEventListener("DOMContentLoaded", function () {
    // ====== 1. HELPER FUNCTIONS ======
    // Function to update cart count in the header
    function updateCartCount() {
        // Get cart items from localStorage or empty array if none
        const cartItems = JSON.parse(localStorage.getItem("cartItems") || []);
        // Update all elements showing cart count
        document.querySelectorAll("#cart span").forEach(el => {
            el.textContent = cartItems.length.toString();
        });
    }
    // Function to update favorites count in the header
    function updateFavoriteCount() {
        // Get favorites from localStorage or empty array if none
        const favorites = JSON.parse(localStorage.getItem("favorites") || []);
        // Update all elements showing favorites count
        document.querySelectorAll("#favourite span").forEach(el => {
            el.textContent = favorites.length.toString();
        });
    }
    // Function to add a product to cart
    function addToCart(product) {
        const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
        // Check if product is already in cart
        if (!cartItems.some((item) => item.id === product.id)) {
            cartItems.push(product);
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            updateCartCount();
            return true; // Product was added
        }
        return false; // Product was already in cart
    }
    // Function to remove from favorites
    function removeFromFavorites(productId) {
        let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        favorites = favorites.filter((p) => p.id !== productId);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        updateFavoriteCount();
        return favorites;
    }
    // ====== 2. PAGE SETUP ======
    // Mobile menu toggle
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenuDropdown = document.getElementById("mobileMenuDropdown");
    if (menuBtn && mobileMenuDropdown) {
        menuBtn.addEventListener("click", () => {
            mobileMenuDropdown.classList.toggle("hidden");
        });
    }
    // Main elements
    const favoritesContainer = document.getElementById("favoritesContainer");
    const emptyState = document.getElementById("emptyState");
    const refreshBtn = document.querySelector("button:has(.fa-sync-alt)");
    const filterBtn = document.querySelector("button:has(.fa-filter)");
    // Load favorites from localStorage
    function loadFavorites() {
        try {
            const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
            return Array.isArray(favorites) ? favorites : [];
        }
        catch (error) {
            console.error("Error loading favorites:", error);
            return [];
        }
    }
    let favorites = loadFavorites();
    // Update the page display
    function updateUI() {
        if (!favoritesContainer || !emptyState)
            return;
        if (favorites.length === 0) {
            // Show empty message if no favorites
            favoritesContainer.classList.add("hidden");
            emptyState.classList.remove("hidden");
        }
        else {
            // Show favorites if we have some
            favoritesContainer.classList.remove("hidden");
            emptyState.classList.add("hidden");
            renderFavorites();
        }
        // Always update the counts
        updateCartCount();
        updateFavoriteCount();
    }
    // Display the favorites products
    function renderFavorites() {
        if (!favoritesContainer)
            return;
        favoritesContainer.innerHTML = favorites.map(product => `
            <div class="product-card bg-white rounded-xl shadow-md overflow-hidden transition duration-300">
                <div class="relative">
                    <img src="${product.image || 'https://via.placeholder.com/300'}" 
                         alt="${product.name || 'Product'}" 
                         class="w-full h-48 object-cover">
                    <button class="remove-favorite absolute top-3 right-3 bg-white p-2 rounded-full shadow-lg text-pink-500 hover:text-pink-600" 
                            data-id="${product.id}">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
                <div class="p-4">
                    <div class="flex justify-between items-start">
                        <h3 class="font-semibold text-lg text-gray-900">${product.name}</h3>
                        <span class="text-pink-500 font-bold">Rs ${product.price?.toFixed(2) || "0.00"}</span>
                    </div>
                    <p class="text-gray-600 text-sm mt-1">
                        ${product.description?.substring(0, 60) || "No description available"}...
                    </p>
                    <div class="mt-4 flex justify-between">
                        <button class="add-to-cart bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition" 
                                data-id="${product.id}">
                            Add to Cart
                        </button>
                        <button class="view-details border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        `).join("");
        setupEventListeners();
    }
    // Set up click handlers for the buttons
    function setupEventListeners() {
        // Remove from favorites buttons
        document.querySelectorAll(".remove-favorite").forEach(btn => {
            btn.addEventListener("click", function () {
                const productId = parseInt(this.getAttribute("data-id") || "0");
                favorites = removeFromFavorites(productId);
                updateUI();
            });
        });
        // Add to cart buttons
        document.querySelectorAll(".add-to-cart").forEach(btn => {
            btn.addEventListener("click", function () {
                const productId = parseInt(this.getAttribute("data-id") || "0");
                const product = favorites.find(p => p.id === productId);
                if (product) {
                    const added = addToCart(product);
                    alert(added ? `${product.name} added to cart!` : `${product.name} is already in cart.`);
                }
            });
        });
        // View details buttons
        document.querySelectorAll(".view-details").forEach(btn => {
            btn.addEventListener("click", function () {
                const productName = this.closest(".product-card")?.querySelector("h3")?.textContent || "Product";
                alert(`Details for ${productName} would be shown here`);
            });
        });
    }
    // Refresh button
    if (refreshBtn) {
        refreshBtn.addEventListener("click", () => {
            favorites = loadFavorites();
            updateUI();
            alert("Favorites refreshed");
        });
    }
    // Filter button
    if (filterBtn) {
        filterBtn.addEventListener("click", () => {
            alert("Filter function coming soon");
        });
    }
    // Initialize the page
    updateUI();
});
export {};
