// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');
const cart = document.getElementById("cart");

// Mobile menu toggle
mobileMenuButton?.addEventListener('click', () => {
  mobileMenuButton.classList.toggle('hamburger-active');
  mobileMenu?.classList.toggle('hidden');
});

document.addEventListener("DOMContentLoaded",()=>{
  // add to cart count 
  function updateCartCounts() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    if (cart) cart.textContent = cartItems.length.toString();
  }
  updateCartCounts()
})

// Product type definition
type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  category: string;
}

// Get DOM elements
const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");

// Storage functions
function getProductsFromStorage(): Product[] {
  const productsJSON = localStorage.getItem("products");
  return productsJSON ? JSON.parse(productsJSON) : [];
}

function saveProductsToStorage(products: Product[]): void {
  localStorage.setItem("products", JSON.stringify(products));
}
function renderProduct(product: Product): void {
  if (!productList) return;

  const productCard = document.createElement("div");
  productCard.className = "bg-white rounded-lg shadow-md overflow-hidden mb-4 transition-all duration-300 hover:shadow-lg group";

  productCard.innerHTML = `
    <!-- Image Container with Hover Effects -->
    <div class="relative overflow-hidden">
      <img src="${product.imageUrl}" alt="${product.name}" 
           class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105">
      
      <!-- Category Badge -->
      <span class="absolute top-2 left-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
        ${product.category}
      </span>
    </div>
    
    <!-- Product Info -->
    <div class="p-4">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-lg font-bold text-gray-800 truncate">${product.name}</h3>
        <span class="text-pink-600 font-bold">$${product.price.toFixed(2)}</span>
      </div>
      
      <p class="text-gray-600 text-sm mb-3 line-clamp-2">${product.description}</p>
      
      <div class="flex justify-between items-center">
        <!-- Rating -->
        <div class="flex items-center">
          <span class="text-yellow-400">★★★★★</span>
          <span class="text-gray-500 text-xs ml-1">(24)</span>
        </div>
        
        <!-- Delete Button -->
        <button class="delete-btn bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
          Delete
        </button>
      </div>
    </div>
  `;

  // Delete functionality
  const deleteBtn = productCard.querySelector(".delete-btn");
  deleteBtn?.addEventListener("click", () => {
    productCard.remove();
    const products = getProductsFromStorage().filter(p => p.id !== product.id);
    saveProductsToStorage(products);
  });

  // Favorite button functionality
  const favoriteBtn = productCard.querySelector(".favorite-btn");
  favoriteBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    favoriteBtn.textContent = "❤️ Added!";
    setTimeout(() => {
      favoriteBtn.textContent = "❤️ Favorite";
    }, 1000);
  });

  // Quick view button functionality
  const quickViewBtn = productCard.querySelector(".quick-view-btn");
  quickViewBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    alert(`Quick view of ${product.name}`);
  });

  productList.appendChild(productCard);
}

// Load products on page load
window.addEventListener("DOMContentLoaded", () => {
  const storedProducts = getProductsFromStorage();
  storedProducts.forEach(renderProduct);
});

// Form submission
if (productForm) {
  productForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const nameInput = document.getElementById("name") as HTMLInputElement;
    const priceInput = document.getElementById("price") as HTMLInputElement;
    const imageUrlInput = document.getElementById("imageUrl") as HTMLInputElement;
    const descInput = document.getElementById("description") as HTMLInputElement;
    const categoryInput = document.getElementById("category") as HTMLSelectElement;

    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value);
    const imageUrl = imageUrlInput.value.trim();
    const description = descInput.value.trim();
    const category = categoryInput.value;

    // Simple validation
    if (!name || isNaN(price) || price <= 0 || !imageUrl || !description) {
      alert("Please fill all fields correctly");
      return;
    }

    const newProduct: Product = {
      id: Date.now(),
      name,
      price,
      imageUrl,
      description,
      category
    };

    const products = getProductsFromStorage();
    products.push(newProduct);
    saveProductsToStorage(products);
    renderProduct(newProduct);

    productForm.reset();
  });
}