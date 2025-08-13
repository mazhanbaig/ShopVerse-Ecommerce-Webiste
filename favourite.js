// // types.ts (create this file for shared types)
// export interface Product {
//     id: number;
//     name: string;
//     price: number;
//     image: string;
//     description: string;
// }
document.addEventListener("DOMContentLoaded", () => {
    // Mobile menu toggle
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenuDropdown = document.getElementById("mobileMenuDropdown");
    if (menuBtn && mobileMenuDropdown) {
        menuBtn.addEventListener("click", () => {
            mobileMenuDropdown.classList.toggle("hidden");
        });
    }
    // DOM elements
    const favoritesContainer = document.getElementById("favoritesContainer");
    const emptyState = document.getElementById("emptyState");
    const favoriteCountElement = document.querySelector("#favourite span");
    const cartCountElement = document.querySelector("#cart span");
    const refreshBtn = document.querySelector("button:has(.fa-sync-alt)");
    const filterBtn = document.querySelector("button:has(.fa-filter)");
    // Load favorites from localStorage with validation
    const loadFavorites = () => {
        try {
            const favoritesJson = localStorage.getItem("favorites");
            if (!favoritesJson)
                return [];
            const parsed = JSON.parse(favoritesJson);
            if (!Array.isArray(parsed))
                return [];
            // Validate each product has required fields
            return parsed.filter((product) => (product &&
                typeof product.id === 'number' &&
                typeof product.name === 'string' &&
                typeof product.price === 'number' &&
                typeof product.image === 'string' &&
                typeof product.description === 'string'));
        }
        catch (error) {
            console.error("Error loading favorites:", error);
            return [];
        }
    };
    let favorites = loadFavorites();
    // Update UI based on favorites
    const updateUI = () => {
        if (!favoritesContainer || !emptyState)
            return;
        if (favorites.length === 0) {
            favoritesContainer.classList.add("hidden");
            emptyState.classList.remove("hidden");
        }
        else {
            favoritesContainer.classList.remove("hidden");
            emptyState.classList.add("hidden");
            renderFavorites();
        }
        // Update counts in navbar
        if (favoriteCountElement) {
            favoriteCountElement.textContent = favorites.length.toString();
        }
    };
    // Render favorites to the DOM with safe property access
    const renderFavorites = () => {
        if (!favoritesContainer)
            return;
        favoritesContainer.innerHTML = "";
        favorites.forEach(product => {
            const card = document.createElement("div");
            card.className = "product-card bg-white rounded-xl shadow-md overflow-hidden transition duration-300";
            // Safe property access with fallbacks
            const productName = product.name || "Unnamed Product";
            const productPrice = product.price ? `Rs ${product.price.toFixed(2)}` : "Price not available";
            const productImage = product.image || "https://via.placeholder.com/300";
            const productDesc = product.description ?
                `${product.description.substring(0, 60)}...` :
                "No description available";
            card.innerHTML = `
                <div class="relative">
                    <img src="${productImage}" alt="${productName}" class="w-full h-48 object-cover">
                    <button class="remove-favorite absolute top-3 right-3 bg-white p-2 rounded-full shadow-lg text-pink-500 hover:text-pink-600" data-id="${product.id}">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
                <div class="p-4">
                    <div class="flex justify-between items-start">
                        <h3 class="font-semibold text-lg text-gray-900">${productName}</h3>
                        <span class="text-pink-500 font-bold">${productPrice}</span>
                    </div>
                    <p class="text-gray-600 text-sm mt-1">${productDesc}</p>
                    <div class="mt-4 flex justify-between">
                        <button class="add-to-cart bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition" data-id="${product.id}">
                            Add to Cart
                        </button>
                        <button class="view-details border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition">
                            View Details
                        </button>
                    </div>
                </div>
            `;
            favoritesContainer.appendChild(card);
        });
        setupEventListeners();
    };
    // Remove product from favorites
    const removeFromFavorites = (productId) => {
        try {
            const updatedFavorites = favorites.filter(p => p.id !== productId);
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            favorites = updatedFavorites;
            updateUI();
        }
        catch (error) {
            console.error("Error removing favorite:", error);
            alert("Failed to remove item from favorites");
        }
    };
    // Add product to cart
    const addToCart = (productId) => {
        try {
            const product = favorites.find(p => p.id === productId);
            if (!product) {
                alert("Product not found");
                return;
            }
            const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
            if (!cartItems.some(item => item.id === productId)) {
                cartItems.push(product);
                localStorage.setItem("cartItems", JSON.stringify(cartItems));
                alert(`${product.name} added to cart!`);
                if (cartCountElement) {
                    cartCountElement.textContent = cartItems.length.toString();
                }
            }
            else {
                alert(`${product.name} is already in your cart.`);
            }
        }
        catch (error) {
            console.error("Error adding to cart:", error);
            alert("Failed to add item to cart");
        }
    };
    // Setup event listeners for dynamic elements
    const setupEventListeners = () => {
        // Remove from favorites buttons
        document.querySelectorAll(".remove-favorite").forEach(btn => {
            btn.addEventListener("click", function () {
                const productId = parseInt(this.getAttribute("data-id") || 0);
                removeFromFavorites(productId);
            });
        });
        // Add to cart buttons
        document.querySelectorAll(".add-to-cart").forEach(btn => {
            btn.addEventListener("click", function () {
                const productId = parseInt(this.getAttribute("data-id") || 0);
                addToCart(productId);
            });
        });
        // View details buttons
        document.querySelectorAll(".view-details").forEach(btn => {
            btn.addEventListener("click", function () {
                const card = this.closest(".product-card");
                const productName = card?.querySelector("h3")?.textContent || "Product";
                alert(`Details for ${productName} would be shown here`);
            });
        });
    };
    // Refresh button functionality
    if (refreshBtn) {
        refreshBtn.addEventListener("click", () => {
            favorites = loadFavorites();
            updateUI();
            alert("Favorites list refreshed");
        });
    }
    // Filter button functionality (placeholder)
    if (filterBtn) {
        filterBtn.addEventListener("click", () => {
            alert("Filter functionality would go here");
        });
    }
    // Initialize the page
    updateUI();
});
export {};
