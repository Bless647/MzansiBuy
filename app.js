const products = [
  {
    id: 1,
    name: "Product 1",
    price: 100,
    description: "This is a cool product",
    image: "https://via.placeholder.com/300"
  },
  {
    id: 2,
    name: "Product 2",
    price: 200,
    description: "Another great product",
    image: "https://via.placeholder.com/300"
  }
];

const productsContainer = document.getElementById("products");
const orderModal = document.getElementById("orderModal");
const closeOrderModal = document.getElementById("closeOrderModal");
const modalProductName = document.getElementById("modalProductName");
const modalProductPrice = document.getElementById("modalProductPrice");
const modalProductDesc = document.getElementById("modalProductDesc");
const customerName = document.getElementById("customerName");
const paymentMethod = document.getElementById("paymentMethod");
const placeOrderBtn = document.getElementById("placeOrder");

// Render products
function renderProducts() {
  productsContainer.innerHTML = "";
  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "grid-item";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>R${product.price}</p>
    `;
    div.addEventListener("click", () => {
      openOrderModal(product);
    });
    productsContainer.appendChild(div);
  });
}

function openOrderModal(product) {
  modalProductName.textContent = product.name;
  modalProductPrice.textContent = "R" + product.price;
  modalProductDesc.textContent = product.description;
  orderModal.style.display = "block";
}

closeOrderModal.addEventListener("click", () => {
  orderModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === orderModal) {
    orderModal.style.display = "none";
  }
});

placeOrderBtn.addEventListener("click", () => {
  if (!customerName.value) {
    alert("Please enter your name!");
    return;
  }

  const orderDetails = `
  Name: ${customerName.value}
  Product: ${modalProductName.textContent}
  Price: ${modalProductPrice.textContent}
  Payment: ${paymentMethod.value}
  `;
  console.log(orderDetails); // For now, just log. Later you can send to Firebase or server
  alert("Order placed successfully!");
  orderModal.style.display = "none";
  customerName.value = "";
  paymentMethod.value = "Cash";
});

renderProducts();