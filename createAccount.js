const createAccountBtn = document.getElementById("createAccountBtn");
const backBtn = document.getElementById("backBtn");
const phoneInput = document.getElementById("phone");
const nameInput = document.getElementById("name");
const message = document.getElementById("message");

// Pre-fill phone if coming from login
const tempPhone = localStorage.getItem("tempPhone");
if (tempPhone) {
  phoneInput.value = tempPhone;
}

createAccountBtn.addEventListener("click", () => {
  const phone = phoneInput.value.trim();
  const name = nameInput.value.trim();

  if (!phone) {
    message.textContent = "Phone number is required.";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const exists = users.find(u => u.phone === phone);
  if (exists) {
    message.textContent = "Phone number already exists. Please login.";
    return;
  }

  const newUser = { phone, name, createdAt: new Date().toISOString() };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", JSON.stringify(newUser));
  localStorage.removeItem("tempPhone");

  window.location.href = "products.html"; // redirect to products
});

backBtn.addEventListener("click", () => {
  window.location.href = "login.html";
});