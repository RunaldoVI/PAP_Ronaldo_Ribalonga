const UserID2 = localStorage.getItem("UserIDStore");
const myUserIDStore2 = JSON.parse(UserID2);

async function postGetUser(urlGetUser, data) {
  // Default options are marked with *
  const response = await fetch(urlGetUser, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json();
}

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
  return response.json();
}

async function postDataPassword(url, data) {
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

postGetUser("https://localhost:5001/api/Auth/Users", {
  UserID: myUserIDStore2.UserID,
}).then((data) => {
  console.log(data);

  var Username = document.getElementById("inputUsername");
  Username.value = data.Username;

  var Nome = document.getElementById("inputNome");
  Nome.value = data.Nome;

  var Email = document.getElementById("inputEmail");
  Email.value = data.Email;

  var Password = document.getElementById("inputPassword");
  Password.value = data.Password  

  var Cargo = document.getElementById("inputRole");
  if (data.IsAdmin === true) {
    Cargo.value = "Admin";
  } else {
    Cargo.value = "Estudante";
  }

    document.getElementById("AtualizarPassword").addEventListener("click", () =>{
    Password.readOnly = false;
    Password.style.backgroundColor = "#4BBC8E";

    document.getElementById("AtualizarPassword").addEventListener("click", () =>{

      postDataPassword(
        `https://localhost:5001/api/Auth/UpdateUserPassword`,
        {
          UserID: myUserIDStore2.UserID,
          Password: Password.value,
        }
        );
        location.reload()
      })

  })

  document.getElementById("Atualizar").addEventListener("click", () => {
    Username.readOnly = false;
    Nome.readOnly = false;
    Email.readOnly = false;

    Username.style.backgroundColor = "#4BBC8E";
    Nome.style.backgroundColor = "#4BBC8E";
    Email.style.backgroundColor = "#4BBC8E";

    var confirmar = document.getElementById("Confirmar");

    confirmar.style.display = "block";


    confirmar.addEventListener("click", () => {
       if(data.IsAdmin === true)
       {
         putData(
           `https://localhost:5001/api/Auth/UpdateUser${myUserIDStore2.UserID}`,
           {
             Username: Username.value,
             Nome: Nome.value,
             Email: Email.value,
             IsAdmin: true
           }
         );
       }
       else{
        putData(
          `https://localhost:5001/api/Auth/UpdateUser${myUserIDStore2.UserID}`,
          {
            Username: Username.value,
            Nome: Nome.value,
            Email: Email.value,
            IsAdmin: false
          }
        );
       }
    });
  });
});
