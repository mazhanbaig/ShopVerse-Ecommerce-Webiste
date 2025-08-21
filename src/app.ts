document.addEventListener("DOMContentLoaded", () => {
  // ===== 1. TYPE DEFINITIONS =====
  type Product = {
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
    isFreeDelivery: boolean;
    isCashOnDelivery: boolean;
    isReturnable: boolean;
  };

  interface Category {
    id: number;
    name: string;
    image: string;
  }

  // ===== 2. NAVBAR FUNCTIONALITY =====
  const mobileMenuButton = document.getElementById('mobileMenuButton');
  const mobileMenu = document.getElementById('mobileMenu');
  const cart = document.getElementById("cart");
  const cartMobile = document.getElementById("cartMobile");

  // Toggle mobile menu
  mobileMenuButton?.addEventListener('click', () => {
    mobileMenuButton.classList.toggle('hamburger-active');
    mobileMenu?.classList.toggle('hidden');
  });

  // Update cart count display
  function updateCartCounts(): void {
    const cartItems = getCartItems();
    if (cart) cart.textContent = cartItems.length.toString();
    if (cartMobile) cartMobile.textContent = cartItems.length.toString();
  }

  // ===== 3. SLIDER PRODUCTS DATA =====
  const sliderProducts: <Partial>Product[] = [
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
  const productImage = document.getElementById("product-image") as HTMLImageElement | null;
  const productName = document.getElementById("product-name");
  const productDesc = document.getElementById("product-desc");
  const productPrice = document.getElementById("product-price");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const addToCart = document.getElementById("addtocart");
  const moreBtn = document.getElementById('moreBtn');
  const moreDropdown = document.getElementById('moreDropdown');

  let currentIndex = 0;
  let slideInterval: number;

  // Display current product in slider
  function showProduct(): void {
    if (!sliderProducts.length) return;
    const product = sliderProducts[currentIndex];
    if (productName) productName.textContent = product.name;
    if (productImage) productImage.src = product.imageUrl;
    if (productDesc) productDesc.textContent = product.description;
    if (productPrice) productPrice.textContent = `Rs ${product.price.toFixed(2)}`;
  }

  // Navigate to next product in slider
  function goToNext(): void {
    currentIndex = (currentIndex + 1) % sliderProducts.length;
    showProduct();
    resetAutoSlide();
  }

  // Navigate to previous product in slider
  function goToPrev(): void {
    currentIndex = (currentIndex - 1 + sliderProducts.length) % sliderProducts.length;
    showProduct();
    resetAutoSlide();
  }

  // Start automatic slideshow
  function startAutoSlide(): void {
    if (!sliderProducts.length) return;
    slideInterval = setInterval(goToNext, 3000) as unknown as number;
  }

  // Reset automatic slideshow timer
  function resetAutoSlide(): void {
    clearInterval(slideInterval);
    startAutoSlide();
  }

  // Add current slider product to cart
  function addCurrentToCart(): void {
    const product = sliderProducts[currentIndex];
    const cartItems = getCartItems();

    if (!cartItems.some((item: Product) => item.id === product.id)) {
      cartItems.push(product);
      saveCartItems(cartItems);
      alert(`${product.name} added to cart!`);
    } else {
      alert(`${product.name} is already in your cart.`);
    }
    updateCartCounts();
  }

  // Set up dropdown menu functionality
  function setupMoreDropdown(): void {
    if (!moreBtn || !moreDropdown) return;

    moreBtn.addEventListener('click', (e: MouseEvent) => {
      e.stopPropagation();
      moreDropdown.classList.toggle('hidden');
    });

    document.addEventListener('click', () => {
      moreDropdown.classList.add('hidden');
    });

    moreDropdown.addEventListener('click', (e: MouseEvent) => e.stopPropagation());

    const options = moreDropdown.querySelectorAll('.dropdown-option');
    options.forEach(option => {
      option.addEventListener('click', (e: Event) => {
        e.preventDefault();
        const product = sliderProducts[currentIndex];
        const icon = option.querySelector('i');
        if (!icon) return;

        if (icon.classList.contains('fa-shopping-cart')) {
          alert(`Buy Now: ${product.name} for Rs ${product.price.toFixed(2)}`);
        } else if (icon.classList.contains('fa-share-alt')) {
          if (navigator.share) {
            navigator.share({
              title: product.name,
              text: `Check out ${product.name} on our store!`,
              url: window.location.href
            }).catch(err => console.log('Error sharing:', err));
          } else {
            alert(`Share this product: ${product.name}\n${window.location.href}`);
          }
        } else if (icon.classList.contains('fa-info-circle')) {
          alert(`Product Details:\n\nName: ${product.name}\n\nDescription: ${product.description}\n\nPrice: Rs ${product.price.toFixed(2)}`);
        }

        moreDropdown.classList.add('hidden');
      });
    });
  }

  // ===== 5. UTILITY FUNCTIONS =====
  // Get cart items from localStorage
  function getCartItems(): Product[] {
    try {
      return JSON.parse(localStorage.getItem("cartItems") || "[]");
    } catch {
      return [];
    }
  }

  // Save cart items to localStorage
  function saveCartItems(items: Product[]): void {
    localStorage.setItem("cartItems", JSON.stringify(items));
  }

  // ===== 6. CATEGORIES =====
  const categories: Category[] = [
    { id: 1, name: "Electronics & Gadgets", image: "https://t3.ftcdn.net/jpg/02/57/16/84/360_F_257168460_AwhicdEIavp7bdCbHXyTaBTHnBoBcZad.jpg" },
    { id: 2, name: "Fashion & Clothing", image: "https://as1.ftcdn.net/v2/jpg/03/34/79/68/1000_F_334796865_VVTjg49nbLgQPG6rgKDjVqSb5XUhBVsW.jpg" },
    { id: 3, name: "Beauty & Personal Care", image: "https://halanoor.pk/wp-content/uploads/2024/04/Rotating-Makeup-Organizer-500x500.jpg" }
  ];

  const categoryContainer = document.getElementById("categoryContainer");

  // Render category cards
  function renderCategories(): void {
    if (!categoryContainer) return;
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

  // ===== 7. PRODUCT CONTAINER FUNCTIONALITY =====
  // Get all products from localStorage
  function getStoredProducts(): Product[] {
    try {
      return JSON.parse(localStorage.getItem("products") || "[]");
    } catch {
      return [];
    }
  }

  // Get products with discount greater than 7%
  function getDiscountProducts(): Product[] {
    try {
      const allProducts = JSON.parse(localStorage.getItem("products") || "[]");
      return allProducts.filter(p => (p.discount ?? 0) > 7);
    } catch {
      return [];
    }
  }

  // Render products in the product container
  function renderProducts(products: Product[], categoryTag: string): void {
    const container = document.getElementById("productContainer");
    if (!container) return;

    container.innerHTML = "";

    if (products.length === 0) {
      container.innerHTML = `<p class="text-gray-500 text-center col-span-full">No products found</p>`;
      return;
    }

    products.forEach(product => {
      const discountedPrice = product.discount
        ? Math.round(product.price - (product.price * (product.discount / 100)))
        : product.price;

      const card = document.createElement("div");
      card.className = "bg-white rounded-xl shadow hover:shadow-lg overflow-hidden transition group";

      card.innerHTML = `
        <div class="relative overflow-hidden">
          <img src="${product.imageUrl}" alt="${product.name}"
            class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" />
          ${categoryTag
            ? `<span class="absolute top-2 left-2 bg-pink-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
                  ${categoryTag === "Discount" ? `${product.discount}% OFF` : categoryTag}
                </span>`
            : ""
          }
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
              : `<span class="text-lg font-bold text-gray-900">Rs.${product.price.toLocaleString()}</span>`
            }
          </div>
          <div class="flex items-center justify-between mt-2">
            <div>
              <span class="text-yellow-400 text-[15px] sm:text-[16px]">${"★".repeat(Math.floor(product.rating || 0))}</span>
              <span class="text-gray-400 text-[15px] sm:text-[16px]">${"★".repeat(5 - Math.floor(product.rating || 0))}</span>
              ${product.rating ? `<span class="ml-1 text-xs">(${product.rating})</span>` : ""}
            </div>  
          </div>
        </div>
      `;

      // Toggle menu open/close
      const menuBtn = card.querySelector('.menu-btn') as HTMLButtonElement;
      const menu = card.querySelector('.menu') as HTMLDivElement;
      const addToCartBtnCard = card.querySelector('.add-to-cart') as HTMLButtonElement;

      menuBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        document.querySelectorAll('.menu').forEach((m) => m.classList.add('hidden'));
        menu.classList.toggle('hidden');
      });

      // Add to cart action
      addToCartBtnCard?.addEventListener('click', () => addProductToCart(product));

      // Close menu when clicking outside
      document.addEventListener('click', () => {
        menu.classList.add('hidden');
      });

      container.appendChild(card);
    });
  }

  // Add product to cart with notification
  function addProductToCart(product: Product): void {
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
    } else {
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

  // ===== 8. FILTER BUTTONS FUNCTIONALITY =====
  // Set active state for filter buttons
  function setActiveButton(activeButton: HTMLElement): void {
    // Remove active class from all buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    activeButton.classList.add('active');
  }

  // Initialize product filtering with active button states
  function initializeProductFilters(): void {
    const freeDeliveryBtn = document.getElementById("freeDeliveryProducts");
    const forYouBtn = document.getElementById("forYouProducts");
    const newArrivalBtn = document.getElementById("newArrivalProducts");
    const discountBtn = document.getElementById("discountProducts");
    const trendingBtn = document.getElementById("trendingProducts");

    const allProducts = getStoredProducts();

    // Set discount button as active by default
    if (discountBtn) discountBtn.classList.add('active');

    // Free Delivery filter
    freeDeliveryBtn?.addEventListener("click", () => {
      const filtered = allProducts.filter(p => p.isFreeDelivery);
      renderProducts(filtered, "Free Delivery");
      setActiveButton(freeDeliveryBtn);
    });

    // For You filter (show all)
    forYouBtn?.addEventListener("click", () => {
      renderProducts(allProducts, "For You");
      setActiveButton(forYouBtn);
    });

    // New Arrival filter
    newArrivalBtn?.addEventListener("click", () => {
      const sorted = [...allProducts].sort((a, b) => b.id - a.id);
      renderProducts(sorted, "New Arrival");
      setActiveButton(newArrivalBtn);
    });

    // Discount filter
    discountBtn?.addEventListener("click", () => {
      const filtered = allProducts.filter(p => (p.discount ?? 0) > 7);
      renderProducts(filtered, "Discount");
      setActiveButton(discountBtn);
    });

    // Trending filter
    trendingBtn?.addEventListener("click", () => {
      const filtered = allProducts.filter(p => (p.rating ?? 0) > 4);
      renderProducts(filtered, "Trending");
      setActiveButton(trendingBtn);
    });
  }

  // ===== 9. INITIALIZATION =====
  // Initialize all components
  showProduct();
  startAutoSlide();
  updateCartCounts();
  setupMoreDropdown();
  renderCategories();
  initializeProductFilters();

  // Event listeners for slider navigation
  prevBtn?.addEventListener('click', goToPrev);
  nextBtn?.addEventListener('click', goToNext);
  addToCart?.addEventListener('click', addCurrentToCart);

  // Render discount products initially
  renderProducts(getDiscountProducts(), "Discount");
});