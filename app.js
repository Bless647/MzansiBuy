let products = [];
let adminPassword = "1234"; // Change to your desired password

// DOM Elements
const productsContainer = document.getElementById("products");
const orderModal = document.getElementById("orderModal");
const closeOrderModal = document.getElementById("closeOrderModal");
const modalProductName = document.getElementById("modalProductName");
const modalProductPrice = document.getElementById("modalProductPrice");
const modalProductDesc = document.getElementById("modalProductDesc");
const customerNameInput = document.getElementById("customerName");
const paymentMethodSelect = document.getElementById("paymentMethod");
const placeOrderBtn = document.getElementById("placeOrder");

// Admin Elements
const adminPasswordInput = document.getElementById("adminPasswordInput");
const adminLoginBtn = document.getElementById("adminLoginBtn");
const loginError = document.getElementById("loginError");
const controlPanel = document.getElementById("controlPanel");
const addProductBtn = document.getElementById("addProductBtn");
const productNameInput = document.getElementById("productNameInput");
const productPriceInput = document.getElementById("productPriceInput");
const productDescInput = document.getElementById("productDescInput");
const productImageInput = document.getElementById("productImageInput");
const adminProductsList = document.getElementById("adminProductsList");

// Admin Login
if(adminLoginBtn){
  adminLoginBtn.addEventListener("click", ()=>{
    if(adminPasswordInput.value === adminPassword){
      loginError.textContent="";
      controlPanel.style.display="block";
      document.getElementById("loginDiv").style.display="none";
      renderAdminProducts();
    }else{
      loginError.textContent="Incorrect Password";
    }
  });
}

// Add Product
if(addProductBtn){
  addProductBtn.addEventListener("click", ()=>{
    const name = productNameInput.value.trim();
    const price = Number(productPriceInput.value);
    const desc = productDescInput.value.trim();
    const img = productImageInput.value.trim();
    if(name && price && img){
      const product = {name, price, desc, img};
      products.push(product);
      renderAdminProducts();
      renderProducts();
      productNameInput.value="";
      productPriceInput.value="";
      productDescInput.value="";
      productImageInput.value="";
    }
  });
}

// Render Admin Products
function renderAdminProducts(){
  adminProductsList.innerHTML="";
  products.forEach((p,i)=>{
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML=`<strong>${p.name}</strong> - R${p.price}<button data-index="${i}" class="deleteBtn">Delete</button>`;
    adminProductsList.appendChild(div);
  });

  document.querySelectorAll(".deleteBtn").forEach(btn=>{
    btn.addEventListener("click",(e)=>{
      const index = e.target.getAttribute("data-index");
      products.splice(index,1);
      renderAdminProducts();
      renderProducts();
    });
  });
}

// Render Products for Index
function renderProducts(){
  if(!productsContainer) return;
  productsContainer.innerHTML="";
  products.forEach((p,i)=>{
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML=`<img src="${p.img}" alt="${p.name}"><h3>${p.name}</h3><p>R${p.price}</p>`;
    div.addEventListener("click",()=>{
      modalProductName.textContent = p.name;
      modalProductPrice.textContent = "R"+p.price;
      modalProductDesc.textContent = p.desc;
      orderModal.style.display="block";
    });
    productsContainer.appendChild(div);
  });
}

// Close Modal
if(closeOrderModal){
  closeOrderModal.addEventListener("click",()=>{
    orderModal.style.display="none";
  });
}

// Place Order Button
if(placeOrderBtn){
  placeOrderBtn.addEventListener("click",()=>{
    const customerName = customerNameInput.value.trim();
    const paymentMethod = paymentMethodSelect.value;
    if(!customerName){
      alert("Please enter your name");
      return;
    }
    alert(`Order placed!\nName: ${customerName}\nPayment: ${paymentMethod}\nProduct: ${modalProductName.textContent}\nPrice: ${modalProductPrice.textContent}`);
    orderModal.style.display="none";
    customerNameInput.value="";
  });
}

// Initial Render
renderProducts();