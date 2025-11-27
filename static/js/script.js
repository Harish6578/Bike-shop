const fake_products = [
    {
        id: 1,
        title: 'RS 200',
        price: 184000,
        mrp:184000,
        img: 'rs200.jpeg'
    },
    {
        id: 2,
        title: 'Plstina',
        price: 119000,
        mrp:115000,
        img: 'platina.jpeg'
    },
    {
        id: 3,
        title: 'NS200',
        price: 24000,
        mrp:25000,
        img: 'ns200.jpeg'
    },
    {
        id: 4,
        title: 'CT 100',
        price: 14000,
        mrp: 15000,
        img: 'ct100.jpeg'
    },
    {
        id: 5,
        title: 'Dominor 400',
        price: 2000,
        mrp:350000,
        img: 'Dominor.jpeg'
    },
    {
        id: 6,
        title: 'Pulsar',
        price: 1000,
        mrp:1000,
        img: 'pulsar.jpeg'
    },
    {
        id: 7,
        title: 'Discovery',
        price: 64000,
        mrp:68000,
        img: 'dis.jpeg'
    },
    {
        id: 8,
        title: 'Boxer 100',
        price: 400,
        mrp: 400,
        img: 'box.jpeg'
    },
    {
        id: 9,
        title: 'NS 400',
        price: 150,
        mrp: 150,
        img: 'ns400.jpeg'
    },
    {
        id: 10,
        title: 'Advenchar',
        price: 111000,
        mrp: 100200,
        img: 'bajaj adv.jpeg'
    },
    
    {
        id: 11,
        title: 'Chetak',
        price: 400,
        mrp: 300,
        img: 'chetak.jpeg'
    },
    {
        id: 12,
        title: 'Pulsar 220',
        price: 400,
        mrp: 1200,
        img: '220.jpeg'
    },
    {
        id: 13,
        title: 'Bajaj scooter',
        price: 240,
        mrp: 240,
        img: 'baj.jpeg'
    },
    {
        id: 14,
        title: 'Auto',
        price: 450,
        mrp: 500,
        img: 'auto.jpeg'
    },
    {
        id: 15,
        title: 'V-10',
        price: 200,
        mrp: 200,
        img: 'v10.jpg'
    },
    {
        id: 16,
        title: 'Freedom 125',
        price: 40,
        mrp: 50,
        img: '125.avif'
    },
   
]


// === render + cart logic ===

const products_container = document.querySelector('.products');

// render single card (note: image uses class 'product-image' not duplicate id)
function renderCard(product) {
    const price_markup = (product.mrp !== product.price)
        ? ` <p>Rs. <del style="color:grey">${product.mrp}</del> ${product.price}</p> `
        : `<p>Rs. ${product.price}</p>`;

    return `
      <div class="col col-6 col-lg-2 col-md-4 col-sm-6 g-3" id="product-${product.id}">
        <div class="card">
          <img src="image/${product.img}" class="card-img-top w-100 bike product-image" alt="${product.title}">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            ${price_markup}
            <button class="btn btn-primary add-to-cart" data-id="${product.id}" type="button">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
}

function renderProducts(products){
    let result = "";
    for (const product of products) {
       result += renderCard(product);
    }
    products_container.innerHTML = result;
}

// initialize
renderProducts(fake_products);

// ===== Cart state (persisted) =====
const cart = JSON.parse(localStorage.getItem('cart') || '[]');

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + (item.qty || 0), 0);
  // try to find an existing badge
  let badge = document.getElementById('cart-count-badge');
  if (!badge) {
    // if you have a navbar or cart icon, append the badge there (fallback: body top-right)
    const nav = document.querySelector('.navbar') || document.body;
    badge = document.createElement('span');
    badge.id = 'cart-count-badge';
    badge.style.cssText = 'display:inline-block; min-width:22px; padding:2px 7px; background:#ff3c00; color:#fff; border-radius:12px; font-weight:600; margin-left:10px; font-size:13px;';
    // append after navbar-brand if present
    const brand = nav.querySelector('.navbar-brand');
    if (brand) brand.insertAdjacentElement('afterend', badge);
    else nav.appendChild(badge);
  }
  badge.textContent = count;
}

// call once on load
updateCartCount();

// ===== Event delegation for Add to Cart + image hover handling =====
products_container.addEventListener('click', (e) => {
  const btn = e.target.closest('.add-to-cart');
  if (!btn) return;

  const id = parseInt(btn.dataset.id, 10);
  if (Number.isNaN(id)) return;

  const product = fake_products.find(p => p.id === id);
  if (!product) return;

  // add/increment in cart
  const existing = cart.find(ci => ci.id === id);
  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({ id: product.id, title: product.title, price: product.price, qty: 1 });
  }

  saveCart();
  updateCartCount();

  // small feedback on button
  const originalText = btn.textContent;
  btn.textContent = 'Added ✓';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = originalText;
    btn.disabled = false;
  }, 800);
});

// optional: image hover class toggling (if you want to animate via CSS)
products_container.addEventListener('mouseover', (e) => {
  if (e.target.matches('.product-image')) {
    e.target.classList.add('product-image-hover');
  }
});
products_container.addEventListener('mouseout', (e) => {
  if (e.target.matches('.product-image')) {
    e.target.classList.remove('product-image-hover');
  }
});
