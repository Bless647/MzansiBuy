// ===============================
// PRODUCTS (TEMP DATA — SAFE)
// ===============================
const products = [
  {
    id: 1,
    name: "Bluetooth Speaker",
    price: 499,
    image: "https://images.unsplash.com/photo-1585386959984-a4155228fdb1",
    description: "Portable high-quality sound speaker"
  },
  {
    id: 2,
    name: "Wireless Headphones",
    price: 899,
    image: "https://images.unsplash.com/photo-1518443881415-1f08dbd7b7ae",
    description: "Noise cancelling headphones"
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 1299,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    description: "Track fitness and notifications"
  }
];

// ===============================
// ELEMENTS
// ===============================
const grid = document.getElementById("products");
const modal = document.getElementById("orderModal");
const closeBtn = document.getElementById("closeOrderModal");

const modalName = document.getElementById("modalProductName");
const modalPrice = document.getElementById("modalProductPrice");
const modalDesc = document.getElementById("modalProductDesc");

const placeOrderBtn = document.getElementById("placeOrder");

// ===============================
// RENDER PRODUCTS
// ===============================
function renderProducts() {
  grid.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="card-body">
        <h3>${product.name}</h3>
        <p>R ${Number(product.price)}</p>
      </div>
    `;

    card.addEventListener("click", () => openModal(product));
    grid.appendChild(card);
  });
}

// ===============================
// MODAL
// ===============================
function openModal(product) {
  modalName.textContent = product.name;
  modalPrice.textContent = `Price: R ${Number(product.price)}`;
  modalDesc.textContent = product.description;
  modal.classList.remove("hidden");
}

closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Close modal when clicking background
modal.addEventListener("click", e => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});

// ===============================
// PLACE ORDER (TEMP)
// ===============================
placeOrderBtn.addEventListener("click", () => {
  alert("Order captured. Next step: account & admin orders.");
  modal.classList.add("hidden");
});

// ===============================
// INIT
// ===============================
renderProducts();