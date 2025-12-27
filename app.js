
// Import Firebase (if you set it up later)
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

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

// Example local products array (if Firebase not used yet)
let products = [
  // Will be overwritten by admin uploads
];

// DOM elements
const productsContainer = document.getElementById('products');
const orderModal = document.getElementById('orderModal');
const closeOrderModal = document.getElementById('closeOrderModal');
const modalProductName = document.getElementById('modalProductName');
const modalProductPrice = document.getElementById('modalProductPrice');
const modalProductDesc = document.getElementById('modalProductDesc');
const customerNameInput = document.getElementById('customerName');
const paymentMethodSelect = document.getElementById('paymentMethod');
const placeOrderBtn = document.getElementById('placeOrder');

let currentProduct = null;

// Load products from Firebase or local storage
async function loadProducts() {
  // If using Firebase uncomment below
  /*
  const productsSnapshot = await getDocs(collection(db, "products"));
  products = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  */
  
  renderProducts();
}

// Render products to grid
function renderProducts() {
  productsContainer.innerHTML = '';
  products.forEach((product, index) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>R${product.price}</p>
    `;
    card.addEventListener('click', () => openOrderModal(product));
    productsContainer.appendChild(card);
  });
}

// Open modal
function openOrderModal(product) {
  currentProduct = product;
  modalProductName.textContent = product.name;
  modalProductPrice.textContent = `R${product.price}`;
  modalProductDesc.textContent = product.description || '';
  customerNameInput.value = '';
  paymentMethodSelect.value = 'Cash';
  orderModal.style.display = 'block';
}

// Close modal
closeOrderModal.onclick = () => {
  orderModal.style.display = 'none';
};

// Place order
placeOrderBtn.onclick = () => {
  const customerName = customerNameInput.value.trim();
  const paymentMethod = paymentMethodSelect.value;

  if (!customerName) {
    alert("Please enter your name");
    return;
  }

  alert(`Order placed!\nProduct: ${currentProduct.name}\nPrice: R${currentProduct.price}\nCustomer: ${customerName}\nPayment: ${paymentMethod}`);
  orderModal.style.display = 'none';

  // TODO: send order data to Firebase if needed
};

// Close modal if click outside
window.onclick = (e) => {
  if (e.target === orderModal) {
    orderModal.style.display = 'none';
  }
};

// Initialize
loadProducts();