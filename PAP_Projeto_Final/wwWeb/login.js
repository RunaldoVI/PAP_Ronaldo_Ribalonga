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
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

formLogin.addEventListener("submit", (ev) => {
  ev.preventDefault();
  postData("https://localhost:5001/api/auth/login", {
    username: usernameInputLogin.value,
    password: passwordInputLogin.value,
  }).then((data) => {

    window.location.href = "renato.html";
    console.log(data); // JSON data parsed by `data.json()` call

  });
});
