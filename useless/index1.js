// window.addEventListener("DOMContentLoaded", () => {
//   const container = document.getElementById("localStorageProducts");
//   if (!container) return;
//   // Get products from localStorage (same key as myshop.ts)
//   const productsJSON = localStorage.getItem("products");
//   if (!productsJSON) {
//     container.innerHTML = `<p class="text-gray-500">No products found. Add some products in MyShop page.</p>`;
//     return;
//   }
//   const productsFromStorage = JSON.parse(productsJSON);
//   if (productsFromStorage.length === 0) {
//     container.innerHTML = `<p class="text-gray-500">No products found. Add some products in MyShop page.</p>`;
//     return;
//   }
//   // Clear container
//   container.innerHTML = "";
//   // Create product cards
//   productsFromStorage.forEach((productFromStorage: any) => {
//     const card = document.createElement("div");
//     card.className = "bg-white rounded-xl shadow-md overflow-hidden hover:shadow-pink-400 transition-shadow";
//     card.innerHTML = `
//       <img src="${productFromStorage.imageUrl}" alt="${productFromStorage.name}" class="w-full h-48 object-contain rounded-t-xl" />
//       <div class="p-4">
//         <h3 class="text-xl font-bold text-pink-600 mb-2">${productFromStorage.name}</h3>
//         <p class="text-gray-700 mb-1">${productFromStorage.description}</p>
//         <p class="text-pink-600 font-semibold mb-1">$${productFromStorage.price.toFixed(2)}</p>
//         <p class="text-gray-500 text-sm capitalize">Category: ${productFromStorage.category}</p>
//       </div>
//     `;
//     container.appendChild(card);
//   });
// });
window.addEventListener("DOMContentLoaded", () => {
    // Navbar toggle for mobile menu
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenuDropdown = document.getElementById("mobileMenuDropdown");
    menuBtn?.addEventListener("click", () => {
        mobileMenuDropdown?.classList.toggle("hidden");
    });
    // Sample products array (for product slider)
    const products = [
        { id: 1, name: "Apple iPhone 16 Pro Max", price: 1199, image: "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-hero-geo-240909_inline.jpg.large.jpg", description: "Apple iPhone 16 Pro Max with A17 Pro chip and titanium frame." },
        { id: 2, name: "Samsung Galaxy S24 Ultra", price: 1399, image: "https://images.samsung.com/is/image/samsung/p6pim/pk/feature/165525818/pk-feature-galaxy-s24-ultra-543035573?$FB_TYPE_A_MO_JPG$", description: "Samsung Galaxy S24 Ultra with 200MP camera and Snapdragon 8 Gen 3." },
        // Add more products as needed...
    ];
    // Get slider DOM elements
    const productImage = document.getElementById("product-image");
    const productName = document.getElementById("product-name");
    const productDesc = document.getElementById("product-desc");
    const productPrice = document.getElementById("product-price");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    if (!productImage || !productName || !productDesc || !productPrice || !prevBtn || !nextBtn) {
        console.error("Some required elements are missing. Slider won't work.");
        return;
    }
    let currentIndex = 0;
    // Show product info by index
    function showProduct(index) {
        if (index < 0)
            currentIndex = products.length - 1;
        else if (index >= products.length)
            currentIndex = 0;
        else
            currentIndex = index;
        const product = products[currentIndex];
        productImage.src = product.image;
        productImage.alt = product.name;
        productName.textContent = product.name;
        productDesc.textContent = product.description;
        productPrice.textContent = "$" + product.price.toFixed(2);
    }
    // Button click handlers for slider
    prevBtn.addEventListener("click", () => {
        showProduct(currentIndex - 1);
        resetAutoSlide();
    });
    nextBtn.addEventListener("click", () => {
        showProduct(currentIndex + 1);
        resetAutoSlide();
    });
    // Auto slide every 3 seconds
    let slideInterval = setInterval(() => {
        showProduct(currentIndex + 1);
    }, 3000);
    // Reset timer when user manually changes slide
    function resetAutoSlide() {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            showProduct(currentIndex + 1);
        }, 3000);
    }
    showProduct(currentIndex);
});
window.addEventListener("DOMContentLoaded", () => {
    // Navbar toggle for mobile menu
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenuDropdown = document.getElementById("mobileMenuDropdown");
    if (menuBtn && mobileMenuDropdown) {
        menuBtn.addEventListener("click", () => {
            mobileMenuDropdown.classList.toggle("hidden");
        });
    }
    // Get products from localStorage
    const productsJSON = localStorage.getItem("products");
    if (!productsJSON) {
        console.warn("No products found in localStorage.");
        return;
    }
    let storedProducts;
    try {
        storedProducts = JSON.parse(productsJSON);
    }
    catch {
        console.error("Invalid products data in localStorage.");
        return;
    }
    if (!Array.isArray(storedProducts) || storedProducts.length === 0) {
        console.warn("No valid products found.");
        return;
    }
    // Map categories to container IDs in your HTML
    const categoryToContainerId = {
        Personal: "watchesProducts",
        Electronics: "electronicsProducts",
        Grocery: "groceryProducts",
        Clothing: "clothingProducts",
        Games: "gamesProducts",
        Other: "otherProducts",
    };
    // Find containers in the DOM
    const containers = {};
    Object.values(categoryToContainerId).forEach((id) => {
        containers[id] = document.getElementById(id);
    });
    // Clear previous content from all containers
    Object.values(containers).forEach((container) => {
        if (container)
            container.innerHTML = "";
    });
    // Group products by category (capitalize first letter)
    const productsByCategory = {};
    storedProducts.forEach((product) => {
        const cat = product.category.charAt(0).toUpperCase() + product.category.slice(1).toLowerCase();
        if (!productsByCategory[cat])
            productsByCategory[cat] = [];
        productsByCategory[cat].push(product);
    });
    // Create horizontal scroll container for slider effect
    function createSliderContainer() {
        const container = document.createElement("div");
        container.className = "flex gap-6 overflow-x-auto scrollbar-hide py-2 scroll-smooth";
        container.style.scrollPadding = "1rem";
        return container;
    }
    // Create product card HTML element
    function createProductCard(product) {
        const card = document.createElement("div");
        card.className = `
      inline-block
      bg-gray-50
      rounded-lg
      shadow-sm
      mr-4
      w-56
      flex-shrink-0
      cursor-pointer
      transition-transform
      duration-300
      hover:scale-105
      hover:shadow-md
    `;
        card.innerHTML = `
      <div style="width: 100%; height: 160px; overflow: hidden;">
      <img src="${product.image || product.imageUrl}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover padding: 1rem;" />
    </div>
    <div class="p-3 flex flex-col flex-grow">
      <h3 class="text-md font-semibold mb-1 text-gray-900">${product.name}</h3>
      <p class="text-gray-700 font-semibold text-lg mb-2">$${product.price.toFixed(2)}</p>
      <p class="text-gray-600 text-sm flex-grow">${product.description.length > 60 ? product.description.slice(0, 60) + "..." : product.description}</p>
    </div>
    `;
        return card;
    }
    // Render all products grouped by category in their containers
    Object.entries(productsByCategory).forEach(([category, products]) => {
        const containerId = categoryToContainerId[category];
        if (!containerId)
            return;
        const parentContainer = containers[containerId];
        if (!parentContainer)
            return;
        parentContainer.innerHTML = ""; // Clear container
        const sliderContainer = createSliderContainer();
        // Add all products for this category
        products.forEach((product) => {
            sliderContainer.appendChild(createProductCard(product));
        });
        parentContainer.appendChild(sliderContainer);
    });
});
export {};
