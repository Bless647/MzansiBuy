const products = JSON.parse(localStorage.getItem("products")) || [];

const productsBox = document.getElementById("products");
const adminProducts = document.getElementById("adminProducts");

// DISPLAY PRODUCTS (INDEX)
if (productsBox) {
  products.forEach(p => {
    productsBox.innerHTML += `
      <div class="card">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>R ${p.price}</p>
      </div>
    `;
  });
}

// ADMIN LOGIN
document.getElementById("adminLoginForm")?.addEventListener("submit", e => {
  e.preventDefault();

  const pass = document.getElementById("adminPassword").value;
  const error = document.getElementById("error");

  if (pass === "admin123") {
    document.getElementById("adminPanel").classList.remove("hidden");
    e.target.style.display = "none";
  } else {
    error.textContent = "Wrong password";
  }
});

// ADD PRODUCT
document.getElementById("addProduct")?.addEventListener("click", () => {
  const name = pName.value;
  const price = pPrice.value;
  const image = pImage.value;

  if (!name || !price || !image) return;

  products.push({ name, price, image });
  localStorage.setItem("products", JSON.stringify(products));
  location.reload();
});

// SHOW ADMIN PRODUCTS
if (adminProducts) {
  products.forEach(p => {
    adminProducts.innerHTML += `<div>${p.name} – R ${p.price}</div>`;
  });
}