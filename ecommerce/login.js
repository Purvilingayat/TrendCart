function login(){

const email = document.getElementById("email").value
const password = document.getElementById("password").value

fetch("http://127.0.0.1:5000/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
email,password
})

})
.then(res=>res.json())
.then(user=>{

localStorage.setItem("user",JSON.stringify(user))

alert("Login successful!")

window.location.href="index.html"

})

}