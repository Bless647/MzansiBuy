let products = JSON.parse(localStorage.getItem("products")) || [];

const productsBox = document.getElementById("products");
const adminProducts = document.getElementById("adminProducts");

/* ======================
   DISPLAY PRODUCTS
====================== */
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

/* ======================
   ADMIN LOGIN
====================== */
document.getElementById("adminLoginForm")?.addEventListener("submit", e => {
  e.preventDefault();
  const pass = document.getElementById("adminPassword").value;

  if (pass === "admin123") {
    document.getElementById("adminPanel").classList.remove("hidden");
    e.target.style.display = "none";
  } else {
    document.getElementById("error").textContent = "Wrong password";
  }
});

/* ======================
   ADD PRODUCT (UPLOAD IMAGE)
====================== */
document.getElementById("addProduct")?.addEventListener("click", () => {
  const name = pName.value;
  const price = pPrice.value;
  const file = pImage.files[0];

  if (!name || !price || !file) {
    alert("Fill all fields");
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    products.push({
      name,
      price,
      image: reader.result
    });

    localStorage.setItem("products", JSON.stringify(products));
    location.reload();
  };

  reader.readAsDataURL(file);
});

/* ======================
   ADMIN PRODUCT LIST + DELETE
====================== */
if (adminProducts) {
  adminProducts.innerHTML = "";
  products.forEach((p, i) => {
    adminProducts.innerHTML += `
      <div>
        ${p.name} – R ${p.price}
        <button onclick="deleteProduct(${i})">Delete</button>
      </div>
    `;
  });
}

window.deleteProduct = index => {
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  location.reload();
};