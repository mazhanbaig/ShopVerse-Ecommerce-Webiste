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
            price: 11990,
            image: "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-hero-geo-240909_inline.jpg.large.jpg",
            description: "Apple iPhone 16 Pro Max with A17 Pro chip and titanium frame.",
        },
        {
            id: 2,
            name: "Samsung Galaxy S24 Ultra",
            price: 13990,
            image: "https://images.samsung.com/is/image/samsung/p6pim/pk/feature/165525818/pk-feature-galaxy-s24-ultra-543035573?$FB_TYPE_A_MO_JPG$",
            description: "Samsung Galaxy S24 Ultra with 200MP camera and Snapdragon 8 Gen 3.",
        },
        {
            id: 3,
            name: "Sony WH-1000XM5 Headphones",
            price: 3989,
            image: "https://static.webx.pk/files/19643/Images/sony-wh-1000xm5-silver-headphones-price-in-pakistan-19643-2088078-220524100332877.jpg",
            description: "Noise-canceling wireless over-ear headphones.",
        },
        {
            id: 4,
            name: "MacBook Air M3",
            price: 129669,
            image: "https://static.webx.pk/files/4012/Images/11-4012-2280650-181224095605041.jpeg",
            description: "Apple MacBook Air with M3 chip, 13-inch Liquid Retina display.",
        },
        {
            id: 5,
            name: "Dual Time Sports Watch",
            price: 4969,
            image: "https://voguealaska.pk/cdn/shop/files/Silver2_960a4e45-d5d4-47e1-acbc-1fbc6053c71f.jpg?v=1742643151&width=1024",
            description: "Best For Dialy Use.Makes You Feel Better.",
        },
        {
            id: 6,
            name: "Dell XPS 13 Laptop",
            price: 99549,
            image: "https://www.notebookcheck.net/fileadmin/Notebooks/Dell/XPS_13_9340_Core_Ultra_7/IMG_4090.JPG",
            description: "Dell XPS 13 with 11th Gen Intel i7 processor and InfinityEdge display.",
        },
        {
            id: 7,
            name: "Apple Watch Series 9",
            price: 3994,
            image: "https://modernwears.pk/wp-content/uploads/2023/10/Untitled-design-2024-11-11T143955.085.jpg",
            description: "Apple Watch Series 9 with new S9 chip and enhanced health sensors.",
        },
        {
            id: 8,
            name: "Google Pixel 8 Pro",
            price: 32899,
            image: "https://estorepakistan.com/cdn/shop/files/WhatsAppImage2025-03-07at5.52.01PM_1024x1024.webp?v=1741549859",
            description: "Google Pixel 8 Pro with Tensor G3 chip and advanced camera system.",
        },
        {
            id: 9,
            name: "Bose QuietComfort Earbuds",
            price: 23279,
            image: "https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/25636997/DSC_0080.jpg?quality=90&strip=all&crop=16.666666666667,0,66.666666666667,100",
            description: "True wireless noise-cancelling earbuds with deep bass.",
        },
        {
            id: 10,
            name: "Nintendo Switch OLED",
            price: 34329,
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
    let addToCart = document.querySelector("#btnsConatainer addtocart");
    let moreOptions = document.getElementById("#btnsConatainer more");
    if (!productImage || !productName || !productDesc || !productPrice || !prevBtn || !nextBtn || !addToCart) {
        console.error("Some DOM elements are missing. Cannot initialize product slider.");
        return;
    }
    let currentIndex = 0;
    addToCart.addEventListener('click', () => {
        let product = products[currentIndex];
        let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
        let isexist = cartItems.some(cartItem => cartItem.id === product?.id);
        if (!isexist) {
            cartItems.push(product);
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            alert(`${product.name} added to cart!`);
        }
        else {
            alert(`${product.name} is already in your cart.`);
        }
        const cartCount = document.querySelector("#cart span");
        if (cartCount) {
            cartCount.textContent = cartItems.length.toString();
        }
    });
    moreOptions?.addEventListener('click', () => {
    });
    function showProduct() {
        // Get current product
        const product = products[currentIndex];
        // Update display
        productName.textContent = product.name;
        productImage.src = product.image;
        productDesc.textContent = product.description;
        productPrice.textContent = `Rs ${product.price.toFixed(2)}`;
    }
    function goToNext() {
        currentIndex++;
        if (currentIndex >= products.length) {
            currentIndex = 0; // Wrap to first product
        }
        showProduct();
    }
    function goToPrev() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = products.length - 1; // Wrap to last product
        }
        showProduct();
    }
    // Button clicks
    nextBtn.addEventListener("click", () => {
        goToNext();
        resetAutoSlide();
    });
    prevBtn.addEventListener("click", () => {
        goToPrev();
        resetAutoSlide();
    });
    // Auto-slide
    let slideInterval = setInterval(goToNext, 3000);
    function resetAutoSlide() {
        clearInterval(slideInterval);
        slideInterval = setInterval(goToNext, 3000);
    }
    // Start with first product
    showProduct();
});
const categories = [
    { id: 1, name: "Electronics", image: "https://t3.ftcdn.net/jpg/02/57/16/84/360_F_257168460_AwhicdEIavp7bdCbHXyTaBTHnBoBcZad.jpg" },
    { id: 2, name: "Clothing", image: "https://as1.ftcdn.net/v2/jpg/03/34/79/68/1000_F_334796865_VVTjg49nbLgQPG6rgKDjVqSb5XUhBVsW.jpg" },
    { id: 3, name: "Books", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Books.by.women.photographers.jpeg/1200px-Books.by.women.photographers.jpeg" },
    { id: 4, name: "Gaming", image: "https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?cs=srgb&dl=pexels-pixabay-275033.jpg&fm=jpg" },
    { id: 6, name: "Furniture", image: "https://arysahulatbazar.pk/wp-content/uploads/2024/01/Amb-4.jpg" },
    { id: 7, name: "Toys", image: "https://thumbs.dreamstime.com/b/heap-toys-eps-vector-illustration-48098461.jpg" },
    { id: 8, name: "Sports", image: "https://kinnaird.edu.pk/wp-content/uploads/2024/07/1.png" },
    { id: 9, name: "Beauty", image: "https://halanoor.pk/wp-content/uploads/2024/04/Rotating-Makeup-Organizer-500x500.jpg" },
    { id: 10, name: "Automotive", image: "https://media.istockphoto.com/id/478107962/photo/auto-parts.jpg?s=612x612&w=0&k=20&c=C31mE-cVYFlLqJp9smDKUczPoBEtoYl5gaGxdvH0lmM=" },
    { id: 11, name: "Women", image: "https://c8.alamy.com/comp/HW6MJM/variety-of-woman-accessories-fashion-objects-modern-lifetyle-HW6MJM.jpg" },
    { id: 12, name: "Men", image: "https://nextluxury.com/wp-content/uploads/Top-15-Fashion-Accessories-For-Men-1.jpg" },
    { id: 13, name: "Perfume", image: "https://www.logoofficial.com/cdn/shop/collections/PF_f29896ec-064b-40a6-b2f6-6a41d9a21fa1.jpg?v=1737319636" },
    { id: 14, name: "Kitchen", image: "https://ahmadsfinekitchen.com/wp-content/uploads/2014/09/1.jpg" },
    { id: 15, name: "Health", image: "https://www.nwths.com/sites/nwths.com/files/protein-sources-800x600.png" },
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
    flex items-center justify-center 
    bg-white rounded-2xl shadow-md hover:shadow-lg transition 
    cursor-pointer py-2 pl-2 transform hover:scale-105 hover:shadow-pink-200
    min-w-[200px] h-22 sm:h-23 md:h-25 relative overflow-hidden
    bg-cover bg-center
  `;
        // Set the background image using inline style
        card.style.backgroundImage = `url('${cat.image}')`;
        // Add the text
        const text = document.createElement("h3");
        text.className = `
    text-xl font-bold text-white z-10 px-4 text-center
  `;
        text.textContent = cat.name;
        // Build the structure
        card.appendChild(text);
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
// Add to chart and Favourite button functionality
let cartbtn = document.getElementById("cart");
let favouritebtn = document.getElementById("favourite");
cartbtn.addEventListener("click", () => {
    window.location.href = "cart.html";
});
favouritebtn.addEventListener("click", () => {
    window.location.href = "favourite.html";
});
export {};
