const PASSWORD = "admin123";

function login() {
  const pass = document.getElementById("adminPass").value;
  if (pass === PASSWORD) {
    document.querySelector(".admin-box").style.display = "none";
    document.getElementById("panel").classList.remove("hidden");
    loadAdmin();
  } else {
    document.getElementById("error").innerText = "Wrong password";
  }
}

function getProducts() {
  return JSON.parse(localStorage.getItem("products") || "[]");
}

function saveProducts(p) {
  localStorage.setItem("products", JSON.stringify(p));
}

function addProduct() {
  const p = getProducts();
  p.push({
    name: name.value,
    price: price.value,
    image: image.value
  });
  saveProducts(p);
  loadAdmin();
  loadStore();
}

function loadAdmin() {
  const box = document.getElementById("adminProducts");
  if (!box) return;
  box.innerHTML = "";
  getProducts().forEach((p, i) => {
    box.innerHTML += `
      <div>
        ${p.name} - R${p.price}
        <button onclick="remove(${i})">Delete</button>
      </div>`;
  });
}

function remove(i) {
  const p = getProducts();
  p.splice(i, 1);
  saveProducts(p);
  loadAdmin();
  loadStore();
}

function loadStore() {
  const grid = document.getElementById("products");
  if (!grid) return;
  grid.innerHTML = "";
  getProducts().forEach(p => {
    grid.innerHTML += `
      <div class="card">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>R${p.price}</p>
      </div>`;
  });
}

loadStore();