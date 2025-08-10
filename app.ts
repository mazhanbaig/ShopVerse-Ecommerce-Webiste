window.addEventListener("DOMContentLoaded", () => {
  // ===== Navbar toggle (optional) =====
const menuBtn = document.getElementById("menuBtn") as HTMLButtonElement | null;
  const mobileMenuDropdown = document.getElementById("mobileMenuDropdown") as HTMLDivElement | null;

menuBtn?.addEventListener("click", () => {
  mobileMenuDropdown?.classList.toggle("hidden");
});


  type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
  };

  const products: Product[] = [
    {
      id: 1,
      name: "Apple iPhone 16 Pro Max",
      price: 1199,
      image:
        "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-hero-geo-240909_inline.jpg.large.jpg",
      description: "Apple iPhone 16 Pro Max with A17 Pro chip and titanium frame.",
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra",
      price: 1399,
      image:
        "https://images.samsung.com/is/image/samsung/p6pim/pk/feature/165525818/pk-feature-galaxy-s24-ultra-543035573?$FB_TYPE_A_MO_JPG$",
      description:
        "Samsung Galaxy S24 Ultra with 200MP camera and Snapdragon 8 Gen 3.",
    },
    {
      id: 3,
      name: "Sony WH-1000XM5 Headphones",
      price: 399,
      image:
        "https://static.webx.pk/files/19643/Images/sony-wh-1000xm5-silver-headphones-price-in-pakistan-19643-2088078-220524100332877.jpg",
      description: "Noise-canceling wireless over-ear headphones.",
    },
    {
      id: 4,
      name: "MacBook Air M3",
      price: 1299,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcV-O4L41bDnWCnCla_F5LKNTZszogLcWgHA&s",
      description: "Apple MacBook Air with M3 chip, 13-inch Liquid Retina display.",
    },
    {
      id: 5,
      name: "Dual Time Sports Watch",
      price: 499,
      image:
        "https://voguealaska.pk/cdn/shop/files/Silver2_960a4e45-d5d4-47e1-acbc-1fbc6053c71f.jpg?v=1742643151&width=1024",
      description: "Best For Dialy Use.Makes You Feel Better.",
    },
    {
      id: 6,
      name: "Dell XPS 13 Laptop",
      price: 999,
      image:
        "https://www.notebookcheck.net/fileadmin/Notebooks/Dell/XPS_13_9340_Core_Ultra_7/IMG_4090.JPG",
      description: "Dell XPS 13 with 11th Gen Intel i7 processor and InfinityEdge display.",
    },
    {
      id: 7,
      name: "Apple Watch Series 9",
      price: 399,
      image:
        "https://modernwears.pk/wp-content/uploads/2023/10/Untitled-design-2024-11-11T143955.085.jpg",
      description: "Apple Watch Series 9 with new S9 chip and enhanced health sensors.",
    },
    {
      id: 8,
      name: "Google Pixel 8 Pro",
      price: 899,
      image:
        "https://estorepakistan.com/cdn/shop/files/WhatsAppImage2025-03-07at5.52.01PM_1024x1024.webp?v=1741549859",
      description: "Google Pixel 8 Pro with Tensor G3 chip and advanced camera system.",
    },
    {
      id: 9,
      name: "Bose QuietComfort Earbuds",
      price: 279,
      image:
        "https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/25636997/DSC_0080.jpg?quality=90&strip=all&crop=16.666666666667,0,66.666666666667,100",
      description: "True wireless noise-cancelling earbuds with deep bass.",
    },
    {
      id: 10,
      name: "Nintendo Switch OLED",
      price: 349,
      image:
        "https://images.immediate.co.uk/production/volatile/sites/3/2021/10/Nintendo-Switch-OLED-review-ff1b02c.jpg?quality=90&resize=620,414",
      description: "Nintendo Switch OLED model with vibrant 7-inch display and enhanced audio.",
    },
  ];

  // Get DOM elements by ID with null checks
  const productImage = document.getElementById("product-image") as HTMLImageElement | null;
  const productName = document.getElementById("product-name") as HTMLElement | null;
  const productDesc = document.getElementById("product-desc") as HTMLElement | null;
  const productPrice = document.getElementById("product-price") as HTMLElement | null;

  const prevBtn = document.getElementById("prevBtn") as HTMLButtonElement | null;
  const nextBtn = document.getElementById("nextBtn") as HTMLButtonElement | null;

  if (!productImage || !productName || !productDesc || !productPrice || !prevBtn || !nextBtn) {
    console.error("Some DOM elements are missing. Cannot initialize product slider.");
    return;
  }

  // Current product index
  let currentIndex = 0;

  // Function to show product details based on index
  function showProduct(index: number) {
    // Handle wrap around (looping)
    if (index < 0) {
      currentIndex = products.length - 1; // go to last product
    } else if (index >= products.length) {
      currentIndex = 0; // go to first product
    } else {
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
