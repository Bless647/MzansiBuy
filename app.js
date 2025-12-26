import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAFRoLLaeGoaPQHwTgt_frBDG90PQ03vZU",
  authDomain: "mzansibuy-da2ec.firebaseapp.com",
  projectId: "mzansibuy-da2ec"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// PUBLIC PAGE
const grid = document.getElementById("products");
if(grid){
  const snap = await getDocs(collection(db,"products"));
  snap.forEach(d=>{
    const p=d.data();
    grid.innerHTML+=`
      <div class="card">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>R ${p.price}</p>
      </div>`;
  });
}

// ADMIN
window.login=()=>{
  if(document.getElementById("adminPass").value==="Entrepreneurs4"){
    document.querySelector(".admin-box").classList.add("hidden");
    document.querySelector(".admin-panel").classList.remove("hidden");
    loadAdminProducts();
  }
};

window.addProduct=async()=>{
  await addDoc(collection(db,"products"),{
    name:name.value,
    price:price.value,
    image:image.value,
    desc:desc.value
  });
  location.reload();
};

async function loadAdminProducts(){
  const box=document.getElementById("adminProducts");
  const snap=await getDocs(collection(db,"products"));
  snap.forEach(d=>{
    box.innerHTML+=`
      <p>${d.data().name}
      <button onclick="del('${d.id}')">❌</button></p>`;
  });
}

window.del=async(id)=>{
  await deleteDoc(doc(db,"products",id));
  location.reload();
};
