// type UserInfo = {
//     userName: string;
//     email: string;
//     password: number;
// };

// function loadUserInfo(): UserInfo | null {
//     let data = localStorage.getItem("currentUser");
//     if (!data) return null;
//     return JSON.parse(data) as UserInfo;
// }

// function renderUserInfo() {
//     let userInfo = loadUserInfo();

//     let nameEl = document.getElementById("name") as HTMLElement;
//     let emailEl = document.getElementById("email") as HTMLElement;

//     if (userInfo) {
//         nameEl.textContent = userInfo.userName;
//         emailEl.textContent = userInfo.email;
//     } else {
//         nameEl.textContent = "Guest User";
//         emailEl.textContent = "No email available";
//     }
// }

// // Render Account Info dynamically
// function renderAccountInfo() {
//     const user = loadUserInfo();
//     const nameEl = document.getElementById("name") as HTMLElement;
//     const emailEl = document.getElementById("email") as HTMLElement;
//     const phoneEl = document.getElementById("phone") as HTMLElement;
//     const addressEl = document.getElementById("address") as HTMLElement;

//     if (user) {
//         nameEl.textContent = user.userName;
//         emailEl.textContent = user.email;
//         phoneEl.textContent = user.phone || "+92 300 1234567";
//         addressEl.textContent = user.address || "Karachi, Pakistan";
//     } else {
//         nameEl.textContent = "Guest User";
//         emailEl.textContent = "No email available";
//         phoneEl.textContent = "-";
//         addressEl.textContent = "-";
//     }
// }

// document.addEventListener("DOMContentLoaded", () => {
//     renderUserInfo();
//     renderAccountInfo();
// });


// ====== Types ======
type UserInfo = {
  userName: string;
  email: string;
  phone?: string;
  address?: string;
};

// ====== Load User from localStorage ======
function loadUser(): UserInfo | null {
  const data = localStorage.getItem("currentUser");
  if (!data) return null;
  return JSON.parse(data) as UserInfo;
}

// ====== Render User Info on Page ======
function renderUserInfo(): void {
  const user = loadUser();

  // Profile Header
  const nameEl = document.getElementById("name") as HTMLElement;
  const emailEl = document.getElementById("email") as HTMLElement;

  // Account Info Section
  const accountNameEl = document.getElementById("accountName") as HTMLElement;
  const accountEmailEl = document.getElementById("accountEmail") as HTMLElement;
  const accountPhoneEl = document.getElementById("accountPhone") as HTMLElement;
  const accountAddressEl = document.getElementById("accountAddress") as HTMLElement;

  if (user) {
    nameEl.textContent = user.userName;
    emailEl.textContent = user.email;

    accountNameEl.textContent = user.userName;
    accountEmailEl.textContent = user.email;
    accountPhoneEl.textContent = user.phone || "+92 300 1234567";
    accountAddressEl.textContent = user.address || "Karachi, Pakistan";
  } else {
    nameEl.textContent = "Guest User";
    emailEl.textContent = "No email available";

    accountNameEl.textContent = "Guest User";
    accountEmailEl.textContent = "No email available";
    accountPhoneEl.textContent = "-";
    accountAddressEl.textContent = "-";
  }
}

// ====== Logout Function ======
function setupLogout(): void {
  const logoutBtn = document.getElementById("logoutBtn");
  logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    renderUserInfo();
    alert("Logged out successfully!");
  });
}

// ====== Initialize ======
document.addEventListener("DOMContentLoaded", () => {
  renderUserInfo();
  setupLogout();
});



// Cart item structure
type CartItem = {
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
  iscashOnDelivery: boolean;
  isReturnable: boolean
};

// Get cart items from localStorage
function getCartItems(): CartItem[] {
  const items = localStorage.getItem("cartItems");
  return items ? JSON.parse(items) : [];
}

function renderCartPreview(): void {
  const container = document.getElementById("cartPreviewContainer");
  if (!container) return;

  const cartItems: CartItem[] = getCartItems();
  const previewItems = cartItems.slice(0, 3);

  container.innerHTML = `
    <div class="bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-6 hover:shadow-lg transition-all">
      <h3 class="text-lg font-semibold mb-4 text-gray-900">Your Cart</h3>
      <div class="space-y-3">
        ${previewItems
          .map(
            (item) => `
          <div class="flex justify-between items-center border-b pb-3">
            <div class="flex items-center gap-3">
              <img src="${item.imageUrl}" alt="${item.name}" class="w-12 h-12 rounded-lg">
              <div>
                <p class="font-medium">${item.name}</p>
                <span class="text-sm text-gray-500"> ${item.description}</span>
              </div>
            </div>
            <span class="text-gray-900 font-semibold">$${(item.price).toFixed(2)}</span>
          </div>
        `
          )
          .join("")}
      </div>
      ${cartItems.length > 3 ? `<button id="cartMoreBtn" class="mt-4 w-full px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition">More</button>` : ""}
    </div>
  `;

  const moreBtn = document.getElementById("cartMoreBtn");
  moreBtn?.addEventListener("click", () => {
    window.location.href = "cart.html";
  });
}


// Call renderCartPreview on page load
document.addEventListener("DOMContentLoaded", () => {
  renderCartPreview();
});
