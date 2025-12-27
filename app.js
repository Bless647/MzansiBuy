const productsContainer = document.getElementById("products");
const orderModal = document.getElementById("orderModal");
const closeModal = document.getElementById("closeOrderModal");
const modalProductName = document.getElementById("modalProductName");
const modalProductPrice = document.getElementById("modalProductPrice");
const modalProductDesc = document.getElementById("modalProductDesc");
const customerNameInput = document.getElementById("customerName");
const paymentMethodSelect = document.getElementById("paymentMethod");
const placeOrderBtn = document.getElementById("placeOrder");

// Example placeholder products
let products = [
  { id: 1, name: "Product 1", price: "100", image: "img/product1.jpg", desc: "Description 1" },
  { id: 2, name: "Product 2", price: "200", image: "img/product2.jpg", desc: "Description 2" },
  { id: 3, name: "Product 3", price: "300", image: "img/product3.jpg", desc: "Description 3" }
];

// Render products
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

  document.querySelectorAll(".order-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const product = products.find(p => p.id == e.target.dataset.id);
      openOrderModal(product);
    });
  });
}

function openOrderModal(product) {
  modalProductName.textContent = product.name;
  modalProductPrice.textContent = `R${product.price}`;
  modalProductDesc.textContent = product.desc;
  orderModal.style.display = "block";
}

closeModal.onclick = () => {
  orderModal.style.display = "none";
};

window.onclick = (event) => {
  if (event.target == orderModal) {
    orderModal.style.display = "none";
  }
};

renderProducts();