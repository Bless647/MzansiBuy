import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFRoLLaeGoaPQHwTgt_frBDG90PQ03vZU",
  authDomain: "mzansibuy-da2ec.firebaseapp.com",
  projectId: "mzansibuy-da2ec",
  storageBucket: "mzansibuy-da2ec.firebasestorage.app",
  messagingSenderId: "960056695104",
  appId: "1:960056695104:web:0aaaf222abaf0ceebe42a5",
  measurementId: "G-BZLD0M13GH"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const productsContainer = document.getElementById("products");
const orderModal = document.getElementById("orderModal");
const closeOrderModal = document.getElementById("closeOrderModal");

const modalProductName = document.getElementById("modalProductName");
const modalProductPrice = document.getElementById("modalProductPrice");
const modalProductDesc = document.getElementById("modalProductDesc");
const modalProductImage = document.getElementById("modalProductImage");

const customerNameInput = document.getElementById("customerName");
const paymentMethodSelect = document.getElementById("paymentMethod");
const placeOrderBtn = document.getElementById("placeOrder");

let products = [];

// Load products from admin.js array or Firebase
async function loadProducts() {
  // If using Firebase uncomment below
  /*
  const snapshot = await getDocs(collection(db, "products"));
  products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  */
  
  // TEMP: Example admin products
  products = window.adminProducts || []; 

  renderProducts();
}

function renderProducts() {
  productsContainer.innerHTML = "";
  products.forEach((product, index) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>R${product.price}</p>
    `;

    card.onclick = () => openOrderModal(index);

    productsContainer.appendChild(card);
  });
}

function openOrderModal(index) {
  const product = products[index];
  modalProductName.textContent = product.name;
  modalProductPrice.textContent = `R${product.price}`;
  modalProductDesc.textContent = product.description || "";
  modalProductImage.src = product.image;

  orderModal.style.display = "block";
}

closeOrderModal.onclick = () => {
  orderModal.style.display = "none";
};

window.onclick = (event) => {
  if (event.target === orderModal) {
    orderModal.style.display = "none";
  }
};

// Place order
placeOrderBtn.onclick = () => {
  const customerName = customerNameInput.value.trim();
  const paymentMethod = paymentMethodSelect.value;

  if (!customerName) {
    alert("Please enter your name!");
    return;
  }

  alert(`Order placed!\nName: ${customerName}\nPayment: ${paymentMethod}\nProduct: ${modalProductName.textContent}`);

  customerNameInput.value = "";
  orderModal.style.display = "none";

  // TODO: send to Firebase orders collection
};

loadProducts();