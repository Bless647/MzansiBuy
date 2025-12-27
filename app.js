// Example products array (will be replaced with Firebase later)
let products = [
  {
    id: 1,
    name: "Product 1",
    price: 250,
    image: "https://via.placeholder.com/150",
    desc: "Description for product 1"
  },
  {
    id: 2,
    name: "Product 2",
    price: 400,
    image: "https://via.placeholder.com/150",
    desc: "Description for product 2"
  }
];

const productsContainer = document.getElementById("products");
const orderModal = document.getElementById("orderModal");
const closeModal = document.getElementById("closeOrderModal");
const modalProductName = document.getElementById("modalProductName");
const modalProductPrice = document.getElementById("modalProductPrice");
const modalProductDesc = document.getElementById("modalProductDesc");
const customerNameInput = document.getElementById("customerName");
const paymentSelect = document.getElementById("paymentMethod");
const placeOrderBtn = document.getElementById("placeOrder");

let selectedProduct = null;

// Render products grid
function renderProducts() {
  productsContainer.innerHTML = "";
  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>R ${product.price}</p>
    `;
    card.addEventListener("click", () => openModal(product));
    productsContainer.appendChild(card);
  });
}

// Open order modal
function openModal(product) {
  selectedProduct = product;
  modalProductName.textContent = product.name;
  modalProductPrice.textContent = `R ${product.price}`;
  modalProductDesc.textContent = product.desc;
  customerNameInput.value = "";
  paymentSelect.value = "Cash";
  orderModal.style.display = "block";
}

// Close modal
closeModal.onclick = () => {
  orderModal.style.display = "none";
};

// Place order
placeOrderBtn.onclick = () => {
  const customerName = customerNameInput.value.trim();
  const paymentMethod = paymentSelect.value;

  if (!customerName) {
    alert("Please enter your name.");
    return;
  }

  const msg = `Hello, I want to order ${selectedProduct.name} costing R${selectedProduct.price}. Payment method: ${paymentMethod}. Name: ${customerName}`;
  const phone = "27686816463"; // Your WhatsApp number
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");

  orderModal.style.display = "none";
};

renderProducts();