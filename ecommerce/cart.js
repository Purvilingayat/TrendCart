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
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartItems = document.getElementById("cart-items");
const totalDiv = document.getElementById("total");

let total = 0;

cart.forEach((item,index)=>{

const div = document.createElement("div");
div.classList.add("card");

if(!item.qty){
item.qty = 1;
}

const subtotal = item.price * item.qty;

div.innerHTML = `
<img class="product-img" src="${getProductImage(item.name)}">

<div class="info">
<h3>${item.name}</h3>

<p class="price">₹${item.price}</p>

<div class="qty">

<button onclick="decreaseQty(${index})">-</button>

<span>${item.qty}</span>

<button onclick="increaseQty(${index})">+</button>

</div>

<p>Subtotal: ₹${subtotal}</p>

<button onclick="removeItem(${index})">Remove</button>
</div>
`;

cartItems.appendChild(div);

total += subtotal;

});

totalDiv.innerHTML = "Total: ₹" + total;

function removeItem(index){
    cart.splice(index,1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

function clearCart() {
    localStorage.removeItem("cart");
    location.reload();
}

function decreaseQty(index){

if(cart[index].qty > 1){
cart[index].qty -= 1;
}
else{
cart.splice(index,1);
}

localStorage.setItem("cart", JSON.stringify(cart));

location.reload();
}
document.getElementById("item-count").innerText = cart.length;

document.getElementById("final-total").innerText = "₹" + total;