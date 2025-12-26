// Admin Dashboard Logic
const adminContent = document.getElementById("adminContent");

// Sections
document.getElementById("manageProducts").addEventListener("click", showManageProducts);
document.getElementById("viewOrders").addEventListener("click", showOrders);
document.getElementById("viewSuggestions").addEventListener("click", showSuggestions);
document.getElementById("adminSettings").addEventListener("click", showSettings);

// Load products from localStorage
let products = JSON.parse(localStorage.getItem("products")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];
let suggestions = JSON.parse(localStorage.getItem("suggestions")) || [];
let admins = JSON.parse(localStorage.getItem("admins")) || [{username: "superadmin", password: "1234"}];

function showManageProducts() {
  adminContent.innerHTML = `
    <h2>Manage Products</h2>
    <form id="addProductForm">
      <input type="text" id="productName" placeholder="Product Name" required>
      <input type="text" id="productPrice" placeholder="Price" required>
      <input type="text" id="productDesc" placeholder="Description">
      <input type="text" id="productImage" placeholder="Image URL" required>
      <button type="submit">Add Product</button>
    </form>
    <div id="productList" class="product-list"></div>
  `;
  displayProducts();

  document.getElementById("addProductForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("productName").value.trim();
    const price = document.getElementById("productPrice").value.trim();
    const desc = document.getElementById("productDesc").value.trim();
    const image = document.getElementById("productImage").value.trim();
    const newProduct = {name, price, desc, image, id: Date.now()};
    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
    e.target.reset();
  });
}

function displayProducts() {
  const list = document.getElementById("productList");
  if (!list) return;
  list.innerHTML = "";
  products.forEach(prod => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${prod.image}" alt="${prod.name}" class="product-img">
      <h3>${prod.name}</h3>
      <p>Price: ${prod.price}</p>
      <p>${prod.desc}</p>
      <button class="deleteBtn" data-id="${prod.id}"><i class="fa-solid fa-trash"></i> Delete</button>
    `;
    list.appendChild(div);
  });

  document.querySelectorAll(".deleteBtn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.closest("button").dataset.id);
      products = products.filter(p => p.id !== id);
      localStorage.setItem("products", JSON.stringify(products));
      displayProducts();
    });
  });
}

function showOrders() {
  adminContent.innerHTML = `<h2>Orders</h2><div id="ordersList"></div>`;
  const ordersList = document.getElementById("ordersList");
  if (orders.length === 0) {
    ordersList.innerHTML = "<p>No orders yet</p>";
    return;
  }
  ordersList.innerHTML = orders.map(o => `
    <div class="order-card">
      <p><strong>Product:</strong> ${o.product}</p>
      <p><strong>Price:</strong> ${o.price}</p>
      <p><strong>User Phone:</strong> ${o.userPhone || "Not provided"}</p>
      <p><strong>Payment:</strong> ${o.payment}</p>
      <button class="whatsappBtn" data-phone="${o.userPhone}" data-product="${o.product}" data-price="${o.price}" data-payment="${o.payment}">Send WhatsApp</button>
    </div>
  `).join("");

  document.querySelectorAll(".whatsappBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      const phone = btn.dataset.phone;
      const product = btn.dataset.product;
      const price = btn.dataset.price;
      const payment = btn.dataset.payment;
      if (!phone) return alert("User phone not provided");
      const url = `https://wa.me/${phone}?text=Hello,%20I%20am%20confirming%20your%20order:%0AProduct:%20${product}%0APrice:%20${price}%0APayment:%20${payment}`;
      window.open(url, "_blank");
    });
  });
}

function showSuggestions() {
  adminContent.innerHTML = `<h2>Suggestions</h2><div id="suggestionList"></div>`;
  const list = document.getElementById("suggestionList");
  if (suggestions.length === 0) {
    list.innerHTML = "<p>No suggestions yet</p>";
    return;
  }
  list.innerHTML = suggestions.map(s => `
    <div class="suggestion-card">
      <p><strong>User:</strong> ${s.userPhone || "Unknown"}</p>
      <p>${s.text}</p>
    </div>
  `).join("");
}

function showSettings() {
  adminContent.innerHTML = `
    <h2>Admin Settings</h2>
    <div id="adminList"></div>
    <button id="addAdminBtn">Add Admin</button>
  `;
  const adminList = document.getElementById("adminList");
  adminList.innerHTML = admins.map((a,i) => `
    <div class="admin-card">
      <p>${a.username}</p>
      <button class="removeAdminBtn" data-index="${i}">Remove</button>
    </div>
  `).join("");

  document.getElementById("addAdminBtn").addEventListener("click", () => {
    const username = prompt("New admin username:");
    const password = prompt("New admin password:");
    if (username && password) {
      admins.push({username, password});
      localStorage.setItem("admins", JSON.stringify(admins));
      showSettings();
    }
  });

  document.querySelectorAll(".removeAdminBtn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const i = parseInt(e.target.dataset.index);
      if (confirm(`Remove admin ${admins[i].username}?`)) {
        admins.splice(i,1);
        localStorage.setItem("admins", JSON.stringify(admins));
        showSettings();
      }
    });
  });
}