  var CardTitle = document.getElementById("card-Title")
  var CardCargo = document.getElementById("card-Cargo")
  var CardTitle1 = document.getElementById("card-Title1")
  var CardCargo1 = document.getElementById("card-Cargo1")
  var CardUsername = document.getElementById("card-Username")
  var CardPassword = document.getElementById("card-Password")
  var CardEmail = document.getElementById("card-Email")
  async function getAdminDetalhes(url) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
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

  async function deleteData(url, Ddata) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(Ddata), // body data type must match "Content-Type" header
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

  getAdminDetalhes("https://localhost:5001/api/Auth/AdminUsers", {}).then(
    (data) => {
  
      const tbodyEl = document.getElementById("tabela");
      for (let i = 0; i < data.length; i++) {
          var Admin = ""
          if(data[i].IsAdmin === true)
          {
               Admin = "Admin"
          }
          else
          {
               Admin = "Estudante"
          }
        tbodyEl.innerHTML += `
            <tr id="content">
            <td>${data[i].Nome}</td>
            <td>${data[i].Username}</td>
            <td>••••••••••</td>
            <td>${data[i].Email}</td>
            <td>${Admin}</td>
            </tr>
            `;
      }
      


      var table = document.getElementById("tabela"),rIndex;
      for (var a = 0; a < table.rows.length; a++) {
          table.rows[a].onclick = function () {
              rIndex = this.rowIndex;
              var moment = data[this.rowIndex - 1]
              var isAdmin = "";
              localStorage.setItem("momentUser",moment.UserID)
              if(moment.IsAdmin === true)
              {
                   isAdmin = "Admin"
              }
              else
              {
                   isAdmin = "Estudante"
              }

              CardTitle.value = moment.Nome
              CardCargo.value = isAdmin
              CardTitle1.value = moment.Nome
              CardCargo1.value = isAdmin
              CardPassword.value = moment.Password
              CardUsername.value = moment.Username
              CardEmail.value = moment.Email

              
              document.getElementById("Apagar").addEventListener("click", () =>{
                document.getElementById("ApagarUtilizador").addEventListener("click", () => {


                  deleteData(
                    `https://localhost:5001/api/Auth/QuestionarioRDelete`,
                    {
                      UserID: moment.UserID
                    }
                  ).then(() => {
                    deleteData(
                        `https://localhost:5001/api/Auth/RespostasUserDelete`,
                        {
                          UserID: moment.UserID
                        }
                      ).then(() => {
                        deleteData(
                            `https://localhost:5001/api/Auth/GPRDelete`,
                            {
                              UserID: moment.UserID
                            }
                          ).then(() => {
                                deleteData(
                                    `https://localhost:5001/api/Auth/UserDelete`,
                                    {
                                      UserID: moment.UserID
                                    }
                                  ).then(() => {
                                      location.reload()
                                  });
                          });
                      });
                  });
              })
              
            })


             
            }
        }

    })  

    document.getElementById("AtualizarPassword").addEventListener("click", () =>{
      CardPassword.readOnly = false;
      var moment =localStorage.getItem("momentUser")
      console.log()
      var moment = parseInt(localStorage.getItem("momentUser"))
      console.log(moment)

      document.getElementById("AtualizarPassword").addEventListener("click", () =>{
  
        postDataPassword(
          `https://localhost:5001/api/Auth/UpdateUserPassword`,
          {
            UserID: moment.UserID,
            Password: CardPassword.value,
          }
          );
          localStorage.removeItem("momentUser")
          location.reload()
        })
      })


    document.getElementById("Editar").addEventListener("click", () => {
      CardTitle1.readOnly = false;
      CardCargo1.readOnly = false;
      CardUsername.readOnly = false;
      CardEmail.readOnly = false;
      var moment = parseInt(localStorage.getItem("momentUser"))
      console.log(moment)
      

      document.getElementById("tabela").style.pointerEvents = "none";
      document.getElementById("Editar").addEventListener("click", () => {

        
          if(CardCargo1.value === "Admin")
          {
            console.log(moment.UserID)
              putData(
                  `https://localhost:5001/api/Auth/UpdateUser${moment}`,
                  {
                    Username: CardUsername.value,
                    Nome: CardTitle1.value,
                    Email: CardEmail.value,
                    IsAdmin: true
                  }
                );
                localStorage.removeItem("momentUser")
                location.reload()
              }
              else{
                  putData(
                      `https://localhost:5001/api/Auth/UpdateUser${moment}`,
                      {
                        Username: CardUsername.value,
                        Nome: CardTitle1.value,
                        Email: CardEmail.value,
                        IsAdmin: false
                      }
                    );
                    localStorage.removeItem("momentUser")
                    location.reload()
              }
              
          })
  })




  function myFunction() {
    var input , filter , tbody , tr , td , i , txtValue;

    input = document.getElementById("searchBox");
    filter = input.value.toLowerCase();
    tbody = document.getElementById("tabela")
    tr = tbody.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++)
    {
      td = tr[i].getElementsByTagName("td")[1];
      txtValue = td.textContent || td.innerText;
      if(txtValue.toLowerCase().indexOf(filter) > -1){
        tr[i].style.display = "";
      }
      else {
        
        tr[i].style.display = "none";
      }
    }
  }

      