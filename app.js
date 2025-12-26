const products = [
  {
    name: "Smart Watch",
    price: 1299,
    desc: "Modern smart watch",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
  }
];

const grid = document.getElementById("products");
const modal = document.getElementById("modal");

products.forEach(p => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${p.img}">
    <h3>${p.name}</h3>
    <span>R ${p.price}</span>
  `;
  card.onclick = () => openModal(p);
  grid.appendChild(card);
});

function openModal(p){
  modal.style.display = "flex";
  modal.querySelector("#modalImg").src = p.img;
  modal.querySelector("#modalName").textContent = p.name;
  modal.querySelector("#modalDesc").textContent = p.desc;
  modal.querySelector("#modalPrice").textContent = "R " + p.price;
}

document.getElementById("closeModal").onclick = ()=>{
  modal.style.display = "none";
};

document.getElementById("orderBtn").onclick = ()=>{
  const name = document.getElementById("customerName").value;
  const pay = document.getElementById("payment").value;

  if(!name || !pay){
    alert("Please complete all fields");
    return;
  }

  alert("Order ready ✔ (next step: admin orders)");
};