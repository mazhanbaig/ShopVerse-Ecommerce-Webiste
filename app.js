window.addEventListener("DOMContentLoaded", () => {
    // ===== Navbar toggle (optional) =====
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenuDropdown = document.getElementById("mobileMenuDropdown");
    menuBtn?.addEventListener("click", () => {
        mobileMenuDropdown?.classList.toggle("hidden");
    });
    const products = [
        {
            id: 1,
            name: "Apple iPhone 16 Pro Max",
            price: 1199,
            image: "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-hero-geo-240909_inline.jpg.large.jpg",
            description: "Apple iPhone 16 Pro Max with A17 Pro chip and titanium frame.",
        },
        {
            id: 2,
            name: "Samsung Galaxy S24 Ultra",
            price: 1399,
            image: "https://images.samsung.com/is/image/samsung/p6pim/pk/feature/165525818/pk-feature-galaxy-s24-ultra-543035573?$FB_TYPE_A_MO_JPG$",
            description: "Samsung Galaxy S24 Ultra with 200MP camera and Snapdragon 8 Gen 3.",
        },
        {
            id: 3,
            name: "Sony WH-1000XM5 Headphones",
            price: 399,
            image: "https://static.webx.pk/files/19643/Images/sony-wh-1000xm5-silver-headphones-price-in-pakistan-19643-2088078-220524100332877.jpg",
            description: "Noise-canceling wireless over-ear headphones.",
        },
        {
            id: 4,
            name: "MacBook Air M3",
            price: 1299,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcV-O4L41bDnWCnCla_F5LKNTZszogLcWgHA&s",
            description: "Apple MacBook Air with M3 chip, 13-inch Liquid Retina display.",
        },
        {
            id: 5,
            name: "Dual Time Sports Watch",
            price: 499,
            image: "https://voguealaska.pk/cdn/shop/files/Silver2_960a4e45-d5d4-47e1-acbc-1fbc6053c71f.jpg?v=1742643151&width=1024",
            description: "Best For Dialy Use.Makes You Feel Better.",
        },
        {
            id: 6,
            name: "Dell XPS 13 Laptop",
            price: 999,
            image: "https://www.notebookcheck.net/fileadmin/Notebooks/Dell/XPS_13_9340_Core_Ultra_7/IMG_4090.JPG",
            description: "Dell XPS 13 with 11th Gen Intel i7 processor and InfinityEdge display.",
        },
        {
            id: 7,
            name: "Apple Watch Series 9",
            price: 399,
            image: "https://modernwears.pk/wp-content/uploads/2023/10/Untitled-design-2024-11-11T143955.085.jpg",
            description: "Apple Watch Series 9 with new S9 chip and enhanced health sensors.",
        },
        {
            id: 8,
            name: "Google Pixel 8 Pro",
            price: 899,
            image: "https://estorepakistan.com/cdn/shop/files/WhatsAppImage2025-03-07at5.52.01PM_1024x1024.webp?v=1741549859",
            description: "Google Pixel 8 Pro with Tensor G3 chip and advanced camera system.",
        },
        {
            id: 9,
            name: "Bose QuietComfort Earbuds",
            price: 279,
            image: "https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/25636997/DSC_0080.jpg?quality=90&strip=all&crop=16.666666666667,0,66.666666666667,100",
            description: "True wireless noise-cancelling earbuds with deep bass.",
        },
        {
            id: 10,
            name: "Nintendo Switch OLED",
            price: 349,
            image: "https://images.immediate.co.uk/production/volatile/sites/3/2021/10/Nintendo-Switch-OLED-review-ff1b02c.jpg?quality=90&resize=620,414",
            description: "Nintendo Switch OLED model with vibrant 7-inch display and enhanced audio.",
        },
    ];
    // Get DOM elements by ID with null checks
    const productImage = document.getElementById("product-image");
    const productName = document.getElementById("product-name");
    const productDesc = document.getElementById("product-desc");
    const productPrice = document.getElementById("product-price");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    if (!productImage || !productName || !productDesc || !productPrice || !prevBtn || !nextBtn) {
        console.error("Some DOM elements are missing. Cannot initialize product slider.");
        return;
    }
    // Current product index
    let currentIndex = 0;
    // Function to show product details based on index
    function showProduct(index) {
        // Handle wrap around (looping)
        if (index < 0) {
            currentIndex = products.length - 1; // go to last product
        }
        else if (index >= products.length) {
            currentIndex = 0; // go to first product
        }
        else {
            currentIndex = index;
        }
        // Get current product
        const product = products[currentIndex];
        // Update DOM elements with product data
        productImage.src = product.image;
        productImage.alt = product.name;
        productName.textContent = product.name;
        productDesc.textContent = product.description;
        productPrice.textContent = "$" + product.price.toFixed(2);
    }
    // Event listeners for buttons
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
    // Reset auto slide interval when user clicks buttons
    function resetAutoSlide() {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            showProduct(currentIndex + 1);
        }, 3000);
    }
    // Show first product when page loads
    showProduct(currentIndex);
});
const categories = [
    { id: 1, name: "Electronics", image: "https://t3.ftcdn.net/jpg/02/57/16/84/360_F_257168460_AwhicdEIavp7bdCbHXyTaBTHnBoBcZad.jpg" },
    { id: 2, name: "Clothing", image: "https://as1.ftcdn.net/v2/jpg/03/34/79/68/1000_F_334796865_VVTjg49nbLgQPG6rgKDjVqSb5XUhBVsW.jpg" },
    { id: 3, name: "Books", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Books.by.women.photographers.jpeg/1200px-Books.by.women.photographers.jpeg" },
    { id: 4, name: "Gaming", image: "https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?cs=srgb&dl=pexels-pixabay-275033.jpg&fm=jpg" },
    { id: 5, name: "Accessories", image: "https://media.istockphoto.com/id/478107962/photo/auto-parts.jpg?s=612x612&w=0&k=20&c=C31mE-cVYFlLqJp9smDKUczPoBEtoYl5gaGxdvH0lmM=" },
    { id: 6, name: "Furniture", image: "https://arysahulatbazar.pk/wp-content/uploads/2024/01/Amb-4.jpg" },
    { id: 7, name: "Toys", image: "https://thumbs.dreamstime.com/b/heap-toys-eps-vector-illustration-48098461.jpg" },
    { id: 8, name: "Sports", image: "https://kinnaird.edu.pk/wp-content/uploads/2024/07/1.png" },
    { id: 9, name: "Beauty", image: "https://halanoor.pk/wp-content/uploads/2024/04/Rotating-Makeup-Organizer-500x500.jpg" },
    { id: 10, name: "Automotive", image: "https://media.istockphoto.com/id/478107962/photo/auto-parts.jpg?s=612x612&w=0&k=20&c=C31mE-cVYFlLqJp9smDKUczPoBEtoYl5gaGxdvH0lmM=" },
    { id: 11, name: "Women", image: "https://c8.alamy.com/comp/HW6MJM/variety-of-woman-accessories-fashion-objects-modern-lifetyle-HW6MJM.jpg" },
    { id: 12, name: "Perfume", image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=80&q=80" },
    { id: 13, name: "All Things", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=80&q=80" },
    { id: 14, name: "Kitchen", image: "https://ahmadsfinekitchen.com/wp-content/uploads/2014/09/1.jpg" },
    { id: 15, name: "Health", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=80&q=80" },
    { id: 16, name: "Jewelry", image: "https://www.lalueur.pk/cdn/shop/files/Secondary24.jpg?v=1749582909" }
];
const categoryContainer = document.getElementById("categoryContainer");
const prevPageBtn = document.getElementById("prevPage");
const nextPageBtn = document.getElementById("nextPage");
const itemsPerPage = 8; // 4 cards per row * 2 rows
let currentPage = 1;
const totalPages = Math.ceil(categories.length / itemsPerPage);
function renderCategories() {
    categoryContainer.innerHTML = "";
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = categories.slice(start, end);
    pageItems.forEach(cat => {
        const card = document.createElement("div");
        card.className = `
      flex items-center bg-white rounded-2xl shadow-md hover:shadow-lg transition 
      cursor-pointer py-2 pl-2 space-x-5 transform hover:scale-105 hover:shadow-pink-500
      min-w-[200px]  /* width for mobile scrolling */
      `;
        card.innerHTML = `
        <img src="${cat.image}" alt="${cat.name}" class="w-20 h-20 rounded-xl object-cover flex-shrink-0 shadow-sm" />
        <h3 class="text-xl font-semibold text-gray-900">${cat.name}</h3>
      `;
        card.onclick = () => alert('You selected: ' + cat.name);
        categoryContainer.appendChild(card);
    });
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
}
prevPageBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderCategories();
    }
});
nextPageBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
        currentPage++;
        renderCategories();
    }
});
renderCategories();
// new sections 
// Example product data
const deals = [
    { name: "Wireless Earbuds", price: "$25", img: "https://via.placeholder.com/150" },
    { name: "Smart Watch", price: "$40", img: "https://via.placeholder.com/150" },
    { name: "Bluetooth Speaker", price: "$15", img: "https://via.placeholder.com/150" }
];
const bestSellers = [
    { name: "Gaming Mouse", price: "$20", img: "https://via.placeholder.com/150" },
    { name: "Mechanical Keyboard", price: "$35", img: "https://via.placeholder.com/150" }
];
const trending = [
    { name: "4K TV", price: "$499", img: "https://via.placeholder.com/150" },
    { name: "VR Headset", price: "$299", img: "https://via.placeholder.com/150" }
];
// Function to create product cards
function createProductCard(product) {
    return `
    <div class="bg-white shadow rounded-lg p-3 w-40 flex-shrink-0">
      <img src="${product.img}" alt="${product.name}" class="w-full h-28 object-cover rounded">
      <h3 class="text-sm font-bold mt-2">${product.name}</h3>
      <p class="text-red-500 font-semibold">${product.price}</p>
      <button class="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm">Buy Now</button>
    </div>
  `;
}
// Render sections dynamically
document.getElementById("dealsContainer").innerHTML = deals.map(createProductCard).join("");
document.getElementById("bestSellersContainer").innerHTML = bestSellers.map(createProductCard).join("");
document.getElementById("trendingContainer").innerHTML = trending.map(createProductCard).join("");
export {};
