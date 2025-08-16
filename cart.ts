// Mobile menu toggle - simple version
const menuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');

if (menuButton && mobileMenu) {
  menuButton.addEventListener('click', () => {
    menuButton.classList.toggle('hamburger-active');
    mobileMenu.classList.toggle('hidden');
  });
}

// Cart item structure
type CartItem = {
  id: number;
  name: string;
  price: number;
  discount?: number;
  stock?: number;
  rating?: number;
  sku?: string;
  imageUrl: string;
  description: string;
  category: string;
};

// When page loads
document.addEventListener("DOMContentLoaded", function() {
  
  // Update cart counts everywhere
  function updateCartCounts() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const cartElements = [
      document.getElementById("cart"),
      document.getElementById("cartMobile")
    ];
    
    cartElements.forEach(element => {
      if (element) element.textContent = cartItems.length.toString();
    });
  }
  
  // Update favorite counts everywhere
  function updateFavoriteCounts() {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const favElements = document.querySelectorAll("#favourite span, #mobileFavourite span");
    
    favElements.forEach(element => {
      element.textContent = favorites.length.toString();
    });
  }
  
  // Run these when page loads
  updateCartCounts();
  updateFavoriteCounts();
  
  // Cart page specific code
  const cartPage = document.getElementById("cartItems");
  if (cartPage) {
    // Get cart items from storage
    const cartItems: CartItem[] = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("total");
    const checkoutBtn = document.getElementById("checkoutBtn");
    
    // Show all cart items
    function showCartItems() {
      if (!cartPage || !subtotalElement || !totalElement || !checkoutBtn) return;
      
      // If cart is empty
      if (cartItems.length === 0) {
        cartPage.innerHTML = `
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
      
      // Calculate total price
      let total = 0;
      cartPage.innerHTML = "";
      
      // Add each item to the page
      cartItems.forEach((item, index) => {
        total += item.price;
        
        const itemHTML = `
          <div class="flex items-start py-4 border-b border-gray-200">
            <div class="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
              <img src="${item.imageUrl}" alt="${item.name}" class="w-full h-full object-cover">
            </div>
            <div class="ml-4 flex-1">
              <div class="flex justify-between">
                <h3 class="text-lg font-medium text-gray-800">${item.name}</h3>
                <p class="text-lg font-medium">Rs ${item.price}</p>
              </div>
              <p class="text-sm text-gray-500 mt-1">${item.description}</p>
              <div class="flex items-center mt-3">
                <button class="text-gray-500 hover:text-gray-700 remove-btn" data-index="${index}">
                  <i class="fas fa-trash"></i> Remove
                </button>
              </div>
            </div>
          </div>
        `;
        cartPage.innerHTML += itemHTML;
      });
      
      // Update totals
      subtotalElement.textContent = `Rs ${total}`;
      totalElement.textContent = `Rs ${total}`;
      checkoutBtn.disabled = false;
      checkoutBtn.classList.remove("opacity-50", "cursor-not-allowed");
      
      // Add event listeners to remove buttons
      document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
          const index = parseInt(this.getAttribute('data-index') || "0");
          removeItem(index);
        });
      });
    }
    
    // Remove item from cart
    function removeItem(index: number) {
      cartItems.splice(index, 1);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      showCartItems();
      updateCartCounts();
    }
    
    // Checkout button
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        alert(`Proceeding to checkout with ${cartItems.length} items`);
      });
    }
    
    // Show items when page loads
    showCartItems();
  }
  
  // Mobile menu dropdown toggle
  const mobileMenuBtn = document.getElementById("menuBtn");
  const mobileMenuDropdown = document.getElementById("mobileMenuDropdown");
  
  if (mobileMenuBtn && mobileMenuDropdown) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenuDropdown.classList.toggle("hidden");
    });
  }
});