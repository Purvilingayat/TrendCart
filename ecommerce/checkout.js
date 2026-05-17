document.getElementById("checkout-form").addEventListener("submit", function(e){

e.preventDefault(); // THIS stops page reload

const name = document.getElementById("name").value;
const phone = document.getElementById("phone").value;
const address = document.getElementById("address").value;

if(!name || !phone || !address){
alert("Please fill all details");
return;
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;

cart.forEach(item=>{
total += item.price * (item.qty || 1);
});

fetch("http://127.0.0.1:5000/place-order",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
name,
phone,
address,
items:JSON.stringify(cart),
total
})
})
.then(res=>res.json())
.then(data=>{

localStorage.removeItem("cart");

window.location.href = "order-success.html";
})
.catch(err=>{
console.error(err);
alert("Order failed");
});

});
function closeModal(){
document.getElementById("order-success").classList.remove("show");
}
const user = JSON.parse(localStorage.getItem("user"));

if(user){
document.getElementById("name").value = user.name;
}