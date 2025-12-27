// ---------- Admin Password ----------
const ADMIN_PASSWORD = "admin123";

// ---------- DOM Elements ----------
const adminPanel = document.getElementById("adminPanel");
const loginBtn = document.getElementById("loginBtn");
const adminPasswordInput = document.getElementById("adminPassword");
const adminProductsList = document.getElementById("adminProductsList");
const addProductBtn = document.getElementById("addProductBtn");
const prodName = document.getElementById("prodName");
const prodPrice = document.getElementById("prodPrice");
const prodDesc = document.getElementById("prodDesc");
const prodImage = document.getElementById("prodImage");

const productsContainer = document.getElementById("products");

// ---------- LocalStorage Products ----------
let products = JSON.parse(localStorage.getItem("products") || "[]");

// ---------- Render Products on Index ----------
function renderProducts() {
  if (!productsContainer) return;
  productsContainer.innerHTML = "";
  products.forEach((p, index) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.price}</p>
    `;
    card.addEventListener("click", () => openOrderModal(index));
    productsContainer.appendChild(card);
  });
}

// ---------- Order Modal ----------
const orderModal = document.getElementById("orderModal");
const closeOrderModal = document.getElementById("closeOrderModal");
const modalProductName = document.getElementById("modalProductName");
const modalProductPrice = document.getElementById("modalProductPrice");
const modalProductDesc = document.getElementById("modalProductDesc");
const customerName = document.getElementById("customerName");
const paymentMethod = document.getElementById("paymentMethod");
const placeOrder = document.getElementById("placeOrder");

let selectedProduct = null;

function openOrderModal(index) {
  selectedProduct = products[index];
  modalProductName.textContent = selectedProduct.name;
  modalProductPrice.textContent = selectedProduct.price;
  modalProductDesc.textContent = selectedProduct.desc;
  orderModal.style.display = "block";
}

closeOrderModal.onclick = () => orderModal.style.display = "none";

placeOrder.onclick = () => {
  const name = customerName.value.trim();
  const payment = paymentMethod.value;
  if (!name) {
    alert("Please enter your name.");
    return;
  }
  alert(`Order Placed!\nProduct: ${selectedProduct.name}\nPrice: ${selectedProduct.price}\nCustomer: ${name}\nPayment: ${payment}`);
  orderModal.style.display = "none";
};

// ---------- Admin Login ----------
loginBtn.onclick = () => {
  if (adminPasswordInput.value === ADMIN_PASSWORD) {
    adminPanel.style.display = "block";
  } else {
    alert("Incorrect password!");
  }
};

// ---------- Render Admin Products ----------
function renderAdminProducts() {
  adminProductsList.innerHTML = "";
  products.forEach((p, index) => {
    const div = document.createElement("div");
    div.classList.add("admin-product-card");
    div.innerHTML = `
      <p><b>${p.name}</b> - ${p.price}</p>
      <button class="editBtn">Edit</button>
      <button class="deleteBtn">Delete</button>
    `;
    const editBtn = div.querySelector(".editBtn");
    const deleteBtn = div.querySelector(".deleteBtn");

    editBtn.onclick = () => {
      const newName = prompt("New Name:", p.name);
      const newPrice = prompt("New Price:", p.price);
      const newDesc = prompt("New Description:", p.desc);
      const newImage = prompt("New Image URL:", p.image);
      if (newName && newPrice && newDesc && newImage) {
        products[index] = { name: newName, price: newPrice, desc: newDesc, image: newImage };
        localStorage.setItem("products", JSON.stringify(products));
        renderProducts();
        renderAdminProducts();
      }
    };

    deleteBtn.onclick = () => {
      if (confirm("Are you sure?")) {
        products.splice(index, 1);
        localStorage.setItem("products", JSON.stringify(products));
        renderProducts();
        renderAdminProducts();
      }
    };

    adminProductsList.appendChild(div);
  });
}

// ---------- Add Product ----------
addProductBtn.onclick = () => {
  const name = prodName.value.trim();
  const price = prodPrice.value.trim();
  const desc = prodDesc.value.trim();
  const image = prodImage.value.trim();
  if (!name || !price || !desc || !image) {
    alert("All fields are required!");
    return;
  }
  products.push({ name, price, desc, image });
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
  renderAdminProducts();
  prodName.value = "";
  prodPrice.value = "";
  prodDesc.value = "";
  prodImage.value = "";
};

// ---------- Initialize ----------
renderProducts();
renderAdminProducts();