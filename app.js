/* ======================
   GLOBAL PRODUCTS
====================== */
let products = JSON.parse(localStorage.getItem("products")) || [];

/* ======================
   INDEX PAGE (PRODUCT GRID)
====================== */
const productsBox = document.getElementById("products");

if (productsBox) {
  productsBox.innerHTML = "";
  products.forEach((p, i) => {
    productsBox.innerHTML += `
      <div class="card" onclick="location.href='product.html?id=${i}'">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>R ${Number(p.price).toFixed(2)}</p>
      </div>
    `;
  });
}

/* ======================
   ADMIN LOGIN
====================== */
const loginForm = document.getElementById("adminLoginForm");
if (loginForm) {
  loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const pass = document.getElementById("adminPassword").value;

    if (pass === "admin123") {
      document.getElementById("adminPanel").classList.remove("hidden");
      loginForm.style.display = "none";
    } else {
      document.getElementById("error").textContent = "Wrong password";
    }
  });
}

/* ======================
   ADD PRODUCT (IMAGE + NUMERIC PRICE)
====================== */
const addBtn = document.getElementById("addProduct");
if (addBtn) {
  addBtn.addEventListener("click", () => {
    const name = document.getElementById("pName").value.trim();
    const rawPrice = document.getElementById("pPrice").value;
    const file = document.getElementById("pImage").files[0];

    const price = parseFloat(rawPrice);

    if (!name || isNaN(price) || !file) {
      alert("Enter product name, numeric price, and image");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      products.push({
        name,
        price: price,
        image: reader.result
      });

      localStorage.setItem("products", JSON.stringify(products));
      location.reload();
    };

    reader.readAsDataURL(file);
  });
}

/* ======================
   ADMIN PRODUCT LIST + DELETE
====================== */
const adminProducts = document.getElementById("adminProducts");
if (adminProducts) {
  adminProducts.innerHTML = "";
  products.forEach((p, i) => {
    adminProducts.innerHTML += `
      <div>
        ${p.name} – R ${Number(p.price).toFixed(2)}
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

/* ======================
   PRODUCT DETAILS PAGE
====================== */
const productDetails = document.getElementById("productDetails");

if (productDetails) {
  const params = new URLSearchParams(window.location.search);
  const index = params.get("id");
  const product = products[index];

  if (!product) {
    productDetails.innerHTML = "<p>Product not found</p>";
  } else {
    productDetails.innerHTML = `
      <img src="${product.image}" style="width:100%;border-radius:12px">
      <h2>${product.name}</h2>
      <p>Price: R ${Number(product.price).toFixed(2)}</p>
      <button onclick="orderWhatsApp('${product.name}', ${product.price})">
        Order on WhatsApp
      </button>
    `;
  }
}

/* ======================
   WHATSAPP ORDER (AUTO LOCATION + CONFIRM)
====================== */
window.orderWhatsApp = (name, price) => {
  const phone = "27686816463"; // YOUR NUMBER

  // Step 1: Ask for location permission
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const mapsLink = `https://maps.google.com/?q=${lat},${lon}`;

        // Step 2: Ask if user is at delivery location
        const atLocation = confirm("Are you currently at your delivery location? Click OK for YES, Cancel for NO.");

        let message = `Hello, I would like to order:%0A%0AProduct: ${name}%0APrice: R ${Number(price).toFixed(2)}%0A`;

        if (atLocation) {
          message += `%0AMy delivery location: ${mapsLink}`;
        } else {
          message += `%0AMy delivery location is different. I will send it now.`;
        }

        window.open(`https://wa.me/${phone}?text=${message}`);
      },
      error => {
        // User denied location
        const msg = `Hello, I would like to order:%0A%0AProduct: ${name}%0APrice: R ${Number(price).toFixed(2)}%0A
My delivery location is different. I will send it now.`;
        window.open(`https://wa.me/${phone}?text=${msg}`);
      }
    );
  } else {
    // Browser does not support geolocation
    const msg = `Hello, I would like to order:%0A%0AProduct: ${name}%0APrice: R ${Number(price).toFixed(2)}%0A
My delivery location is different. I will send it now.`;
    window.open(`https://wa.me/${phone}?text=${msg}`);
  }
};