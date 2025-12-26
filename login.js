const loginBtn = document.getElementById("loginBtn");
const createBtn = document.getElementById("createBtn");
const phoneInput = document.getElementById("phone");
const message = document.getElementById("message");

loginBtn.addEventListener("click", () => {
  const phone = phoneInput.value.trim();
  if (!phone) {
    message.textContent = "Please enter your phone number.";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.phone === phone);

  if (user) {
    // Logged in
    localStorage.setItem("currentUser", JSON.stringify(user));
    window.location.href = "products.html"; // redirect to products page
  } else {
    // Phone not found
    if (confirm("Phone number not found. Do you want to create a new account?")) {
      localStorage.setItem("tempPhone", phone);
      window.location.href = "createAccount.html";
    }
  }
});

createBtn.addEventListener("click", () => {
  const phone = phoneInput.value.trim();
  if (!phone) {
    message.textContent = "Please enter your phone number.";
    return;
  }
  localStorage.setItem("tempPhone", phone);
  window.location.href = "createAccount.html";
});