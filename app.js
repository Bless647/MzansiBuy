// Products Page
const productsGrid = document.getElementById("products");
const orderModal = document.getElementById("orderModal");
const closeOrderModal = document.getElementById("closeOrderModal");
const modalProductName = document.getElementById("modalProductName");
const modalProductPrice = document.getElementById("modalProductPrice");
const modalProductDesc = document.getElementById("modalProductDesc");
const customerNameInput = document.getElementById("customerName");
const paymentMethod = document.getElementById("paymentMethod");
const placeOrderBtn = document.getElementById("placeOrder");

// Use localStorage for now (later Firebase)
const products = JSON.parse(localStorage.getItem("products")) || [];
const orders = JSON.parse(localStorage.getItem("orders")) || [];

function displayProducts() {
  productsGrid.innerHTML = "";
  products.forEach(prod => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${prod.image}" alt="${prod.name}" class="product-img">
      <h3>${prod.name}</h3>
      <p>Price: ${prod.price}</p>
    `;
    div.addEventListener("click", () => openOrderModal(prod));
    productsGrid.appendChild(div);
  });
}

function openOrderModal(prod) {
  modalProductName.textContent = prod.name;
  modalProductPrice.textContent = `Price: ${prod.price}`;
  modalProductDesc.textContent = prod.desc;
  customerNameInput.value = "";
  paymentMethod.value = "Cash";
  orderModal.style.display = "block";

  placeOrderBtn.onclick = () => {
    const customerName = customerNameInput.value.trim();
    if (!customerName) {
      alert("Please enter your name before ordering.");
      return;
    }

    const newOrder = {
      customerName,
      productName: prod.name,
      productPrice: prod.price,
      payment: paymentMethod.value,
      timestamp: new Date().toISOString()
    };

    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));
    alert("Order placed successfully!");
    orderModal.style.display = "none";
  };
}

closeOrderModal.onclick = () => {
  orderModal.style.display = "none";
};

window.onclick = (e) => {
  if (e.target == orderModal) orderModal.style.display = "none";
};

displayProducts();