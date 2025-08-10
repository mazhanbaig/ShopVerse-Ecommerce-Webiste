// Mobile menu toggle
const menuBtn = document.getElementById("menuBtn");
const mobileMenuDropdown = document.getElementById("mobileMenuDropdown");
menuBtn?.addEventListener("click", () => {
  mobileMenuDropdown?.classList.toggle("hidden");
});

// Product form handling
const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");

// Utility: Get products from localStorage or return empty array
function getProductsFromStorage() {
  const productsJSON = localStorage.getItem("products");
  return productsJSON ? JSON.parse(productsJSON) : [];
}

// Utility: Save products array to localStorage
function saveProductsToStorage(products) {
  localStorage.setItem("products", JSON.stringify(products));
}

// Render a product card to the DOM, including Delete button with handler
function renderProduct(product) {
  const productCard = document.createElement("div");
  
  productCard.className = "bg-white rounded-xl shadow-md overflow-hidden hover:shadow-pink-400 transition-shadow";

// card content stays same
productCard.innerHTML = `
  <img src="${product.imageUrl}" alt="${product.name}" class="w-full h-48 object-contain rounded-t-xl" />
  <div class="p-4">
    <h3 class="text-xl font-bold text-pink-600 mb-2">${product.name}</h3>
    <p class="text-gray-700 mb-1">${product.description}</p>
    <p class="text-pink-600 font-semibold mb-1">$${product.price.toFixed(2)}</p>
    <p class="text-gray-500 text-sm capitalize">Category: ${product.category}</p>
    <button class="deleteBtn bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-1 rounded-full transition">
      Delete
    </button>
  </div>
`;


  // Add delete button functionality
  const deleteBtn = productCard.querySelector(".deleteBtn");
  deleteBtn.addEventListener("click", () => {
    // Remove from DOM
    productCard.remove();

    // Remove from localStorage
    const products = getProductsFromStorage();
    const filteredProducts = products.filter((p) => p.id !== product.id);
    saveProductsToStorage(filteredProducts);
  });

  productList.appendChild(productCard);
}


// On page load: render products from localStorage
window.addEventListener("DOMContentLoaded", () => {
  const storedProducts = getProductsFromStorage();
  storedProducts.forEach((product) => renderProduct(product));
});

// Handle form submit
productForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const nameInput = document.getElementById("name");
  const priceInput = document.getElementById("price");
  const imageUrlInput = document.getElementById("imageUrl");
  const descInput = document.getElementById("description");
  const categoryInput = document.getElementById("category");

  if (!nameInput || !priceInput || !imageUrlInput || !descInput || !categoryInput) return;

  const name = nameInput.value.trim();
  const price = parseFloat(priceInput.value);
  const imageUrl = imageUrlInput.value.trim();
  const description = descInput.value.trim();
  const category = categoryInput.value;

  if (!name || !price || !imageUrl || !description || !category) return;

  // Create a unique ID (timestamp)
  const id = Date.now();

  const newProduct = { id, name, price, imageUrl, description, category };

  // Save to localStorage
  const products = getProductsFromStorage();
  products.push(newProduct);
  saveProductsToStorage(products);

  // Render new product card
  renderProduct(newProduct);

  // Clear form
  productForm.reset();
});
