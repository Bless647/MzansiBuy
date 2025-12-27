const products = [
  {
    name: "Bluetooth Speaker",
    price: 499,
    image: "https://images.unsplash.com/photo-1585386959984-a4155228fdb1",
    description: "Portable high-quality sound speaker"
  },
  {
    name: "Wireless Headphones",
    price: 899,
    image: "https://images.unsplash.com/photo-1518443881415-1f08dbd7b7ae",
    description: "Noise cancelling headphones"
  },
  {
    name: "Smart Watch",
    price: 1299,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    description: "Track fitness and notifications"
  }
];

const grid = document.getElementById("products");
const modal = document.getElementById("orderModal");

const modalName = document.getElementById("modalProductName");
const modalPrice = document.getElementById("modalProductPrice");
const modalDesc = document.getElementById("modalProductDesc");

document.getElementById("closeOrderModal").onclick = () => {
  modal.classList.add("hidden");
};

products.forEach(product => {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <img src="${product.image}">
    <div class="card-body">
      <h3>${product.name}</h3>
      <p>R ${product.price}</p>
    </div>
  `;

  card.onclick = () => {
    modalName.textContent = product.name;
    modalPrice.textContent = `Price: R ${product.price}`;
    modalDesc.textContent = product.description;
    modal.classList.remove("hidden");
  };

  grid.appendChild(card);
});