"use strict";
// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');
const cart = document.getElementById("cart");
const cartMobile = document.getElementById("cartMobile");
// Mobile menu toggle
mobileMenuButton === null || mobileMenuButton === void 0 ? void 0 : mobileMenuButton.addEventListener('click', () => {
    mobileMenuButton.classList.toggle('hamburger-active');
    mobileMenu === null || mobileMenu === void 0 ? void 0 : mobileMenu.classList.toggle('hidden');
});
// Update cart count globally
document.addEventListener("DOMContentLoaded", () => {
    function updateCartCounts() {
        const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
        if (cart && cartMobile) {
            cart.textContent = cartItems.length.toString();
            cartMobile.textContent = cartItems.length.toString();
        }
    }
    updateCartCounts();
});
// Get DOM elements
const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");
// Storage functions
function getProductsFromStorage() {
    const productsJSON = localStorage.getItem("products");
    return productsJSON ? JSON.parse(productsJSON) : [];
}
function saveProductsToStorage(products) {
    localStorage.setItem("products", JSON.stringify(products));
}
function renderProduct(product) {
    if (!productList)
        return;
    const discountedPrice = product.discount
        ? (product.price - (product.price * (product.discount / 100))).toFixed(2)
        : product.price;
    const productCard = document.createElement("div");
    productCard.className =
        "bg-white rounded-lg shadow-md overflow-hidden mb-4 transition-all duration-300 hover:shadow-lg group";
    productCard.innerHTML = `
    <div class="relative overflow-hidden">
      <img src="${product.imageUrl}" alt="${product.name}" 
           class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105">
      <!-- Category & Discount Tags -->
      <span class="absolute top-2 left-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
        ${product.isFreeDelivery ? "Free delivery" : product.isCashOnDelivery ? "COD" : product.isReturnable ? "Returnable" : product.category}
      </span>
        <span class="absolute top-2 right-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          ${product.discount}% OFF
        </span>
    </div>
    
    <div class="px-4 py-2">
      <!-- Name & Price -->
        <div class="flex justify-between items-start mb-2">
          <h3 class="text-lg font-bold text-pink-600 truncate">${product.name}</h3>
          <div class="text-right">
            ${discountedPrice
        ? `<div class="font-bold text-gray-500 line-through">Rs.${product.price.toFixed(2)}</div>
                 <div class="text-md text-green-600 font-semibold">Rs.${discountedPrice}</div>`
        : ""}
          </div>
        </div>
      
      <p class="text-gray-600 text-sm mb-3 line-clamp-2">${product.description}</p>
      
      <div class="flex justify-between items-center text-sm text-gray-500 mb-3">
        ${product.sku ? `<span>SKU: ${product.sku}</span>` : ""}
        ${product.stock !== undefined ? `<span>Stock: ${product.stock}</span>` : ""}
      </div>
      
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <span class="text-yellow-400">${"★".repeat(Math.floor(product.rating || 0))}</span>
          <span class="text-gray-400">${"★".repeat(5 - Math.floor(product.rating || 0))}</span>
          ${product.rating ? `<span class="ml-1 text-xs">(${product.rating})</span>` : ""}
        </div>
        <button onclick="alert("Edit option is coming soon")" class="edit-btn bg-blue-500 hover:bg-red-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
          Edit
        </button>
        <button class="delete-btn bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
          Delete
        </button>
      </div>
    </div>
  `;
    const deleteBtn = productCard.querySelector(".delete-btn");
    deleteBtn === null || deleteBtn === void 0 ? void 0 : deleteBtn.addEventListener("click", () => {
        productCard.remove();
        const products = getProductsFromStorage().filter(p => p.id !== product.id);
        saveProductsToStorage(products);
    });
    productList === null || productList === void 0 ? void 0 : productList.appendChild(productCard);
}
// Load products on page load
window.addEventListener("DOMContentLoaded", () => {
    const storedProducts = getProductsFromStorage();
    storedProducts.forEach(renderProduct);
});
// Form submission
if (productForm) {
    productForm.addEventListener("submit", (e) => {
        var _a, _b, _c, _d;
        e.preventDefault();
        const name = document.getElementById("name").value.trim();
        const price = parseFloat(document.getElementById("price").value);
        const discount = parseFloat(((_a = document.getElementById("discount")) === null || _a === void 0 ? void 0 : _a.value) || "0");
        const stock = parseInt(((_b = document.getElementById("stock")) === null || _b === void 0 ? void 0 : _b.value) || "0");
        const rating = parseFloat(((_c = document.getElementById("rating")) === null || _c === void 0 ? void 0 : _c.value) || "0");
        const sku = ((_d = document.getElementById("sku")) === null || _d === void 0 ? void 0 : _d.value.trim()) || "";
        const imageUrl = document.getElementById("imageUrl").value.trim();
        const description = document.getElementById("description").value.trim();
        const category = document.getElementById("category").value;
        const isFreeDelivery = document.getElementById("freeDelivery").checked;
        const isCashOnDelivery = document.getElementById("COD").checked;
        const isReturnable = document.getElementById("returnable").checked;
        if (!name || isNaN(price) || price <= 0 || !imageUrl || !description) {
            alert("Please fill all fields correctly");
            return;
        }
        const newProduct = {
            id: Date.now(),
            name,
            price,
            discount: discount || 0,
            stock: stock,
            rating: rating,
            sku: sku,
            imageUrl,
            description,
            category,
            isFreeDelivery,
            isCashOnDelivery,
            isReturnable
        };
        const products = getProductsFromStorage();
        products.push(newProduct);
        saveProductsToStorage(products);
        renderProduct(newProduct);
        productForm.reset();
    });
}
//# sourceMappingURL=addproduct.js.map