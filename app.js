const productsContainer = document.getElementById('products');
const adminContainer = document.getElementById('adminProducts');
const adminContent = document.getElementById('adminContent');
const passwordModal = document.getElementById('passwordModal');
const loginAdminBtn = document.getElementById('loginAdmin');
const adminPasswordInput = document.getElementById('adminPassword');

const orderModal = document.getElementById('orderModal');
const closeOrderModal = document.getElementById('closeOrderModal');
const modalProductName = document.getElementById('modalProductName');
const modalProductPrice = document.getElementById('modalProductPrice');
const modalProductDesc = document.getElementById('modalProductDesc');
const customerNameInput = document.getElementById('customerName');
const paymentMethodSelect = document.getElementById('paymentMethod');
const placeOrderBtn = document.getElementById('placeOrder');

let products = JSON.parse(localStorage.getItem('products')) || [];

// --- Functions to display products ---
function renderProducts() {
  if(productsContainer){
    productsContainer.innerHTML = '';
    products.forEach((p, idx) => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>${p.price}</p>
      `;
      card.addEventListener('click', () => openOrderModal(p));
      productsContainer.appendChild(card);
    });
  }

  if(adminContainer){
    adminContainer.innerHTML = '';
    products.forEach((p, idx) => {
      const card = document.createElement('div');
      card.className = 'product-card admin';
      card.innerHTML = `
        <h3>${p.name}</h3>
        <p>${p.price}</p>
        <p>${p.desc}</p>
        <button class="edit" data-id="${idx}">Edit</button>
        <button class="delete" data-id="${idx}">Delete</button>
      `;
      adminContainer.appendChild(card);
    });
    document.querySelectorAll('.delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        products.splice(id, 1);
        saveAndRender();
      });
    });
    document.querySelectorAll('.edit').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const p = products[id];
        document.getElementById('productName').value = p.name;
        document.getElementById('productDesc').value = p.desc;
        document.getElementById('productPrice').value = p.price;
        document.getElementById('productImg').value = p.img;
        products.splice(id, 1);
        saveAndRender();
      });
    });
  }
}

// --- Admin Password Login ---
if(loginAdminBtn){
  loginAdminBtn.addEventListener('click', () => {
    if(adminPasswordInput.value === 'admin123'){
      passwordModal.style.display = 'none';
      adminContent.style.display = 'block';
    } else {
      alert('Wrong Password');
    }
  });
}

// --- Add Product ---
const addProductBtn = document.getElementById('addProduct');
if(addProductBtn){
  addProductBtn.addEventListener('click', () => {
    const name = document.getElementById('productName').value;
    const desc = document.getElementById('productDesc').value;
    const price = document.getElementById('productPrice').value;
    const img = document.getElementById('productImg').value;
    if(name && desc && price && img){
      products.push({name, desc, price, img});
      saveAndRender();
      document.getElementById('productName').value = '';
      document.getElementById('productDesc').value = '';
      document.getElementById('productPrice').value = '';
      document.getElementById('productImg').value = '';
    } else alert('Fill all fields!');
  });
}

// --- Save and Render ---
function saveAndRender(){
  localStorage.setItem('products', JSON.stringify(products));
  renderProducts();
}

// --- Order Modal ---
function openOrderModal(p){
  modalProductName.innerText = p.name;
  modalProductPrice.innerText = p.price;
  modalProductDesc.innerText = p.desc;
  orderModal.style.display = 'block';
}

if(closeOrderModal){
  closeOrderModal.onclick = () => { orderModal.style.display = 'none'; };
}

if(placeOrderBtn){
  placeOrderBtn.addEventListener('click', () => {
    const customerName = customerNameInput.value;
    const payment = paymentMethodSelect.value;
    if(!customerName) return alert('Enter your name');
    alert(`Order placed!\nName: ${customerName}\nProduct: ${modalProductName.innerText}\nPrice: ${modalProductPrice.innerText}\nPayment: ${payment}`);
    orderModal.style.display = 'none';
    customerNameInput.value = '';
  });
}

// --- Initial Render ---
renderProducts();