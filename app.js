import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFRoLLaeGoaPQHwTgt_frBDG90PQ03vZU",
  authDomain: "mzansibuy-da2ec.firebaseapp.com",
  projectId: "mzansibuy-da2ec",
  storageBucket: "mzansibuy-da2ec.appspot.com",
  messagingSenderId: "960056695104",
  appId: "1:960056695104:web:0aaaf222abaf0ceebe42a5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Admin login
const password = "supersecret"; // Set your password
const loginBtn = document.getElementById("loginBtn");
const adminPassword = document.getElementById("adminPassword");
const loginError = document.getElementById("loginError");
const adminControls = document.querySelector(".admin-controls");

if(loginBtn){
  loginBtn.addEventListener("click", () => {
    if(adminPassword.value === password){
      adminControls.style.display = "block";
      document.querySelector(".admin-login").style.display = "none";
      loadProducts();
    } else {
      loginError.textContent = "Incorrect password!";
    }
  });
}

// Admin product management
const addBtn = document.getElementById("addProduct");
const productList = document.getElementById("productList");

async function loadProducts(){
  productList.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach((docSnap)=>{
    const p = docSnap.data();
    const div = document.createElement("div");
    div.innerHTML = `
      <h4>${p.name}</h4>
      <p>${p.desc}</p>
      <p>R ${p.price}</p>
      <img src="${p.img}" style="width:100px;">
      <button data-id="${docSnap.id}" class="deleteBtn">Delete</button>
    `;
    productList.appendChild(div);
  });

  document.querySelectorAll(".deleteBtn").forEach(btn=>{
    btn.addEventListener("click", async ()=>{
      await deleteDoc(doc(db,"products",btn.dataset.id));
      loadProducts();
    });
  });
}

if(addBtn){
  addBtn.addEventListener("click", async ()=>{
    const name = document.getElementById("productName").value;
    const desc = document.getElementById("productDesc").value;
    const price = document.getElementById("productPrice").value;
    const img = document.getElementById("productImg").value;
    if(name && desc && price && img){
      await addDoc(collection(db,"products"),{name,desc,price,img});
      document.getElementById("productName").value="";
      document.getElementById("productDesc").value="";
      document.getElementById("productPrice").value="";
      document.getElementById("productImg").value="";
      loadProducts();
    }
  });
}

// Index page product rendering
const productsGrid = document.getElementById("products");
const orderModal = document.getElementById("orderModal");
const closeModal = document.getElementById("closeOrderModal");
const modalName = document.getElementById("modalProductName");
const modalPrice = document.getElementById("modalProductPrice");
const modalDesc = document.getElementById("modalProductDesc");

if(productsGrid){
  async function loadIndexProducts(){
    productsGrid.innerHTML="";
    const querySnapshot = await getDocs(collection(db,"products"));
    querySnapshot.forEach(docSnap=>{
      const p = docSnap.data();
      const div = document.createElement("div");
      div.className="product-card";
      div.innerHTML = `
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>R ${p.price}</p>
      `;
      div.addEventListener("click", ()=>{
        modalName.textContent = p.name;
        modalPrice.textContent = `R ${p.price}`;
        modalDesc.textContent = p.desc;
        orderModal.style.display="block";
      });
      productsGrid.appendChild(div);
    });
  }
  loadIndexProducts();
}

if(closeModal){
  closeModal.addEventListener("click", ()=>{orderModal.style.display="none";});
}

document.getElementById("placeOrder")?.addEventListener("click", ()=>{
  const customerName = document.getElementById("customerName").value;
  const payment = document.getElementById("paymentMethod").value;
  if(!customerName){
    alert("Please enter your name to proceed!");
    return;
  }
  alert(`Order placed!\nCustomer: ${customerName}\nPayment: ${payment}`);
  orderModal.style.display="none";
});