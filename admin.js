const PASSWORD = "admin123";
let editIndex = null;

function login() {
  const pass = document.getElementById("adminPass").value;
  if (pass === PASSWORD) {
    document.querySelector(".modal-content").style.display = "none";
    document.getElementById("adminPanel").classList.remove("hidden");
    renderAdminProducts();
  } else {
    alert("Wrong password");
  }
}

function getProducts() {
  return JSON.parse(localStorage.getItem("products")) || [];
}

function saveProducts(products) {
  localStorage.setItem("products", JSON.stringify(products));
}

function addProduct() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const image = document.getElementById("image").value;
  const desc = document.getElementById("desc").value;

  if (!name || !price || !image) {
    alert("Fill all fields");
    return;
  }

  const products = getProducts();

  if (editIndex !== null) {
    products[editIndex] = { name, price, image, description: desc };
    editIndex = null;
  } else {
    products.push({ name, price, image, description: desc });
  }

  saveProducts(products);
  clearForm();
  renderAdminProducts();
}

function clearForm() {
  name.value = price.value = image.value = desc.value = "";
}

function renderAdminProducts() {
  const container = document.getElementById("adminProducts");
  container.innerHTML = "";

  getProducts().forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${p.image}">
      <div class="card-body">
        <h3>${p.name}</h3>
        <p>R ${p.price}</p>
        <button onclick="editProduct(${i})">Edit</button>
        <button onclick="deleteProduct(${i})">Delete</button>
      </div>
    `;

    container.appendChild(card);
  });
}

function editProduct(i) {
  const p = getProducts()[i];
  name.value = p.name;
  price.value = p.price;
  image.value = p.image;
  desc.value = p.description;
  editIndex = i;
}

function deleteProduct(i) {
  if (!confirm("Delete product?")) return;
  const products = getProducts();
  products.splice(i, 1);
  saveProducts(products);
  renderAdminProducts();
}