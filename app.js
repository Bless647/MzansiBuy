// Selectors
const adminPasswordInput = document.getElementById('adminPassword');
const loginBtn = document.getElementById('loginBtn');
const loginError = document.getElementById('loginError');
const loginSection = document.getElementById('loginSection');
const adminSection = document.getElementById('adminSection');

const productNameInput = document.getElementById('productName');
const productPriceInput = document.getElementById('productPrice');
const productDescInput = document.getElementById('productDesc');
const productImageInput = document.getElementById('productImage');
const addProductBtn = document.getElementById('addProductBtn');
const adminProductsDiv = document.getElementById('adminProducts');

const productsDiv = document.getElementById('products');
const productModal = document.getElementById('productModal');
const closeModal = document.getElementById('closeModal');
const modalName = document.getElementById('modalName');
const modalPrice = document.getElementById('modalPrice');
const modalDesc = document.getElementById('modalDesc');
const modalImage = document.getElementById('modalImage');

let products = JSON.parse(localStorage.getItem('products')) || [];

// Admin login
loginBtn.addEventListener('click', () => {
  if(adminPasswordInput.value === 'admin123'){
    loginSection.style.display = 'none';
    adminSection.style.display = 'block';
    displayAdminProducts();
  } else {
    loginError.textContent = 'Incorrect password!';
  }
});

// Add product
addProductBtn.addEventListener('click', () => {
  const name = productNameInput.value.trim();
  const price = parseFloat(productPriceInput.value);
  const desc = productDescInput.value.trim();
  const imageFile = productImageInput.files[0];

  if(!name || !price || !desc || !imageFile){
    alert('Please fill all fields and select an image.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e){
    const imageURL = e.target.result;
    products.push({name, price, desc, imageURL});
    localStorage.setItem('products', JSON.stringify(products));
    displayAdminProducts();
    displayIndexProducts();
    // Clear inputs
    productNameInput.value = '';
    productPriceInput.value = '';
    productDescInput.value = '';
    productImageInput.value = '';
  };
  reader.readAsDataURL(imageFile);
});

// Display admin products
function displayAdminProducts(){
  adminProductsDiv.innerHTML = '';
  products.forEach((product, index)=>{
    const div = document.createElement('div');
    div.className = 'productCard';
    div.innerHTML = `
      <img src="${product.imageURL}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.price}</p>
      <p>${product.desc}</p>
      <button onclick="deleteProduct(${index})">Delete</button>
    `;
    adminProductsDiv.appendChild(div);
  });
}

// Delete product
window.deleteProduct = function(index){
  if(confirm('Are you sure you want to delete this product?')){
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    displayAdminProducts();
    displayIndexProducts();
  }
};

// Display index products
function displayIndexProducts(){
  if(!productsDiv) return;
  productsDiv.innerHTML = '';
  products.forEach((product, index)=>{
    const div = document.createElement('div');
    div.className = 'productCard';
    div.innerHTML = `
      <img src="${product.imageURL}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.price}</p>
    `;
    div.addEventListener('click', () => {
      modalName.textContent = product.name;
      modalPrice.textContent = product.price;
      modalDesc.textContent = product.desc;
      modalImage.src = product.imageURL;
      productModal.style.display = 'block';
    });
    productsDiv.appendChild(div);
  });
}

// Close modal
closeModal.addEventListener('click', ()=> productModal.style.display = 'none');
window.onclick = function(event){
  if(event.target == productModal) productModal.style.display = 'none';
};

// Initial display
displayIndexProducts();