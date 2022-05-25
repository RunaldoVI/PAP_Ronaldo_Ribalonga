
const UserID2 = localStorage.getItem("UserIDStore");
const myUserIDStore2 = JSON.parse(UserID2);




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
postData("https://localhost:5001/Api/Auth/Users", {
    UserID: myUserIDStore2.UserID
}
).then((data)=> {
  

    document.getElementById("Username").innerHTML = data.Username;
    document.getElementById("Nome").innerHTML = data.Nome;
    document.getElementById("Email").innerHTML = data.Email;
    
})




document.getElementById("buttonReplaceUsername").onclick = function replaceUsername(){

 document.getElementById('buttonUsername').type = 'button';
 document.getElementById("buttonReplaceUsername").type = 'hidden';

 
 var getUsername = document.getElementById('Username'); 
 var changeTag = document.createElement('input');
 
 changeTag.setAttribute('value',getUsername.innerHTML);
 changeTag.setAttribute('id','inputUsername');

getUsername.parentNode.replaceChild(changeTag,getUsername);
  


document.getElementById('buttonUsername').onclick = function saveUsername(){
  
  const UsernameInput = document.getElementById("inputUsername").value

    
    async function putData(url, data) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      return response;
    } 
    putData(`https://localhost:5001/api/Auth/User${myUserIDStore2.UserID}`, {
        Username: UsernameInput,
      })

     document.getElementById('buttonUsername').type = 'hidden';
     document.getElementById("buttonReplaceUsername").type = 'button';
     location.reload();
  

  }
  
}



document.getElementById("buttonReplaceNome").onclick = function replaceNome(){

  document.getElementById('buttonNome').type = 'button';
  document.getElementById("buttonReplaceNome").type = 'hidden';
 
  
  var getNome = document.getElementById('Nome'); 
  var changeTag = document.createElement('input');
  
  changeTag.setAttribute('value',getNome.innerHTML);
  changeTag.setAttribute('id','inputNome');
 
 getNome.parentNode.replaceChild(changeTag,getNome);
}


document.getElementById('buttonNome').onclick = function saveNome(){
  
  const NomeInput = document.getElementById("inputNome").value

    
    async function putData(url, data) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      return response;
    } 
    putData(`https://localhost:5001/api/Auth/Nome${myUserIDStore2.UserID}`, {
        Nome: NomeInput,
      })

     document.getElementById('buttonNome').type = 'hidden';
     document.getElementById("buttonReplaceNome").type = 'button';
     location.reload();
  

  }
  
  document.getElementById("buttonReplaceEmail").onclick = function replaceEmail(){

    document.getElementById('buttonEmail').type = 'button';
    document.getElementById("buttonReplaceEmail").type = 'hidden';
   
    
    var getEmail = document.getElementById('Email'); 
    var changeTag = document.createElement('input');
    
    changeTag.setAttribute('value',getEmail.innerHTML);
    changeTag.setAttribute('id','inputEmail');
   
   getEmail.parentNode.replaceChild(changeTag,getEmail);
  }
  
  
  document.getElementById('buttonEmail').onclick = function saveNome(){
    
    const EmailInput = document.getElementById("inputEmail").value
  
      
      async function putData(url, data) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: "PUT", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        return response;
      } 
      putData(`https://localhost:5001/api/Auth/Email${myUserIDStore2.UserID}`, {
          Email: EmailInput,
        })
  
       document.getElementById('buttonEmail').type = 'hidden';
       document.getElementById("buttonReplaceEmail").type = 'button';
       location.reload();
    
  
    }
    
    document.getElementById("buttonReplacePassword").onclick = function replacePassword(){

      document.getElementById('buttonPassword').type = 'button';
      document.getElementById("buttonReplacePassword").type = 'hidden';
     
      
      var getPassword = document.getElementById('Password'); 
      var changeTag = document.createElement('input');
      
      changeTag.setAttribute('type', 'Password');
      changeTag.setAttribute('id','inputPassword');
     
     getPassword.parentNode.replaceChild(changeTag,getPassword);
    }
    
    
    document.getElementById('buttonPassword').onclick = function savePassword(){
      
      const PasswordInput = document.getElementById("inputPassword").value

        
        async function putData(url, data) {
          // Default options are marked with *
          const response = await fetch(url, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
          });
          return response;
        } 
        putData(`https://localhost:5001/api/Auth/Password${myUserIDStore2.UserID}`, {
            Password: PasswordInput,
          })
    
         document.getElementById('buttonPassword').type = 'hidden';
         document.getElementById("buttonReplacePassword").type = 'button';
         location.reload();
      
    
      }

      document.getElementById('btnDeleteUser').onclick = function DeleteUser(){

         let bodyContent = JSON.stringify({
          UserID: myUserIDStore2.UserID
      });
      
      fetch("https://localhost:5001/api/Auth/UserDelete", { 
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: bodyContent
      }).then(function(response) {

        return response.text();

      }).then(function() {

        location.replace('../Login&Register/register.html')
      })
      }
      
