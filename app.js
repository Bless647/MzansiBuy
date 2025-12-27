const adminPassword = "admin123";

// Elements
const passwordModal = document.getElementById("passwordModal");
const adminPasswordInput = document.getElementById("adminPasswordInput");
const submitAdminPassword = document.getElementById("submitAdminPassword");
const passwordError = document.getElementById("passwordError");

const adminDashboard = document.getElementById("adminDashboard");
const addProductBtn = document.getElementById("addProductBtn");
const productList = document.getElementById("productList");

const productName = document.getElementById("productName");
const productDesc = document.getElementById("productDesc");
const productPrice = document.getElementById("productPrice");
const productImage = document.getElementById("productImage");

// LocalStorage key
const STORAGE_KEY = "mzansiProducts";

// Load products from localStorage
let products = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// Function to render products on admin
function renderAdminProducts() {
  productList.innerHTML = "";
  products.forEach((product, index) => {
    const div = document.createElement("div");
    div.classList.add("product-card");
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.desc}</p>
      <p>R${product.price}</p>
      <button class="edit-btn" data-index="${index}"><i class="fa-solid fa-pen"></i></button>
      <button class="delete-btn" data-index="${index}"><i class="fa-solid fa-trash"></i></button>
    `;
    productList.appendChild(div);
  });

  // Attach delete listeners
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.closest("button").dataset.index;
      products.splice(index, 1);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
      renderAdminProducts();
      renderIndexProducts();
    });
  });

  // Attach edit listeners
  document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.closest("button").dataset.index;
      const product = products[index];
      const newName = prompt("Edit Product Name:", product.name);
      const newDesc = prompt("Edit Description:", product.desc);
      const newPrice = prompt("Edit Price:", product.price);
      const newImage = prompt("Edit Image URL:", product.image);

      if(newName && newDesc && newPrice && newImage){
        products[index] = { name: newName, desc: newDesc, price: newPrice, image: newImage };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
        renderAdminProducts();
        renderIndexProducts();
      }
    });
  });
}

// Add product
addProductBtn.addEventListener("click", () => {
  const name = productName.value.trim();
  const desc = productDesc.value.trim();
  const price = parseFloat(productPrice.value);
  const image = productImage.value.trim();

  if(!name || !desc || !price || !image) return alert("Fill all fields!");

  const newProduct = { name, desc, price, image };
  products.push(newProduct);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));

  // Clear inputs
  productName.value = "";
  productDesc.value = "";
  productPrice.value = "";
  productImage.value = "";

  renderAdminProducts();
  renderIndexProducts();
});

// Password check
submitAdminPassword.addEventListener("click", () => {
  if(adminPasswordInput.value === adminPassword){
    passwordModal.classList.add("hidden");
    adminDashboard.classList.remove("hidden");
  } else {
    passwordError.textContent = "Incorrect password!";
  }
});

// INITIAL RENDER
renderAdminProducts();

// Function to render products on index.html
export function renderIndexProducts() {
  const indexProducts = document.getElementById("products");
  if(!indexProducts) return;
  indexProducts.innerHTML = "";
  products.forEach(product => {
    const div = document.createElement("div");
    div.classList.add("product-card");
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>R${product.price}</p>
    `;
    indexProducts.appendChild(div);

    div.addEventListener("click", () => {
      const modal = document.getElementById("orderModal");
      if(modal){
        modal.style.display = "block";
        document.getElementById("modalProductName").textContent = product.name;
        document.getElementById("modalProductPrice").textContent = `R${product.price}`;
        document.getElementById("modalProductDesc").textContent = product.desc;

        const placeBtn = document.getElementById("placeOrder");
        const customerName = document.getElementById("customerName");
        const paymentMethod = document.getElementById("paymentMethod");

        placeBtn.onclick = () => {
          if(!customerName.value.trim()) return alert("Enter your name");
          alert(`Order placed by ${customerName.value} for ${product.name} (R${product.price}) via ${paymentMethod.value}`);
          modal.style.display = "none";
        };
      }
    });
  });
}