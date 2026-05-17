fetch("http://127.0.0.1:5000/orders")
.then(res => res.json())
.then(data => {

const div = document.getElementById("orders")

data.forEach(order => {

const card = document.createElement("div")
card.classList.add("card")

// convert items string back to JSON
const items = JSON.parse(order.items)

let productList = ""

items.forEach(item=>{
productList += `${item.name} (x${item.qty})<br>`
})

card.innerHTML = `
<h3>Order #${order.id}</h3>
<p><b>Name:</b> ${order.name}</p>
<p><b>Phone:</b> ${order.phone}</p>
<p><b>Address:</b> ${order.address}</p>
<p><b>Items:</b><br>${productList}</p>
<p><b>Total:</b> ₹${order.total}</p>
`

div.appendChild(card)

})

})