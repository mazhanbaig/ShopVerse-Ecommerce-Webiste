// document.addEventListener("DOMContentLoaded", () => {
//   // ===== 1. TYPE DEFINITIONS =====
//   type Product = {
//   id: number;
//   name: string;
//   price: number;
//   discount?: number;
//   stock?: number;
//   rating?: number;
//   sku?: string;
//   imageUrl: string;
//   description: string;
//   category?: string;
// };
//   interface Category {
//     id: number;
//     name: string;
//     image: string;
//   }
//   // ===== 2. NAVBAR FUNCTIONALITY =====
//   const mobileMenuButton = document.getElementById('mobileMenuButton');
//   const mobileMenu = document.getElementById('mobileMenu');
//   const cart = document.getElementById("cart");
//   const cartMobile = document.getElementById("cartMobile");
//   mobileMenuButton?.addEventListener('click', () => {
//     mobileMenuButton.classList.toggle('hamburger-active');
//     mobileMenu?.classList.toggle('hidden');
//   });
//   function updateCartCounts() {
//     const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
//     if (cart && cartMobile) {
//       cart.textContent = cartItems.length.toString();
//       cartMobile.textContent = cartItems.length.toString();
//     }
//   }
//   // ===== 3. SLIDER PRODUCTS DATA =====
//   const sliderProducts: Product[] = [
//     { id: 1, name: "Apple iPhone 16 Pro Max", price: 11990, imageUrl: "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-hero-geo-240909_inline.jpg.large.jpg", description: "Apple iPhone 16 Pro Max with A17 Pro chip and titanium frame." },
//     { id: 2, name: "Samsung Galaxy S24 Ultra", price: 13990, imageUrl: "https://images.samsung.com/is/image/samsung/p6pim/pk/feature/165525818/pk-feature-galaxy-s24-ultra-543035573?$FB_TYPE_A_MO_JPG$", description: "Samsung Galaxy S24 Ultra with 200MP camera and Snapdragon 8 Gen 3." },
//     { id: 3, name: "Sony WH-1000XM5 Headphones", price: 3989, imageUrl: "https://static.webx.pk/files/19643/Images/sony-wh-1000xm5-silver-headphones-price-in-pakistan-19643-2088078-220524100332877.jpg", description: "Noise-canceling wireless over-ear headphones." },
//     { id: 4, name: "MacBook Air M3", price: 129669, imageUrl: "https://static.webx.pk/files/4012/Images/11-4012-2280650-181224095605041.jpeg", description: "Apple MacBook Air with M3 chip, 13-inch Liquid Retina display." },
//     { id: 5, name: "Dual Time Sports Watch", price: 4969, imageUrl: "https://voguealaska.pk/cdn/shop/files/Silver2_960a4e45-d5d4-47e1-acbc-1fbc6053c71f.jpg?v=1742643151&width=1024", description: "Best For Daily Use. Makes You Feel Better." },
//     { id: 6, name: "Dell XPS 13 Laptop", price: 99549, imageUrl: "https://www.notebookcheck.net/fileadmin/Notebooks/Dell/XPS_13_9340_Core_Ultra_7/IMG_4090.JPG", description: "Dell XPS 13 with 11th Gen Intel i7 processor and InfinityEdge display." },
//     { id: 7, name: "Apple Watch Series 9", price: 3994, imageUrl: "https://modernwears.pk/wp-content/uploads/2023/10/Untitled-design-2024-11-11T143955.085.jpg", description: "Apple Watch Series 9 with new S9 chip and enhanced health sensors." },
//     { id: 8, name: "Google Pixel 8 Pro", price: 32899, imageUrl: "https://estorepakistan.com/cdn/shop/files/WhatsAppImage2025-03-07at5.52.01PM_1024x1024.webp?v=1741549859", description: "Google Pixel 8 Pro with Tensor G3 chip and advanced camera system." },
//     { id: 9, name: "Bose QuietComfort Earbuds", price: 23279, imageUrl: "https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/25636997/DSC_0080.jpg?quality=90&strip=all&crop=16.666666666667,0,66.666666666667,100", description: "True wireless noise-cancelling earbuds with deep bass." },
//     { id: 10, name: "Nintendo Switch OLED", price: 34329, imageUrl: "https://images.immediate.co.uk/production/volatile/sites/3/2021/10/Nintendo-Switch-OLED-review-ff1b02c.jpg?quality=90&resize=620,414", description: "Nintendo Switch OLED with vibrant 7-inch display and enhanced audio." },
//   ];
//   // ===== 4. SLIDER ELEMENTS =====
//   const productImage = document.getElementById("product-image") as HTMLImageElement | null;
//   const productName = document.getElementById("product-name");
//   const productDesc = document.getElementById("product-desc");
//   const productPrice = document.getElementById("product-price");
//   const prevBtn = document.getElementById("prevBtn");
//   const nextBtn = document.getElementById("nextBtn");
//   const addToCart = document.getElementById("addtocart");
//   const moreBtn = document.getElementById('moreBtn');
//   const moreDropdown = document.getElementById('moreDropdown');
//   let currentIndex = 0;
//   let slideInterval: number;
//   function showProduct() {
//     if (!sliderProducts.length) return;
//     const product = sliderProducts[currentIndex];
//     if (productName) productName.textContent = product.name;
//     if (productImage) productImage.src = product.image;
//     if (productDesc) productDesc.textContent = product.description;
//     if (productPrice) productPrice.textContent = `Rs ${product.price.toFixed(2)}`;
//   }
//   function goToNext() {
//     currentIndex = (currentIndex + 1) % sliderProducts.length;
//     showProduct();
//   }
//   function goToPrev() {
//     currentIndex = (currentIndex - 1 + sliderProducts.length) % sliderProducts.length;
//     showProduct();
//   }
//   function startAutoSlide() {
//     if (!sliderProducts.length) return;
//     slideInterval = setInterval(goToNext, 3000);
//   }
//   function resetAutoSlide() {
//     clearInterval(slideInterval);
//     startAutoSlide();
//   }
//   function addCurrentToCart() {
//     const product = sliderProducts[currentIndex];
//     let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
//     if (!cartItems.some((item: Product) => item.id === product.id)) {
//       cartItems.push(product);
//       localStorage.setItem("cartItems", JSON.stringify(cartItems));
//       alert(`${product.name} added to cart!`);
//     } else {
//       alert(`${product.name} is already in your cart.`);
//     }
//     updateCartCounts();
//   }
//   function setupMoreDropdown() {
//     if (!moreBtn || !moreDropdown) return;
//     moreBtn.addEventListener('click', (e) => {
//       e.stopPropagation();
//       moreDropdown.classList.toggle('hidden');
//     });
//     document.addEventListener('click', () => {
//       moreDropdown.classList.add('hidden');
//     });
//     moreDropdown.addEventListener('click', (e) => e.stopPropagation());
//     const options = moreDropdown.querySelectorAll('.dropdown-option');
//     options.forEach(option => {
//       option.addEventListener('click', (e) => {
//         e.preventDefault();
//         const product = sliderProducts[currentIndex];
//         const icon = option.querySelector('i');
//         if (!icon) return;
//         if (icon.classList.contains('fa-shopping-cart')) {
//           alert(`Buy Now: ${product.name} for Rs ${product.price.toFixed(2)}`);
//         }
//         else if (icon.classList.contains('fa-heart')) {
//           let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
//           if (!favorites.some((fav: Product) => fav.id === product.id)) {
//             favorites.push(product);
//             localStorage.setItem('favorites', JSON.stringify(favorites));
//             alert(`${product.name} added to favorites!`);
//           } else {
//             alert(`${product.name} is already in favorites!`);
//           }
//         }
//         else if (icon.classList.contains('fa-share-alt')) {
//           if (navigator.share) {
//             navigator.share({ title: product.name, text: `Check out ${product.name} on our store!`, url: window.location.href })
//               .catch(err => console.log('Error sharing:', err));
//           } else {
//             alert(`Share this product: ${product.name}\n${window.location.href}`);
//           }
//         }
//         else if (icon.classList.contains('fa-info-circle')) {
//           alert(`Product Details:\n\nName: ${product.name}\n\nDescription: ${product.description}\n\nPrice: Rs ${product.price.toFixed(2)}`);
//         }
//         moreDropdown.classList.add('hidden');
//       });
//     });
//   }
//   // ===== 5. CATEGORIES =====
//   const categories: Category[] = [
//     { id: 1, name: "Electronics & Gadgets", image: "https://t3.ftcdn.net/jpg/02/57/16/84/360_F_257168460_AwhicdEIavp7bdCbHXyTaBTHnBoBcZad.jpg" },
//     { id: 2, name: "Fashion & Clothing", image: "https://as1.ftcdn.net/v2/jpg/03/34/79/68/1000_F_334796865_VVTjg49nbLgQPG6rgKDjVqSb5XUhBVsW.jpg" },
//     { id: 3, name: "Beauty & Personal Care", image: "https://halanoor.pk/wp-content/uploads/2024/04/Rotating-Makeup-Organizer-500x500.jpg" },
//     { id: 4, name: "Home & Living", image: "https://arysahulatbazar.pk/wp-content/uploads/2024/01/Amb-4.jpg" },
//     { id: 5, name: "Appliances", image: "https://ahmadsfinekitchen.com/wp-content/uploads/2014/09/1.jpg" },
//     { id: 6, name: "Sports & Outdoor", image: "https://kinnaird.edu.pk/wp-content/uploads/2024/07/1.png" },
//     { id: 7, name: "Toys, Kids & Baby Products", image: "https://thumbs.dreamstime.com/b/heap-toys-eps-vector-illustration-48098461.jpg" },
//     { id: 8, name: "Books & Stationery", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Books.by.women.photographers.jpeg/1200px-Books.by.women.photographers.jpeg" },
//     { id: 9, name: "Food & Beverages", image: "https://industrialoutlook.in/wp-content/uploads/2023/01/Food.webp" },
//     { id: 10, name: "Jewelry & Watches", image: "https://www.lalueur.pk/cdn/shop/files/Secondary24.jpg?v=1749582909" },
//     { id: 11, name: "Health & Wellness", image: "https://www.nwths.com/sites/nwths.com/files/protein-sources-800x600.png" },
//     { id: 12, name: "Automotive", image: "https://media.istockphoto.com/id/478107962/photo/auto-parts.jpg?s=612x612&w=0&k=20&c=C31mE-cVYFlLqJp9smDKUczPoBEtoYl5gaGxdvH0lmM=" },
//     { id: 13, name: "Pet Supplies", image: "https://petsone.pk/wp-content/uploads/2024/02/Pet-Snacks-Raw-Hide-Bones-for-Dogs-03.jpg" },
//     { id: 14, name: "Gifts & Occasions", image: "https://images.squarespace-cdn.com/content/v1/5a35a8d129f187ac01aa178a/1543453387890-QI9CL0KC7TQXRL2PUEDL/IMG_1708+%281%29.JPG" }
//   ];
//   const categoryContainer = document.getElementById("categoryContainer");
//   function renderCategories() {
//     if (!categoryContainer) return;
//     categoryContainer.innerHTML = "";
//     categories.forEach(cat => {
//       const card = document.createElement("div");
//       card.className = `flex items-center justify-center rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer min-w-[180px] h-24 relative overflow-hidden bg-cover bg-center transform hover:scale-105 hover:shadow-pink-200`;
//       card.style.backgroundImage = `url('${cat.image}')`;
//       const overlay = document.createElement("div");
//       overlay.className = "absolute inset-0 bg-black/50";
//       const text = document.createElement("h3");
//       text.className = `text-lg font-bold text-white z-10 px-2 text-center relative`;
//       text.textContent = cat.name;
//       card.appendChild(overlay);
//       card.appendChild(text);
//       card.onclick = () => alert('You selected: ' + cat.name);
//       categoryContainer.appendChild(card);
//     });
//   }
// //  // ===== FEATURED PRODUCTS =====
// // type Product = {
// //   id: number;
// //   name: string;
// //   price: number;
// //   discount?: number;
// //   stock?: number;
// //   rating?: number;
// //   sku?: string;
// //   imageUrl: string;
// //   description: string;
// //   category: string;
// // };
// // Get products from localStorage or use empty array
// let storedProducts: Product[] = [];
// try {
//   storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
// } catch (err) {
//   console.error("Error reading products from localStorage", err);
//   storedProducts = [];
// }
// // Get container
// const bigSavingContainer = document.getElementById("bigSavingProducts");
// // Function to render products with >7% discount
// function renderBigSavingProducts() {
//   if (!bigSavingContainer) return;
//   // Filter products with discount greater than 7%
//   const discountedProducts = storedProducts.filter(
//     p => (p.discount ?? 0) > 7
//   );
//   // Clear previous content
//   bigSavingContainer.innerHTML = "";
//   // If no products found
//   if (discountedProducts.length === 0) {
//     bigSavingContainer.innerHTML = `<p class="text-gray-500 text-center col-span-full">No big saving products found</p>`;
//     return;
//   }
//   // Create product cards
//   discountedProducts.forEach(prod => {
//     const card = document.createElement("div");
//     card.className =
//       "bg-white rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1";
//     const img = document.createElement("img");
//     img.src = prod.imageUrl;
//     img.alt = prod.name;
//     img.className = "w-full h-48 object-cover rounded-t-lg";
//     const body = document.createElement("div");
//     body.className = "p-4";
//     const name = document.createElement("h3");
//     name.className = "text-lg font-semibold text-gray-800 truncate";
//     name.textContent = prod.name;
//     const price = document.createElement("p");
//     price.className = "text-pink-600 font-bold mt-2";
//     const finalPrice = prod.discount
//       ? (prod.price - (prod.price * prod.discount) / 100).toFixed(2)
//       : prod.price.toFixed(2);
//     price.textContent = `$${finalPrice}`;
//     if (prod.discount) {
//       const oldPrice = document.createElement("span");
//       oldPrice.className = "text-gray-400 line-through ml-2 text-sm";
//       oldPrice.textContent = `$${prod.price.toFixed(2)}`;
//       price.appendChild(oldPrice);
//     }
//     const btn = document.createElement("button");
//     btn.className =
//       "mt-4 w-full bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg transition";
//     btn.textContent = "Add to Cart";
//     btn.addEventListener("click", () => {
//       alert(`Added ${prod.name} to cart`);
//     });
//     // Build the card
//     body.appendChild(name);
//     body.appendChild(price);
//     body.appendChild(btn);
//     card.appendChild(img);
//     card.appendChild(body);
//     // Add to container (fixed to bigSavingContainer)
//     bigSavingContainer.appendChild(card);
//   });
// }
// // View all products button
// document.getElementById("viewAllProducts")?.addEventListener("click", () => {
//   window.location.href = "/products.html";
// });
// // Initial load
// renderBigSavingProducts();
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
                else if (icon.classList.contains('fa-heart')) {
                    const favorites = getFavorites();
                    if (!favorites.some((fav) => fav.id === product.id)) {
                        favorites.push(product);
                        saveFavorites(favorites);
                        alert(`${product.name} added to favorites!`);
                    }
                    else {
                        alert(`${product.name} is already in favorites!`);
                    }
                }
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
    function getFavorites() {
        try {
            return JSON.parse(localStorage.getItem("favorites") || "[]");
        }
        catch {
            return [];
        }
    }
    function saveFavorites(items) {
        localStorage.setItem("favorites", JSON.stringify(items));
    }
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
    // ===== 7. FEATURED PRODUCTS =====
    const bigSavingContainer = document.getElementById("bigSavingProducts");
    function renderBigSavingProducts() {
        if (!bigSavingContainer)
            return;
        const storedProducts = getStoredProducts();
        let discountedProducts = storedProducts.filter(product => (product.discount ?? 0) > 7);
        bigSavingContainer.innerHTML = "";
        if (discountedProducts.length === 0) {
            bigSavingContainer.innerHTML = `<p class="text-gray-500 text-center col-span-full">No big saving products found</p>`;
            return;
        }
        discountedProducts = discountedProducts.slice(0, 10);
        discountedProducts.forEach(product => {
            const discountedPrice = product.discount
                ? (product.price - (product.price * (product.discount / 100))).toFixed(2)
                : null;
            const rating = Math.min(5, Math.max(0, Math.floor(product.rating || 0)));
            const card = document.createElement("div");
            card.className =
                "bg-white rounded-lg shadow-md mb-4 transition-all duration-300 hover:shadow-lg group";
            card.innerHTML = `
      <!-- Image Section -->
      <div class="relative overflow-hidden">
        <img src="${product.imageUrl}" alt="${product.name}"
             class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105">
        
        <!-- Category & Discount Tags -->
        <span class="absolute top-2 left-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          ${product.category}
        </span>
        <span class="absolute top-2 right-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          ${product.discount}% OFF
        </span>

        <!-- Add to Cart Button (Hidden by default) -->
        <button 
          onclick='addProductToCart(${JSON.stringify(product)})'
          class="absolute bottom-2 left-3 right-3 bg-pink-200 text-black border-[1px] border-gray-200 rounded-xl py-2 flex items-center justify-center space-x-2 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
               viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.3 5.2a1 1 0 00.97 1.3h12.66a1 1 0 00.97-1.3L17 13M9 21h.01M15 21h.01"/>
          </svg>
          <span>Add to Cart</span>
        </button>
      </div>

      <!-- Content Section -->
      <div class="p-4">
        <!-- Name & Price -->
        <div class="flex justify-between items-start mb-2">
          <h3 class="text-lg font-bold text-gray-800 truncate">${product.name}</h3>
          <div class="text-right">
            ${discountedPrice
                ? `<div class="font-bold text-pink-500 line-through">$${product.price.toFixed(2)}</div>
                 <div class="text-md text-green-600 font-semibold">$${discountedPrice}</div>`
                : ""}
          </div>
        </div>

        <!-- Description -->
        <p class="text-gray-600 text-sm mb-3 line-clamp-2">${product.description}</p>

        <!-- SKU & Stock -->
        <div class="flex justify-between items-center text-sm text-gray-500 mb-3">
          ${product.sku ? `<span>SKU: ${product.sku}</span>` : ""}
          ${product.stock !== undefined ? `<span>Stock: ${product.stock}</span>` : ""}
        </div>

        <!-- Ratings -->
        <div class="flex items-center">
          <span class="text-yellow-400">${"★".repeat(rating)}</span>
          <span class="text-gray-300">${"★".repeat(5 - rating)}</span>
          ${product.rating
                ? `<span class="ml-1 text-xs text-gray-500">(${product.rating})</span>`
                : ""}
        </div>
      </div>
    `;
            bigSavingContainer?.appendChild(card);
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
        if (!cartItems.some(item => item.id === product.id)) {
            cartItems.push(product);
            saveCartItems(cartItems);
            alert(`${product.name} added to cart!`);
            updateCartCounts();
        }
        else {
            alert(`${product.name} is already in your cart.`);
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
    // Event listeners
    prevBtn?.addEventListener('click', goToPrev);
    nextBtn?.addEventListener('click', goToNext);
    addToCart?.addEventListener('click', addCurrentToCart);
});
export {};
