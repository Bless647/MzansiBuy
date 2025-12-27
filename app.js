const adminPassword = "admin123";

// Admin Login
const loginButton = document.getElementById("loginButton");
if (loginButton) {
  loginButton.addEventListener("click", () => {
    const input = document.getElementById("adminPassword").value;
    const error = document.getElementById("loginError");
    if (input === adminPassword) {
      window.location.href = "admin.html";
    } else {
      error.textContent = "Incorrect password. Try again.";
    }
  });
}

// Admin Dashboard
let products = JSON.parse(localStorage.getItem("products")) || [];

const productsContainer = document.getElementById("productsContainer");
const addButton = document.getElementById("addProduct");

function renderProducts() {
  if (!productsContainer) return;
  productsContainer.innerHTML = "";
  products.forEach((product, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${product.name} - R${product.price}</span>
      <button class="edit" data-index="${index}">Edit</button>
      <button class="delete" data-index="${index}">Delete</button>
    `;
    productsContainer.appendChild(li);
  });

  document.querySelectorAll(".delete").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const idx = e.target.dataset.index;
      products.splice(idx, 1);
      saveAndRender();
    });
  });

  document.querySelectorAll(".edit").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const idx = e.target.dataset.index;
      document.getElementById("productName").value = products[idx].name;
      document.getElementById("productDesc").value = products[idx].desc;
      document.getElementById("productPrice").value = products[idx].price;
      document.getElementById("productImage").value = products[idx].image;
      products.splice(idx, 1);
      saveAndRender();
    });
  });
}

function saveAndRender() {
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
}

if (addButton) {
  addButton.addEventListener("click", () => {
    const name = document.getElementById("productName").value.trim();
    const desc = document.getElementById("productDesc").value.trim();
    const price = parseFloat(document.getElementById("productPrice").value);
    const image = document.getElementById("productImage").value.trim();

    if (!name || !desc || isNaN(price) || !image) {
      alert("Please fill in all fields correctly.");
      return;
    }

    products.push({ name, desc, price, image });
    saveAndRender();

    document.getElementById("productName").value = "";
    document.getElementById("productDesc").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productImage").value = "";
  });
}

// Display Products on index.html
const productsGrid = document.getElementById("products");
if (productsGrid) {
  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>R${product.price}</p>
    `;
    productsGrid.appendChild(div);
  });
}