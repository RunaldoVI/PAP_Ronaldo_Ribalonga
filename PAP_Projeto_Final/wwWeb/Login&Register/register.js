const formRegisto = document.getElementById("registoForm");
const registoInputUsername = document.getElementById("registoUsername");
const registoInputPassword = document.getElementById("registoPassword");
const registoInputNome = document.getElementById("registoNome");
const registoInputEmail = document.getElementById("registoEmail");
const contain = document.querySelector(".container");
const registoUser = document.getElementById("registoUserna");
const registoNom = document.getElementById("registoNom");
const registoEma = document.getElementById("registoEma");
const registoPass = document.getElementById("registoPass");

function clear() {

  registoInputEmail.value = "";
  registoInputNome.value = "";
  registoInputUsername.value = "";
  registoInputPassword.value = "";

}
function colorRed() {

  registoUser.style.borderColor = "#e40c3e";
  registoNom.style.borderColor = "#e40c3e";
  registoEma.style.borderColor = "#e40c3e";
  registoPass.style.borderColor = "#e40c3e";
  
}

function colorGreen() {

  registoUser.style.borderColor = "#38d39f";
  registoNom.style.borderColor = "#38d39f";
  registoEma.style.borderColor = "#38d39f";
  registoPass.style.borderColor = "#38d39f";

}

function clearColor() {

  registoUser.style.borderColor = "#CCC";
  registoNom.style.borderColor = "#CCC";
  registoEma.style.borderColor = "#CCC";
  registoPass.style.borderColor = "#CCC";

}

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
    console.log(data);
    
    if(data.status === 404)
    {
      

      ValidationPopUp('error', '<i class="fas fa-exclamation-circle"></i> <b>Username,Nome Ou Email já está em uso!</b>', 2000);
      colorRed();
      clear();
      

    }
    else{
      ValidationPopUp('success', `

         <i class="fas fa-check-circle"></i>
         <b>Registo Bem Sucedido</b> 
         <p></p> 
         <b> Bem Vindo ${registoInputUsername.value} </b>`, 2000);
         colorGreen();
         setTimeout(() => {       
          contain.classList.remove("sign-up-mode");      
        }, 1800);          
         setTimeout(() => {
          clear();
          clearColor();
         }, 2800);
          
    }
  });
});
