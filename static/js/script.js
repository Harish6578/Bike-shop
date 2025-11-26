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

const products_container = document.querySelector('.products');

// const container = document.querySelector('.row ')

// products.forEach(product => {
//     const col = document.createElement('div')
//     col.className = 'col-12  col-sm-6 col-md-4 col-lg-3'
//     col.innerHTML = `
//                 <div class="card">
//                             <img src="assests/images/${product.img}" class="card-img-top">
//                             <div class="card-body">
//                                 <h5 class="card-title"> ${product.title} </h5>
//                                 <strong>
//                                   <p style="color: black;"> <small><span style="text-decoration: line-through; color:red">Rs:100000%</span></small><br> RS: ${product.price}</p>
//                                   <p>(50% off)</p>
//                                 </strong>
//                                 <button class=" btn btn-secondary text-light">Add to cart</button>
//                             </div>
//                         </div>
//     `
//     container.appendChild(col);
// });

function renderCard(product) {

    
    let price_markup = (product.mrp != product.price) 
        ?` <p>Rs. <del style="color:grey">${product.mrp}</del> ${product.price}</p> `
        : `<p>Rs. ${product.price}</p>`;

    let card_design = `
         <div class="col col-6 col-lg-2 col-md-4 col-sm-6 g-3" id="product-${product.id}">
          <div class="card">
      <img src="image/${product.img}" class="card-img-top w-100" id="images" alt="...">
      <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
         ${price_markup}
        
        <button class="btn btn-primary" id="add-to-cart-${product.id}">Add to Cart</button>
      </div>
    </div>
    </div>
    `;
    return card_design;

}

function renderProducts(products){
    let result =""
    for(product of products){
       result += renderCard(product);
    }
    products_container.innerHTML = result;
}

renderProducts(fake_products);

const images = document.getElementById('images');

images.addEventListener('mouseover',()=>{
    
})