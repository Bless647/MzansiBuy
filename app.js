import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAFRoLLaeGoaPQHwTgt_frBDG90PQ03vZU",
  authDomain: "mzansibuy-da2ec.firebaseapp.com",
  projectId: "mzansibuy-da2ec",
  storageBucket: "mzansibuy-da2ec.appspot.com",
  messagingSenderId: "960056695104",
  appId: "1:960056695104:web:0aaaf222abaf0ceebe42a5",
  measurementId: "G-BZLD0M13GH"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Admin login
function login() {
  const pass = document.getElementById("adminPass").value;
  if(pass === "1234"){
    document.querySelector(".admin-box").classList.add("hidden");
    document.querySelector(".admin-panel").classList.remove("hidden");
    loadProducts();
  } else {
    alert("❌ Wrong password. Please try again.");
  }
}

// Add product
async function addProduct() {
  const name = document.getElementById("pName").value;
  const price = document.getElementById("pPrice").value;
  const desc = document.getElementById("pDesc").value;
  const imageFile = document.getElementById("pImage").files[0];

  if(!name || !price || !imageFile){
    alert("❌ Please fill all required fields and select an image.");
    return;
  }

  // Upload image
  const imageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
  await uploadBytes(imageRef, imageFile);
  const imageURL = await getDownloadURL(imageRef);

  // Save product
  await addDoc(collection(db, "products"), { name, price, desc, imageURL });

  alert("✅ Product added successfully!");
  loadProducts(); // refresh product list
}

// Load products for admin panel
async function loadProducts() {
  const grid = document.getElementById("productsGrid");
  grid.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach((docSnap) => {
    const p = docSnap.data();
    grid.innerHTML += `
      <div class="product-card">
        <img src="${p.imageURL}" alt="${p.name}" style="width:100px;height:100px;">
        <p>${p.name}</p>
        <p>R ${p.price}</p>
        <button onclick="deleteProduct('${docSnap.id}')">🗑 Delete</button>
      </div>
    `;
  });
}

// Delete product
async function deleteProduct(id) {
  if(confirm("Are you sure you want to delete this product?")){
    await deleteDoc(doc(db, "products", id));
    alert("✅ Product deleted!");
    loadProducts();
  }
}

// Expose functions to HTML
window.login = login;
window.addProduct = addProduct;
window.deleteProduct = deleteProduct;