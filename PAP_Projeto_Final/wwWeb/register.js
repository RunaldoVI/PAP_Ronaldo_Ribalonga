const formRegisto = document.getElementById("registoForm");
const registoInputUsername = document.getElementById("registoUsername");
const registoInputPassword = document.getElementById("registoPassword");
const registoInputNome = document.getElementById("registoNome");
const registoInputEmail = document.getElementById("registoEmail");

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
  });
  
  return response.json(); // parses JSON response into native JavaScript objects
}

formRegisto.addEventListener("submit", (ev) => {
  ev.preventDefault();
  postData("https://localhost:5001/api/auth/signup", {
    Username: registoInputUsername.value,
    Password: registoInputPassword.value,
    Nome: registoInputNome.value,
    Email: registoInputEmail.value
  }).then((data) => {
    console.log(data); // JSON data parsed by `data.json()` call
  });
});
