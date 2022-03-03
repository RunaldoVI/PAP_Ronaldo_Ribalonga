const formLogin = document.getElementById("loginForm");
const usernameInputLogin = document.getElementById("loginUsername");
const passwordInputLogin = document.getElementById("loginPassword");
const PopUpContainer = document.getElementById('PopUp-container');
const loginUser = document.getElementById("loginUser");
const loginPass = document.getElementById("loginPass");


function colorReed() {

  loginUser.style.borderColor = "#e40c3e";
  loginPass.style.borderColor = "#e40c3e";
  
}

function colorGreeen() {

  loginUser.style.borderColor = "#38d39f";
  loginPass.style.borderColor = "#38d39f";

}



//Example POST method implementation:
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
  return response.json();
}


formLogin.addEventListener("submit", (ev) => {
  ev.preventDefault();
    postData("https://localhost:5001/api/auth/login", {
      Username: usernameInputLogin.value,
      Password: passwordInputLogin.value,
    }
    ).then((data) => {
      
      console.log(data);

      if(data.status === 404)
      { 
       ValidationPopUp('error', '<i class="fas fa-exclamation-circle"></i> <b>Password Ou Username Errados!</b>', 2000);
       colorReed();
       usernameInputLogin.value = "";
       passwordInputLogin.value = "";
       
      }
      else
      {
        colorGreeen();
        ValidationPopUp('success', `

         <i class="fas fa-check-circle"></i>
         <b>Login Bem Sucedido</b> 
         <p></p> 
         <b> Bem Vindo de Volta ${usernameInputLogin.value} </b>`, 2000);  
        setTimeout(() => {       
          window.location.replace('Site.html');             
        }, 2000);
        
      }          
    });
});

function ValidationPopUp(type, msg, time){
  const para = document.createElement('P');
  para.classList.add('snackbar');
  para.innerHTML = `${msg}`;

  if(type === 'error'){
      para.classList.add('error');
  }
  else if(type === 'success' ){
      para.classList.add('success');
  }

  PopUpContainer.appendChild(para);
  para.classList.add('fadeout');

  setTimeout(()=>{
          PopUpContainer.removeChild(para)
  }, time)

}
