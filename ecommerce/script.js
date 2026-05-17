let allProducts = [];

fetch("http://127.0.0.1:5000/products")
.then(res => res.json())
.then(data => {
    allProducts = data;
    showProducts(data);
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

    return "images/dress1.jpg"
}

function showProducts(products){
    const productDiv = document.getElementById("products");
    productDiv.innerHTML = "";

    products.forEach(product => {
        const item = document.createElement("div")
item.classList.add("card")

        item.innerHTML = `
        <span class="badge">SALE</span>
        <span class="wishlist" onclick="toggleWishlist(${product.id}, '${product.name}', ${product.price})">♡</span>
            <a href="product.html?id=${product.id}">
<img class="product-img" src="${getProductImage(product.name)}">
</a>
            <h3>${product.name}</h3>

<div class="rating">
${getStars()}
</div>

<p class="price">₹${product.price}</p>
            <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">
                Add to Cart
            </button>
        `;

        productDiv.appendChild(item);
    });
}
function toggleWishlist(id,name,price){

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

let existing = wishlist.find(item => item.id === id);

if(existing){

wishlist = wishlist.filter(item => item.id !== id);

showToast("Removed from wishlist")

}else{

wishlist.push({id,name,price});

showToast("Added to wishlist ❤️")

}

localStorage.setItem("wishlist", JSON.stringify(wishlist));

updateWishlistCount();

}

function updateWishlistCount(){

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

let count = wishlist.length;

let el = document.getElementById("wishlist-count");

if(el){
el.innerText = count;
}

}

updateWishlistCount();

function getStars(){

const ratings = [
"⭐ ⭐ ⭐ ⭐ ☆",
"⭐ ⭐ ⭐ ⭐ ⭐",
"⭐ ⭐ ⭐ ☆ ☆",
"⭐ ⭐ ⭐ ⭐ ☆",
"⭐ ⭐ ⭐ ⭐ ⭐"
]

return ratings[Math.floor(Math.random()*ratings.length)]

}

function filterProducts(category){
    if(category === "All"){
        showProducts(allProducts);
        return;
    }

    const filtered = allProducts.filter(p => p.category === category);
    showProducts(filtered);
}
function addToCart(id, name, price) {

let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartCount();
let existing = cart.find(item => item.id === id);

if(existing){
    existing.qty += 1;
}
else{
    cart.push({
        id: id,
        name: name,
        price: price,
        qty: 1
    });
}

localStorage.setItem("cart", JSON.stringify(cart));
showToast(name + " added to cart!");
}
function searchProducts(text){

const filtered = allProducts.filter(p =>
p.name.toLowerCase().includes(text.toLowerCase())
)

showProducts(filtered)

}
function showToast(message){

const toast = document.getElementById("toast");

toast.innerText = message;
toast.classList.add("show");

setTimeout(()=>{
toast.classList.remove("show");
},2000);

}
function updateCartCount(){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let totalItems = 0;

cart.forEach(item=>{
totalItems += item.qty || 1;
});

document.getElementById("cart-count").innerText = totalItems;
}

updateCartCount();
const user = JSON.parse(localStorage.getItem("user"));

if(user){
    document.getElementById("profile-name").innerText = "👤 " + user.name;
}
function logout(){
localStorage.removeItem("user");
localStorage.removeItem("admin");
alert("Logged out");
location.reload();
}