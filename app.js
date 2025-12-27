const productsContainer = document.getElementById("products");
const orderModal = document.getElementById("orderModal");
const closeModal = document.getElementById("closeOrderModal");
const modalProductName = document.getElementById("modalProductName");
const modalProductPrice = document.getElementById("modalProductPrice");
const modalProductDesc = document.getElementById("modalProductDesc");
const customerNameInput = document.getElementById("customerName");
const paymentMethodSelect = document.getElementById("paymentMethod");
const placeOrderBtn = document.getElementById("placeOrder");

// Example products – replace these with your real products
let products = [
  {
    id: 1,
    name: "Mzansi Shoes",
    price: 500,
    image: "https://via.placeholder.com/200x200?text=Shoes",
    desc: "Comfortable running shoes"
  },
  {
    id: 2,
    name: "Mzansi Jacket",
    price: 1200,
    image: "https://via.placeholder.com/200x200?text=Jacket",
    desc: "Warm winter jacket"
  },
  {
    id: 3,
    name: "Mzansi Watch",
    price: 800,
    image: "https://via.placeholder.com/200x200?text=Watch",
    desc: "Stylish wristwatch"
  }
];

// Render products on the index page
function renderProducts() {
  productsContainer.innerHTML = "";
  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>R${product.price}</p>
      <button class="order-btn" data-id="${product.id}">Order</button>
    `;
    productsContainer.appendChild(card);
  });

  // Add click events to all order buttons
  document.querySelectorAll(".order-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const product = products.find(p => p.id == e.target.dataset.id);
      openOrderModal(product);
    });
  });
}

// Open order modal
function openOrderModal(product) {
  modalProductName.textContent = product.name;
  modalProductPrice.textContent = `R${product.price}`;
  modalProductDesc.textContent = product.desc;
  orderModal.style.display = "block";

  placeOrderBtn.onclick = () => {
    const customerName = customerNameInput.value.trim();
    const paymentMethod = paymentMethodSelect.value;
    if (!customerName) {
      alert("Please enter your name!");
      return;
    }

    // WhatsApp URL
    const whatsappNumber = "0686816463"; // Your number
    const message = `Hello, my name is ${customerName}. I want to order "${product.name}" for R${product.price} using ${paymentMethod}.`;
    const whatsappUrl = `https://wa.me/27${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    orderModal.style.display = "none";
    customerNameInput.value = "";
  };
}

// Close modal
closeModal.onclick = () => {
  orderModal.style.display = "none";
};

// Close modal if clicked outside
window.onclick = (event) => {
  if (event.target == orderModal) {
    orderModal.style.display = "none";
  }
};

// Initial render
renderProducts();