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

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const div = document.getElementById("wishlist-items");

wishlist.forEach((item,index)=>{

const card = document.createElement("div")

card.classList.add("card")

card.innerHTML = `
<img class="product-img" src="${getProductImage(item.name)}">

<h3>${item.name}</h3>

<p class="price">₹${item.price}</p>

<button onclick="addToCart(${item.id}, '${item.name}', ${item.price})">
Add to Cart
</button>

<button onclick="removeWishlist(${index})">Remove</button>
`

div.appendChild(card)

})

function removeWishlist(index){

wishlist.splice(index,1)

localStorage.setItem("wishlist",JSON.stringify(wishlist))

location.reload()

}