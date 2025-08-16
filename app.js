document.addEventListener("DOMContentLoaded", () => {
    // ===== 2. NAVBAR FUNCTIONALITY =====
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    const cart = document.getElementById("cart");
    const cartMobile = document.getElementById("cartMobile");
    mobileMenuButton?.addEventListener('click', () => {
        mobileMenuButton.classList.toggle('hamburger-active');
        mobileMenu?.classList.toggle('hidden');
    });
    function updateCartCounts() {
        const cartItems = getCartItems();
        if (cart)
            cart.textContent = cartItems.length.toString();
        if (cartMobile)
            cartMobile.textContent = cartItems.length.toString();
    }
    // ===== 3. SLIDER PRODUCTS DATA =====
    const sliderProducts = [
        { id: 1, name: "Apple iPhone 16 Pro Max", price: 11990, imageUrl: "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-hero-geo-240909_inline.jpg.large.jpg", description: "Apple iPhone 16 Pro Max with A17 Pro chip and titanium frame." },
        { id: 2, name: "Samsung Galaxy S24 Ultra", price: 13990, imageUrl: "https://images.samsung.com/is/image/samsung/p6pim/pk/feature/165525818/pk-feature-galaxy-s24-ultra-543035573?$FB_TYPE_A_MO_JPG$", description: "Samsung Galaxy S24 Ultra with 200MP camera and Snapdragon 8 Gen 3." },
        { id: 3, name: "Sony WH-1000XM5 Headphones", price: 3989, imageUrl: "https://static.webx.pk/files/19643/Images/sony-wh-1000xm5-silver-headphones-price-in-pakistan-19643-2088078-220524100332877.jpg", description: "Noise-canceling wireless over-ear headphones." },
        { id: 4, name: "MacBook Air M3", price: 129669, imageUrl: "https://static.webx.pk/files/4012/Images/11-4012-2280650-181224095605041.jpeg", description: "Apple MacBook Air with M3 chip, 13-inch Liquid Retina display." },
        { id: 5, name: "Dual Time Sports Watch", price: 4969, imageUrl: "https://voguealaska.pk/cdn/shop/files/Silver2_960a4e45-d5d4-47e1-acbc-1fbc6053c71f.jpg?v=1742643151&width=1024", description: "Best For Daily Use. Makes You Feel Better." },
        { id: 6, name: "Dell XPS 13 Laptop", price: 99549, imageUrl: "https://www.notebookcheck.net/fileadmin/Notebooks/Dell/XPS_13_9340_Core_Ultra_7/IMG_4090.JPG", description: "Dell XPS 13 with 11th Gen Intel i7 processor and InfinityEdge display." },
        { id: 7, name: "Apple Watch Series 9", price: 3994, imageUrl: "https://modernwears.pk/wp-content/uploads/2023/10/Untitled-design-2024-11-11T143955.085.jpg", description: "Apple Watch Series 9 with new S9 chip and enhanced health sensors." },
        { id: 8, name: "Google Pixel 8 Pro", price: 32899, imageUrl: "https://estorepakistan.com/cdn/shop/files/WhatsAppImage2025-03-07at5.52.01PM_1024x1024.webp?v=1741549859", description: "Google Pixel 8 Pro with Tensor G3 chip and advanced camera system." },
        { id: 9, name: "Bose QuietComfort Earbuds", price: 23279, imageUrl: "https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/25636997/DSC_0080.jpg?quality=90&strip=all&crop=16.666666666667,0,66.666666666667,100", description: "True wireless noise-cancelling earbuds with deep bass." },
        { id: 10, name: "Nintendo Switch OLED", price: 34329, imageUrl: "https://images.immediate.co.uk/production/volatile/sites/3/2021/10/Nintendo-Switch-OLED-review-ff1b02c.jpg?quality=90&resize=620,414", description: "Nintendo Switch OLED with vibrant 7-inch display and enhanced audio." },
    ];
    // ===== 4. SLIDER ELEMENTS =====
    const productImage = document.getElementById("product-image");
    const productName = document.getElementById("product-name");
    const productDesc = document.getElementById("product-desc");
    const productPrice = document.getElementById("product-price");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const addToCart = document.getElementById("addtocart");
    const moreBtn = document.getElementById('moreBtn');
    const moreDropdown = document.getElementById('moreDropdown');
    let currentIndex = 0;
    let slideInterval;
    function showProduct() {
        if (!sliderProducts.length)
            return;
        const product = sliderProducts[currentIndex];
        if (productName)
            productName.textContent = product.name;
        if (productImage)
            productImage.src = product.imageUrl;
        if (productDesc)
            productDesc.textContent = product.description;
        if (productPrice)
            productPrice.textContent = `Rs ${product.price.toFixed(2)}`;
    }
    function goToNext() {
        currentIndex = (currentIndex + 1) % sliderProducts.length;
        showProduct();
        resetAutoSlide();
    }
    function goToPrev() {
        currentIndex = (currentIndex - 1 + sliderProducts.length) % sliderProducts.length;
        showProduct();
        resetAutoSlide();
    }
    function startAutoSlide() {
        if (!sliderProducts.length)
            return;
        slideInterval = setInterval(goToNext, 3000);
    }
    function resetAutoSlide() {
        clearInterval(slideInterval);
        startAutoSlide();
    }
    function addCurrentToCart() {
        const product = sliderProducts[currentIndex];
        const cartItems = getCartItems();
        if (!cartItems.some((item) => item.id === product.id)) {
            cartItems.push(product);
            saveCartItems(cartItems);
            alert(`${product.name} added to cart!`);
        }
        else {
            alert(`${product.name} is already in your cart.`);
        }
        updateCartCounts();
    }
    function setupMoreDropdown() {
        if (!moreBtn || !moreDropdown)
            return;
        moreBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            moreDropdown.classList.toggle('hidden');
        });
        document.addEventListener('click', () => {
            moreDropdown.classList.add('hidden');
        });
        moreDropdown.addEventListener('click', (e) => e.stopPropagation());
        const options = moreDropdown.querySelectorAll('.dropdown-option');
        options.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                const product = sliderProducts[currentIndex];
                const icon = option.querySelector('i');
                if (!icon)
                    return;
                if (icon.classList.contains('fa-shopping-cart')) {
                    alert(`Buy Now: ${product.name} for Rs ${product.price.toFixed(2)}`);
                }
                // else if (icon.classList.contains('fa-heart')) {
                //   const favorites = getFavorites();
                //   if (!favorites.some((fav: Product) => fav.id === product.id)) {
                //     favorites.push(product);
                //     saveFavorites(favorites);
                //     alert(`${product.name} added to favorites!`);
                //   } else {
                //     alert(`${product.name} is already in favorites!`);
                //   }
                // }
                else if (icon.classList.contains('fa-share-alt')) {
                    if (navigator.share) {
                        navigator.share({
                            title: product.name,
                            text: `Check out ${product.name} on our store!`,
                            url: window.location.href
                        }).catch(err => console.log('Error sharing:', err));
                    }
                    else {
                        alert(`Share this product: ${product.name}\n${window.location.href}`);
                    }
                }
                else if (icon.classList.contains('fa-info-circle')) {
                    alert(`Product Details:\n\nName: ${product.name}\n\nDescription: ${product.description}\n\nPrice: Rs ${product.price.toFixed(2)}`);
                }
                moreDropdown.classList.add('hidden');
            });
        });
    }
    // ===== END OF Slide Bar =====
    // ===== 5. UTILITY FUNCTIONS =====
    function getCartItems() {
        try {
            return JSON.parse(localStorage.getItem("cartItems") || "[]");
        }
        catch {
            return [];
        }
    }
    function saveCartItems(items) {
        localStorage.setItem("cartItems", JSON.stringify(items));
    }
    // function getFavorites(): Product[] {
    //   try {
    //     return JSON.parse(localStorage.getItem("favorites") || "[]");
    //   } catch {
    //     return [];
    //   }
    // }
    // function saveFavorites(items: Product[]): void {
    //   localStorage.setItem("favorites", JSON.stringify(items));
    // }
    // ===== 6. CATEGORIES =====
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
    // ===== END OF CATEGORY BUTTONS ======
    // ===== 7. BIG SAVING DEALS SECTION  =====
    const bigSavingContainer = document.getElementById("bigSavingProducts");
    function renderBigSavingProducts() {
        if (!bigSavingContainer)
            return;
        const storedProducts = getStoredProducts();
        let discountedProducts = storedProducts.filter(product => (product.discount ?? 0) > 5);
        bigSavingContainer.innerHTML = "";
        if (discountedProducts.length === 0) {
            bigSavingContainer.innerHTML = `<p class="text-gray-500 text-center col-span-full">No big saving products found</p>`;
            return;
        }
        discountedProducts = discountedProducts.slice(0, 10);
        discountedProducts.forEach(product => {
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
        ${product.discount
                ? `<span class="absolute top-2 right-2 bg-pink-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
                 ${product.discount}% OFF
               </span>`
                : ""}
        <button class="add-to-cart-btn absolute bottom-2 rounded-2xl left-3 right-3 bg-pink-500 text-white py-2 text-sm font-medium opacity-0 translate-y-full group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.3 5.2a1 1 0 00.97 1.3h12.66a1 1 0 00.97-1.3L17 13M9 21h.01M15 21h.01"/>
          </svg>
          <span>Add to Cart</span>
        </button>
      </div>
      <div class="p-3">
        <h3 class="text-sm font-bold text-pink-600 truncate">${product.name}</h3>
        <div class="mt-1 flex gap-3 items-center">
          ${product.discount
                ? `<span class="text-gray-500 text-sm line-through">Rs.${product.price.toLocaleString()}</span>
             <span class="text-lg font-bold text-gray-900">Rs.${discountedPrice.toLocaleString()}</span>             `
                : `<span class="text-lg font-bold text-gray-900">Rs.${product.price.toLocaleString()}</span>`}
        </div>
        <div class="flex items-center justify-between">
          <div>
            <span class="text-yellow-400">${"★".repeat(Math.floor(product.rating || 0))}</span>
            <span class="text-gray-400">${"★".repeat(5 - Math.floor(product.rating || 0))}</span>
            ${product.rating ? `<span class="ml-1 text-xs">(${product.rating})</span>` : ""}
          </div>  
      </div>
    `;
            // Add event listener to the button
            const addToCartBtn = card.querySelector('.add-to-cart-btn');
            addToCartBtn?.addEventListener('click', () => addProductToCart(product));
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
        freeDeliveryProducts = freeDeliveryProducts.slice(0, 10);
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
        ${product.discount
                ? `<span class="absolute top-2 right-2 bg-pink-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
                 ${product.discount}% OFF
               </span>`
                : ""}
        <button class="add-to-cart-btn absolute bottom-2 rounded-2xl left-3 right-3 bg-pink-500 text-white py-2 text-sm font-medium opacity-0 translate-y-full group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.3 5.2a1 1 0 00.97 1.3h12.66a1 1 0 00.97-1.3L17 13M9 21h.01M15 21h.01"/>
          </svg>
          <span>Add to Cart</span>
        </button>
      </div>
      <div class="p-3">
        <h3 class="text-sm font-bold text-pink-600 truncate">${product.name}</h3>
        <div class="mt-1 flex gap-3 items-center">
          ${product.discount
                ? `<span class="text-gray-500 text-sm line-through">Rs.${product.price.toLocaleString()}</span>
             <span class="text-lg font-bold text-gray-900">Rs.${discountedPrice.toLocaleString()}</span>             `
                : `<span class="text-lg font-bold text-gray-900">Rs.${product.price.toLocaleString()}</span>`}
        </div>
        <div class="flex items-center justify-between">
          <div>
            <span class="text-yellow-400">${"★".repeat(Math.floor(product.rating || 0))}</span>
            <span class="text-gray-400">${"★".repeat(5 - Math.floor(product.rating || 0))}</span>
            ${product.rating ? `<span class="ml-1 text-xs">(${product.rating})</span>` : ""}
          </div>  
      </div>
    `;
            console.log("Rendering product:", product);
            // Add event listener to the button
            const addToCartBtn = card.querySelector('.add-to-cart-btn');
            addToCartBtn?.addEventListener('click', () => addProductToCart(product));
            freeDeliveryProductsContainer.appendChild(card);
        });
    }
    function getStoredProducts() {
        try {
            return JSON.parse(localStorage.getItem("products") || "[]");
        }
        catch {
            return [];
        }
    }
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
            notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-up';
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
            notification.className = 'fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-up';
            notification.textContent = `${product.name} is already in your cart`;
            document.body.appendChild(notification);
            setTimeout(() => {
                notification.classList.remove('animate-fade-in-up');
                notification.classList.add('animate-fade-out');
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }
    }
    // ===== 8. INITIALIZATION =====
    document.getElementById("viewAllProducts")?.addEventListener("click", () => {
        window.location.href = "/products.html";
    });
    // Initialize all components
    showProduct();
    startAutoSlide();
    updateCartCounts();
    setupMoreDropdown();
    renderCategories();
    renderBigSavingProducts();
    renderFreeDeliveryProducts();
    // Event listeners
    prevBtn?.addEventListener('click', goToPrev);
    nextBtn?.addEventListener('click', goToNext);
    addToCart?.addEventListener('click', addCurrentToCart);
});
export {};
