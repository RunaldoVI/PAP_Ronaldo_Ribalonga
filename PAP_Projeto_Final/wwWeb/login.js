const formLogin = document.getElementById("loginForm");
const usernameInputLogin = document.getElementById("loginUsername");
const passwordInputLogin = document.getElementById("loginPassword");



// Example POST method implementation:
async function postData(url, data) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  }).then(){
   
}



formLogin.addEventListener("submit", (ev) => {
  ev.preventDefault();
  postData("https://localhost:5001/api/auth/login", {
    Username: usernameInputLogin.value,
    Password: passwordInputLogin.value,
  }).then((data) => {
            
    console.log(data)
    window.open("http://www.google.com")

         
  });
});


/*
if(response.status == 404)
{
  console.log("User ou Password Incorretos")
}
else if(response.status == 200){
  return response.json(); // parses JSON response into native JavaScript objects
}
else{
  console.log("Erro")
}
*/