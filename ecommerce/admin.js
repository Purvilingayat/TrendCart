const admin = JSON.parse(localStorage.getItem("admin"));

if(!admin){
alert("Admin login required");
window.location.href="admin-login.html";
}

function addProduct(){

const name = document.getElementById("name").value
const price = document.getElementById("price").value
const category = document.getElementById("category").value

fetch("http://127.0.0.1:5000/add-product",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
name,price,category
})

})
.then(res=>res.json())
.then(data=>{
alert("Product added")
location.reload()
})

}

fetch("http://127.0.0.1:5000/products")
.then(res=>res.json())
.then(data=>{

const div = document.getElementById("admin-products")

data.forEach(p=>{

const card = document.createElement("div")

card.classList.add("card")

card.innerHTML=`
<h3>${p.name}</h3>
<p>₹${p.price}</p>
`

div.appendChild(card)

})

})