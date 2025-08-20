"use strict";
var _a;
// ===== 2. NAVBAR FUNCTIONALITY =====
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');
const cart = document.getElementById("cart");
const cartMobile = document.getElementById("cartMobile");
mobileMenuButton === null || mobileMenuButton === void 0 ? void 0 : mobileMenuButton.addEventListener('click', () => {
    mobileMenuButton.classList.toggle('hamburger-active');
    mobileMenu === null || mobileMenu === void 0 ? void 0 : mobileMenu.classList.toggle('hidden');
});
//   Utility Functions
function addProductToCart(product) {
    const cartItems = getCartItems();
    // Check if product already exists in cart
    const existingItem = cartItems.find(item => item.id === product.id);
    if (!existingItem) {
        cartItems.push(product);
        saveCartItems(cartItems);
        updateCartCounts();
        // Show success notification
        const notification = document.createElement('div');
        notification.className = 'fixed bottom-40 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-up';
        notification.textContent = `${product.name} added to cart!`;
        document.body.appendChild(notification);
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('animate-fade-in-up');
            notification.classList.add('animate-fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    else {
        // Show already in cart notification
        const notification = document.createElement('div');
        notification.className = 'fixed bottom-40 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-up';
        notification.textContent = `${product.name} is already in your cart`;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.classList.remove('animate-fade-in-up');
            notification.classList.add('animate-fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}
// =====  INITIALIZATION =====
(_a = document.getElementById("viewAllProducts")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    window.location.href = "/products.html";
});
function saveCartItems(items) {
    localStorage.setItem("cartItems", JSON.stringify(items));
}
function getStoredProducts() {
    return JSON.parse(localStorage.getItem("products") || "[]");
}
function getCartItems() {
    return JSON.parse(localStorage.getItem("cartItems") || '[]');
}
function updateCartCounts() {
    const cartItems = getCartItems();
    if (cart)
        cart.textContent = cartItems.length.toString();
    if (cartMobile)
        cartMobile.textContent = cartItems.length.toString();
}
// ===== 1. CATEGORIES =====
const categories = [
    { id: 1, name: "Electronics & Gadgets", image: "https://t3.ftcdn.net/jpg/02/57/16/84/360_F_257168460_AwhicdEIavp7bdCbHXyTaBTHnBoBcZad.jpg" },
    { id: 2, name: "Fashion & Clothing", image: "https://as1.ftcdn.net/v2/jpg/03/34/79/68/1000_F_334796865_VVTjg49nbLgQPG6rgKDjVqSb5XUhBVsW.jpg" },
    { id: 3, name: "Beauty & Personal Care", image: "https://halanoor.pk/wp-content/uploads/2024/04/Rotating-Makeup-Organizer-500x500.jpg" },
    { id: 4, name: "Home & Living", image: "https://arysahulatbazar.pk/wp-content/uploads/2024/01/Amb-4.jpg" },
    { id: 5, name: "Appliances", image: "https://ahmadsfinekitchen.com/wp-content/uploads/2014/09/1.jpg" },
    { id: 6, name: "Sports & Outdoor", image: "https://kinnaird.edu.pk/wp-content/uploads/2024/07/1.png" },
    { id: 7, name: "Toys, Kids & Baby Products", image: "https://thumbs.dreamstime.com/b/heap-toys-eps-vector-illustration-48098461.jpg" },
    { id: 8, name: "Books & Stationery", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Books.by.women.photographers.jpeg/1200px-Books.by.women.photographers.jpeg" },
    { id: 9, name: "Food & Beverages", image: "https://industrialoutlook.in/wp-content/uploads/2023/01/Food.webp" },
    { id: 10, name: "Jewelry & Watches", image: "https://www.lalueur.pk/cdn/shop/files/Secondary24.jpg?v=1749582909" },
    { id: 11, name: "Health & Wellness", image: "https://www.nwths.com/sites/nwths.com/files/protein-sources-800x600.png" },
    { id: 12, name: "Automotive", image: "https://media.istockphoto.com/id/478107962/photo/auto-parts.jpg?s=612x612&w=0&k=20&c=C31mE-cVYFlLqJp9smDKUczPoBEtoYl5gaGxdvH0lmM=" },
    { id: 13, name: "Pet Supplies", image: "https://petsone.pk/wp-content/uploads/2024/02/Pet-Snacks-Raw-Hide-Bones-for-Dogs-03.jpg" },
    { id: 14, name: "Gifts & Occasions", image: "https://images.squarespace-cdn.com/content/v1/5a35a8d129f187ac01aa178a/1543453387890-QI9CL0KC7TQXRL2PUEDL/IMG_1708+%281%29.JPG" }
];
const categoryContainer = document.getElementById("categoryContainer");
function renderCategories() {
    if (!categoryContainer)
        return;
    categoryContainer.innerHTML = "";
    categories.forEach(cat => {
        const card = document.createElement("div");
        card.className = `flex items-center justify-center rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer min-w-[140px] md:min-w-[180px] h-24 relative overflow-hidden bg-cover bg-center transform hover:scale-105 hover:shadow-pink-200`;
        card.style.backgroundImage = `url('${cat.image}')`;
        const overlay = document.createElement("div");
        overlay.className = "absolute inset-0 bg-black/50";
        const text = document.createElement("h3");
        text.className = `text-lg font-bold text-white z-10 px-2 text-center relative`;
        text.textContent = cat.name;
        card.appendChild(overlay);
        card.appendChild(text);
        card.onclick = () => alert('You selected: ' + cat.name);
        categoryContainer.appendChild(card);
    });
}
// ===== 7. BIG SAVING DEALS SECTION  =====
const bigSavingContainer = document.getElementById("bigSavingProducts");
function renderBigSavingProducts() {
    if (!bigSavingContainer)
        return;
    const storedProducts = getStoredProducts();
    let discountedProducts = storedProducts.filter(product => { var _a; return ((_a = product.discount) !== null && _a !== void 0 ? _a : 0) > 5; });
    bigSavingContainer.innerHTML = "";
    if (discountedProducts.length === 0) {
        bigSavingContainer.innerHTML = `<p class="text-gray-500 text-center col-span-full">No big saving products found</p>`;
        return;
    }
    // Simple row control
    const isMobile = window.innerWidth < 640; // <640px = mobile
    const maxProducts = isMobile ? 8 : 10; // 4 rows on mobile, 2 rows on desktop
    discountedProducts = storedProducts.slice(0, maxProducts);
    discountedProducts.forEach(product => {
        const discountedPrice = product.discount
            ? Math.round(product.price - (product.price * (product.discount / 100)))
            : product.price;
        const card = document.createElement("div");
        card.className = "bg-white rounded-xl shadow hover:shadow-lg overflow-hidden transition group";
        card.innerHTML = `
      <div class="relative overflow-hidden">
        <img src="${product.imageUrl}" alt="${product.name}"
          class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" />
        ${product.discount
            ? `<span class="absolute top-2 left-2 bg-pink-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
                 ${product.discount}% OFF
               </span>`
            : ""}
        <div class="absolute top-2 right-2">
          <button class="menu-btn p-1 rounded-full bg-white shadow hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 cursor-pointer" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="5" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="12" cy="19" r="2" />
            </svg>
          </button>
         <div class="menu hidden absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
           <button class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:rounded-lg add-to-cart">
           Add to Cart
           </button>
         </div>
        </div>
      </div>
      <div class="p-3">
        <h3 class="text-sm font-bold text-pink-600 truncate">${product.name}</h3>
        <div class="mt-1 flex gap-3 items-center">
          ${product.discount
            ? `<span class="text-black font-bold text-[16px]">Rs.${discountedPrice.toLocaleString()}</span>
             <span class="text-[10px] bg-pink-300 rounded-md px-1 py-1 font-bold text-gray-900">-${product.discount}%</span>`
            : `<span class="text-lg font-bold text-gray-900">Rs.${product.price.toLocaleString()}</span>`}
        </div>
        <div class="flex items-center justify-between">
          <div>
            <span class="text-yellow-400 text-[15px] sm:text-[16px]">${"★".repeat(Math.floor(product.rating || 0))}</span>
            <span class="text-gray-400 text-[15px] sm:text-[16px]">${"★".repeat(5 - Math.floor(product.rating || 0))}</span>
            ${product.rating ? `<span class="ml-1 text-xs">(${product.rating})</span>` : ""}
            <span class="text-[11px] sm:text-sm text-gray-600">sold(~)</span>
          </div>  
      </div>
    `;
        // Toggle menu open/close
        const menuBtn = card.querySelector('.menu-btn');
        const menu = card.querySelector('.menu');
        const addToCartBtnCard = card.querySelector('.add-to-cart');
        menuBtn === null || menuBtn === void 0 ? void 0 : menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('.menu').forEach((m) => m.classList.add('hidden')); // close others
            menu.classList.toggle('hidden');
        });
        // Add to cart action
        addToCartBtnCard === null || addToCartBtnCard === void 0 ? void 0 : addToCartBtnCard.addEventListener('click', () => addProductToCart(product));
        // Close menu when clicking outside
        document.addEventListener('click', () => {
            menu.classList.add('hidden');
        });
        bigSavingContainer.appendChild(card);
    });
}
//  FREE DELIVERY SECTION FUNCTIONALITY   
let freeDeliveryProductsContainer = document.getElementById("freeDeliveryProducts");
function renderFreeDeliveryProducts() {
    if (!freeDeliveryProductsContainer)
        return;
    let storedProducts = getStoredProducts();
    let freeDeliveryProducts = storedProducts.filter((p) => {
        return p.isFreeDelivery === true;
    });
    freeDeliveryProductsContainer.innerHTML = "";
    if (freeDeliveryProducts.length == 0) {
        freeDeliveryProductsContainer.innerHTML = `<p class="text-gray-500 text-center col-span-full">No Free Delivery Products found</p>`;
        return;
    }
    // Simple row control
    const isMobile = window.innerWidth < 640; // <640px = mobile
    const maxProducts = isMobile ? 8 : 10; // 4 rows on mobile, 2 rows on desktop
    freeDeliveryProducts = storedProducts.slice(0, maxProducts);
    freeDeliveryProducts.forEach((product) => {
        const discountedPrice = product.discount
            ? Math.round(product.price - (product.price * (product.discount / 100)))
            : product.price;
        const discountedPriceSaved = product.discount
            ? product.price - discountedPrice
            : "0";
        const card = document.createElement("div");
        card.className = "bg-white rounded-xl shadow hover:shadow-lg overflow-hidden transition group";
        card.innerHTML = `
      <div class="relative overflow-hidden">
        <img src="${product.imageUrl}" alt="${product.name}"
          class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" />
        ${product.isFreeDelivery
            ? `<span class="absolute top-2 left-2 bg-pink-600 text-white text-[11px] sm:text-xs font-semibold px-2 py-1 rounded-md">
                 Free Delivery
               </span>`
            : ""}
        <div class="absolute top-2 right-2">
          <button class="menu-btn p-1 rounded-full bg-white shadow hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 cursor-pointer" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="5" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="12" cy="19" r="2" />
            </svg>
          </button>
         <div class="menu hidden absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
           <button class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-pink-100 add-to-cart">
           Add to Cart
           </button>
         </div>
        </div>

      </div>
      <div class="p-3">
        <h3 class="text-sm font-bold text-pink-600 truncate">${product.name}</h3>
        <div class="mt-1 flex gap-1 items-center">
          ${product.discount
            ? `<span class="text-black font-bold text-[16px]">Rs.${discountedPrice.toLocaleString()}</span>
             <span class="text-[10px] bg-pink-300 rounded-md px-1 py-1 font-bold text-gray-900">-${product.discount}%</span>`
            : `<span class="text-lg font-bold text-gray-900">Rs.${product.price.toLocaleString()}</span>`}
        </div>
        <div class="flex items-center justify-between">
          <div>
            <span class="text-yellow-400 text-[15px] sm:text-[16px]">${"★".repeat(Math.floor(product.rating || 0))}</span>
            <span class="text-gray-400 text-[15px] sm:text-[16px]">${"★".repeat(5 - Math.floor(product.rating || 0))}</span>
            ${product.rating ? `<span class="ml-1 text-xs">(${product.rating})</span>` : ""}
            <span class="text-[11px] sm:text-sm text-gray-600">sold(~)</span>
          </div>  
      </div>
    `;
        // Toggle menu open/close
        const menuBtn = card.querySelector('.menu-btn');
        const menu = card.querySelector('.menu');
        const addToCartBtnCard = card.querySelector('.add-to-cart');
        menuBtn === null || menuBtn === void 0 ? void 0 : menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('.menu').forEach((m) => m.classList.add('hidden')); // close others
            menu.classList.toggle('hidden');
        });
        // Add to cart action
        addToCartBtnCard === null || addToCartBtnCard === void 0 ? void 0 : addToCartBtnCard.addEventListener('click', () => addProductToCart(product));
        // Close menu when clicking outside
        document.addEventListener('click', () => {
            menu.classList.add('hidden');
        });
        freeDeliveryProductsContainer.appendChild(card);
    });
}
//   on documnet load 
document.addEventListener("DOMContentLoaded", () => {
    updateCartCounts();
    renderBigSavingProducts();
    renderFreeDeliveryProducts();
    renderCategories();
});
//# sourceMappingURL=deals.js.map