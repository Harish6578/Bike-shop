// keep your fake_products and renderProducts code as-is
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
    { id: 16, title: 'Freedom 125', price: 40, mrp: 50, img: '125.avif' },
];

const products_container = document.querySelector('.products');
const cartItemsContainer = document.querySelector('.cart-items'); // from HTML snippet
const cartTotalEl = document.getElementById('cart-total');
const clearCartBtn = document.getElementById('clear-cart');

// ---------- rendering product cards (your existing function) ----------
function renderCard(product) {
    const priceMarkup =
        product.price !== product.mrp
            ? `<p>₹ <del style="color:grey">${product.mrp}</del> ${product.price}</p>`
            : `<p>₹ ${product.price}</p>`;

    return `
        <div class="col col-6 col-lg-2 col-md-4 col-sm-6 g-3">
            <div class="card">
                <img src="image/${product.img}" class="product-image card-img-top w-100" alt="${product.title}">
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

// ---------- cart storage & helpers ----------
let cart = JSON.parse(localStorage.getItem("cart") || "[]");

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
    const total = cart.reduce((sum, item) => sum + item.qty, 0);

    let badge = document.getElementById("cart-count-badge");

    if (!badge) {
        badge = document.createElement("span");
        badge.id = "cart-count-badge";
        badge.style.cssText =
            "background:red;color:white;padding:2px 6px;border-radius:50%;font-size:12px;font-weight:600;margin-left:5px;";

        const cartIcon = document.querySelector(".nav-link .bi-cart");
        if (cartIcon) cartIcon.after(badge);
    }

    badge.textContent = total;
}

// ---------- cart operations ----------
function addToCart(product) {
    const exists = cart.find(item => item.id === product.id);

    if (exists) {
        exists.qty++;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            qty: 1
        });
    }

    saveCart();
    updateCartCount();
    renderCart(); // update cart UI
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    renderCart();
}

function decreaseQty(productId) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;
    if (item.qty > 1) {
        item.qty--;
    } else {
        // qty is 1, remove item entirely
        cart = cart.filter(i => i.id !== productId);
    }
    saveCart();
    updateCartCount();
    renderCart();
}

function increaseQty(productId) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;
    item.qty++;
    saveCart();
    updateCartCount();
    renderCart();
}

function clearCart() {
    cart = [];
    saveCart();
    updateCartCount();
    renderCart();
}

// ---------- render cart UI ----------
function renderCart() {
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p>Your cart is empty.</p>`;
        cartTotalEl.textContent = "0";
        return;
    }

    const rows = cart.map(item => {
        return `
            <div class="cart-row" data-id="${item.id}" style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid #eee;">
                <div style="flex:1">
                    <strong>${item.title}</strong>
                    <div>₹ ${item.price} x ${item.qty} = ₹ ${item.price * item.qty}</div>
                </div>
                <div style="display:flex;gap:6px;align-items:center">
                    <button class="btn btn-sm btn-secondary decrease-qty" data-id="${item.id}">-</button>
                    <span>${item.qty}</span>
                    <button class="btn btn-sm btn-secondary increase-qty" data-id="${item.id}">+</button>
                    <button class="btn btn-sm btn-danger remove-from-cart" data-id="${item.id}">Remove</button>
                </div>
            </div>
        `;
    }).join("");

    cartItemsContainer.innerHTML = rows;

    const totalAmount = cart.reduce((s, i) => s + i.price * i.qty, 0);
    cartTotalEl.textContent = totalAmount;
}


products_container.addEventListener("click", function (e) {
    if (e.target.classList.contains("add-to-cart")) {
        const id = parseInt(e.target.dataset.id);
        const product = fake_products.find(p => p.id === id);
        if (product) addToCart(product);
    }
});


cartItemsContainer && cartItemsContainer.addEventListener("click", function (e) {
    const id = e.target.dataset.id ? parseInt(e.target.dataset.id) : null;
    if (!id) return;

    if (e.target.classList.contains("remove-from-cart")) {
        removeFromCart(id);
    } else if (e.target.classList.contains("decrease-qty")) {
        decreaseQty(id);
    } else if (e.target.classList.contains("increase-qty")) {
        increaseQty(id);
    }
});

// clear cart
clearCartBtn && clearCartBtn.addEventListener("click", () => {
    clearCart();
});


// ---------- keep image hover code ----------
products_container.addEventListener("mouseover", (e) => {
    if (e.target.classList.contains("product-image")) {
        e.target.classList.add("product-image-hover");
    }
});
products_container.addEventListener("mouseout", (e) => {
    if (e.target.classList.contains("product-image")) {
        e.target.classList.remove("product-image-hover");
    }
});

// initial render
updateCartCount();
renderCart();
