const products = [
  { id: 1, name: "Pizza", price: 50, img: "https://via.placeholder.com/150" },
  { id: 2, name: "Burger", price: 40, img: "https://via.placeholder.com/150" }
];

const grid = document.getElementById("products");
const modal = document.getElementById("orderModal");
let selectedProduct = null;

products.forEach(p => {
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `
    <img src="${p.img}">
    <h4>${p.name}</h4>
    <p>R${p.price}</p>
  `;
  div.onclick = () => openModal(p);
  grid.appendChild(div);
});

function openModal(p) {
  selectedProduct = p;
  document.getElementById("orderProduct").innerText = p.name;
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}

document.getElementById("confirmOrder").onclick = () => {
  const name = document.getElementById("customerName").value;
  const payment = document.getElementById("payment").value;

  if (!name) return alert("Enter name");

  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  orders.push({ product: selectedProduct.name, name, payment });
  localStorage.setItem("orders", JSON.stringify(orders));

  alert("Order placed");
  closeModal();
};