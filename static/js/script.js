// =====================
// PRODUCTS DATA (AS-IS)
// =====================
const fake_products = [
  { id: 1, title: 'RS 200', price: 184000, mrp: 184000, img: 'rs200.jpeg' },
  { id: 2, title: 'Platina', price: 119000, mrp: 115000, img: 'platina.jpeg' },
  { id: 3, title: 'NS200', price: 24000, mrp: 25000, img: 'ns200.jpeg' },
  { id: 4, title: 'CT 100', price: 14000, mrp: 15000, img: 'ct100.jpeg' },
  { id: 5, title: 'Dominor 400', price: 2000, mrp: 350000, img: 'Dominor.jpeg' },
  { id: 6, title: 'Pulsar', price: 1000, mrp: 1000, img: 'pulsar.jpeg' },
  { id: 7, title: 'Discovery', price: 64000, mrp: 68000, img: 'dis.jpeg' },
  { id: 8, title: 'Boxer 100', price: 400, mrp: 400, img: 'box.jpeg' },
  { id: 9, title: 'NS 400', price: 150, mrp: 150, img: 'ns400.jpeg' },
  { id: 10, title: 'Adventure', price: 111000, mrp: 100200, img: 'bajaj adv.jpeg' },
  { id: 11, title: 'Chetak', price: 400, mrp: 300, img: 'chetak.jpeg' },
  { id: 12, title: 'Pulsar 220', price: 400, mrp: 1200, img: '220.jpeg' },
  { id: 13, title: 'Bajaj Scooter', price: 240, mrp: 240, img: 'baj.jpeg' },
  { id: 14, title: 'Auto', price: 450, mrp: 500, img: 'auto.jpeg' },
  { id: 15, title: 'V-10', price: 200, mrp: 200, img: 'v10.jpg' },
  { id: 16, title: 'Freedom 125', price: 40, mrp: 50, img: '125.avif' }
];

// =====================
// DOM ELEMENTS
// =====================
const products_container = document.querySelector('.products');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotalEl = document.getElementById('cart-total');
const clearCartBtn = document.getElementById('clear-cart');

// =====================
// RENDER PRODUCTS
// =====================
function renderCard(product) {
  const priceMarkup =
    product.price !== product.mrp
      ? `<p>₹ <del style="color:grey">${product.mrp}</del> ${product.price}</p>`
      : `<p>₹ ${product.price}</p>`;

  return `
    <div class="col col-6 col-lg-2 col-md-4 col-sm-6 g-3">
      <div class="card h-100">
        <img src="image/${product.img}" class="product-image card-img-top" alt="${product.title}">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          ${priceMarkup}
          <button class="btn btn-primary add-to-cart" data-id="${product.id}">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderProducts(products) {
  if (!products_container) return;
  products_container.innerHTML = products.map(renderCard).join("");
}

renderProducts(fake_products);

// =====================
// CART STORAGE
// =====================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// =====================
// CART COUNT BADGE
// =====================
function updateCartCount() {
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  let badge = document.getElementById("cart-count-badge");
  if (!badge) {
    badge = document.createElement("span");
    badge.id = "cart-count-badge";
    badge.style.cssText =
      "background:red;color:white;padding:2px 6px;border-radius:50%;font-size:12px;margin-left:5px;";
    document.body.appendChild(badge);
  }
  badge.textContent = totalQty;
}

// =====================
// CART OPERATIONS
// =====================
function addToCart(product) {
  const item = cart.find(i => i.id === product.id);
  if (item) {
    item.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
  updateCartCount();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  updateCartCount();
  renderCart();
}

function changeQty(id, change) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.qty += change;
  if (item.qty <= 0) {
    removeFromCart(id);
  } else {
    saveCart();
    updateCartCount();
    renderCart();
  }
}

function clearCart() {
  cart = [];
  saveCart();
  updateCartCount();
  renderCart();
}

// =====================
// RENDER CART UI
// =====================
function renderCart() {
  if (!cartItemsContainer) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p>Your cart is empty.</p>`;
    cartTotalEl.textContent = "0";
    return;
  }

  cartItemsContainer.innerHTML = cart.map(item => `
    <div class="cart-row d-flex justify-content-between align-items-center mb-2">
      <div>
        <strong>${item.title}</strong><br>
        ₹${item.price} x ${item.qty} = ₹${item.price * item.qty}
      </div>
      <div>
        <button class="btn btn-sm btn-secondary qty-minus" data-id="${item.id}">-</button>
        <span class="mx-2">${item.qty}</span>
        <button class="btn btn-sm btn-secondary qty-plus" data-id="${item.id}">+</button>
        <button class="btn btn-sm btn-danger remove-item" data-id="${item.id}">Remove</button>
      </div>
    </div>
  `).join("");

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  cartTotalEl.textContent = total;
}

// =====================
// EVENT LISTENERS
// =====================
products_container.addEventListener("click", e => {
  if (e.target.classList.contains("add-to-cart")) {
    const id = Number(e.target.dataset.id);
    const product = fake_products.find(p => p.id === id);
    addToCart(product);
  }
});

cartItemsContainer.addEventListener("click", e => {
  const id = Number(e.target.dataset.id);
  if (e.target.classList.contains("remove-item")) removeFromCart(id);
  if (e.target.classList.contains("qty-minus")) changeQty(id, -1);
  if (e.target.classList.contains("qty-plus")) changeQty(id, 1);
});

clearCartBtn && clearCartBtn.addEventListener("click", clearCart);

// =====================
// INITIAL LOAD
// =====================
updateCartCount();
renderCart();
