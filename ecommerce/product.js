const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch("http://127.0.0.1:5000/products")
.then(res => res.json())
.then(data => {

const product = data.find(p => p.id == id);
if(!product){
document.getElementById("product-page").innerHTML = "Product not found";
return;
}

const div = document.getElementById("product-page");

div.innerHTML = `
<div class="product-detail">

<img src="${getProductImage(product.name)}">

<div>

<h1>${product.name}</h1>

<p class="price">₹${product.price}</p>

<p>
Trendy fashion piece perfect for modern styling.
Comfortable fabric and stylish design.
</p>

<button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">
Add to Cart
</button>

</div>

</div>
`;

});

function getProductImage(name){

const n = name.toLowerCase()

if(n.includes("floral"))
return "images/floral_dress.jpg"

if(n.includes("maxi"))
return "images/summer_maxidress.jpg"

if(n.includes("crop"))
return "images/pink_croptop.jpg"

if(n.includes("hoodie"))
return "images/oversized_hoodie.jpg"

if(n.includes("handbag"))
return "images/leather_handbag.jpg"

if(n.includes("shoulder"))
return "images/mini_shoulderbag.jpg"

if(n.includes("necklace"))
return "images/pearl_necklace.jpg"

if(n.includes("scarf"))
return "images/silk_scarf.jpg"

return "images/floral_dress.jpg"

}

function addToCart(id,name,price){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let existing = cart.find(item => item.id === id);

if(existing){
existing.qty += 1;
}
else{
cart.push({id,name,price,qty:1});
}

localStorage.setItem("cart", JSON.stringify(cart));

alert(name + " added to cart");

}