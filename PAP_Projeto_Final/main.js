const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

const form = {
    username: document.querySelector("UsernameID"),
    password: document.querySelector("PasswordID"),
    submit: document.querySelector("LoginBtn"),
  };
  let button = form.submit.addEventListener("click", (e) => {
    e.preventDefault();
    const login = "https://localhost:5001/api/auth/login/";
  
    fetch(login, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: form.username.value,
        password: form.password.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // code here //
        if (data.error) {
          alert("Error Password or Username"); /*displays error message*/
        } else {
          window.open(
            "target.html"
          ); /*opens the target page while Id & password matches*/
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  document.getElementById("LoginBtn").addEventListener("click",button)

