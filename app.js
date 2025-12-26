const adminPassword = "12345"; // Change this to your real password

// Admin login elements
const adminLoginBtn = document.getElementById("adminLoginBtn");
const adminPasswordInput = document.getElementById("adminPasswordInput");
const loginError = document.getElementById("loginError");
const controlPanel = document.getElementById("controlPanel");
const loginDiv = document.getElementById("loginDiv");

// Product elements
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productDesc = document.getElementById("productDesc");
const productImg = document.getElementById("productImg");
const addProductBtn = document.getElementById("addProductBtn");
const adminProductsList = document.getElementById("adminProductsList");
const productsGrid = document.getElementById("products");

// Local storage products array
let products = JSON.parse(localStorage.getItem("products")) || [];

// Render products on index and admin
function renderProducts() {
  if(productsGrid){
    productsGrid.innerHTML = "";
    products.forEach((p, idx)=>{
      const div = document.createElement("div");
      div.className="grid-item";
      div.innerHTML = `
        <img src="${p.img}" alt="${p.name}" style="width:100%; height:150px; object-fit:cover;">
        <h3>${p.name}</h3>
        <p>R${p.price}</p>
      `;
      div.addEventListener("click", ()=>{
        openOrderModal(p);
      });
      productsGrid.appendChild(div);
    });
  }

  if(adminProductsList){
    adminProductsList.innerHTML = "";
    products.forEach((p, idx)=>{
      const div = document.createElement("div");
      div.className="grid-item";
      div.innerHTML = `
        <h4>${p.name}</h4>
        <p>R${p.price}</p>
        <p>${p.desc}</p>
        <button data-index="${idx}" class="deleteProductBtn">Delete</button>
      `;
      adminProductsList.appendChild(div);
    });

    document.querySelectorAll(".deleteProductBtn").forEach(btn=>{
      btn.addEventListener("click", e=>{
        const index = e.target.dataset.index;
        products.splice(index,1);
        localStorage.setItem("products", JSON.stringify(products));
        renderProducts();
      });
    });
  }
}

// Admin login
if(adminLoginBtn){
  adminLoginBtn.addEventListener("click", ()=>{
    if(adminPasswordInput.value === adminPassword){
      loginError.textContent="";
      controlPanel.style.display="block";
      loginDiv.style.display="none";
      renderProducts();
    }else{
      loginError.textContent="Incorrect Password";
    }
  });
}

// Add product
if(addProductBtn){
  addProductBtn.addEventListener("click", ()=>{
    if(!productName.value || !productPrice.value || !productImg.value){
      alert("Please fill all required fields");
      return;
    }
    products.push({
      name: productName.value,
      price: Number(productPrice.value),
      desc: productDesc.value || "",
      img: productImg.value
    });
    localStorage.setItem("products", JSON.stringify(products));
    productName.value="";
    productPrice.value="";
    productDesc.value="";
    productImg.value="";
    renderProducts();
  });
}

// Order modal
const orderModal = document.getElementById("orderModal");
const closeOrderModal = document.getElementById("closeOrderModal");
const modalProductName = document.getElementById("modalProductName");
const modalProductPrice = document.getElementById("modalProductPrice");
const modalProductDesc = document.getElementById("modalProductDesc");
const customerName = document.getElementById("customerName");
const paymentMethod = document.getElementById("paymentMethod");
const placeOrderBtn = document.getElementById("placeOrder");

function openOrderModal(product){
  modalProductName.textContent = product.name;
  modalProductPrice.textContent = `R${product.price}`;
  modalProductDesc.textContent = product.desc;
  orderModal.style.display="block";
}

if(closeOrderModal){
  closeOrderModal.onclick = ()=>{
    orderModal.style.display="none";
  };
}

if(placeOrderBtn){
  placeOrderBtn.addEventListener("click", ()=>{
    if(!customerName.value){
      alert("Please enter your name");
      return;
    }
    alert(`Order placed for ${customerName.value} - ${paymentMethod.value}`);
    orderModal.style.display="none";
  });
}

// Initial render
renderProducts();