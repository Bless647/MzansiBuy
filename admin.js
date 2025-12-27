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

const adminPassword = "admin123";

const loginBtn = document.getElementById('loginBtn');
const adminPanel = document.getElementById('adminPanel');

const productForm = document.getElementById('productForm');
const productList = document.getElementById('productList');

let products = [];

// Admin login
loginBtn.onclick = () => {
  const pw = document.getElementById('adminPassword').value;
  if (pw === adminPassword) {
    adminPanel.style.display = "block";
    loginBtn.parentElement.style.display = "none";
    loadProducts();
  } else {
    alert("Wrong password");
  }
};

// Load products
async function loadProducts() {
  // If using Firebase uncomment below
  /*
  const productsSnapshot = await getDocs(collection(db, "products"));
  products = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  */
  renderProducts();
}

// Render products in admin panel
function renderProducts() {
  productList.innerHTML = '';
  products.forEach((product, index) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>R${product.price}</p>
      <p>${product.description || ''}</p>
      <div class="admin-buttons">
        <button class="editBtn">Edit</button>
        <button class="deleteBtn">Delete</button>
      </div>
    `;

    const editBtn = card.querySelector('.editBtn');
    editBtn.onclick = () => editProduct(index);

    const deleteBtn = card.querySelector('.deleteBtn');
    deleteBtn.onclick = () => deleteProduct(index);

    productList.appendChild(card);
  });
}

// Add product
productForm.onsubmit = (e) => {
  e.preventDefault();
  const newProduct = {
    name: document.getElementById('productName').value,
    price: parseFloat(document.getElementById('productPrice').value),
    image: document.getElementById('productImage').value,
    description: document.getElementById('productDesc').value
  };
  products.push(newProduct);
  renderProducts();
  productForm.reset();

  // TODO: Add to Firebase
};

// Edit product
function editProduct(index) {
  const product = products[index];
  document.getElementById('productName').value = product.name;
  document.getElementById('productPrice').value = product.price;
  document.getElementById('productImage').value = product.image;
  document.getElementById('productDesc').value = product.description;

  products.splice(index, 1); // Remove old entry
  renderProducts();
}

// Delete product
function deleteProduct(index) {
  if (confirm("Are you sure you want to delete this product?")) {
    products.splice(index, 1);
    renderProducts();
  }
}