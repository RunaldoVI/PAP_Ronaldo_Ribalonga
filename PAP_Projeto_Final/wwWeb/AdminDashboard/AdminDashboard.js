const UserID2 = localStorage.getItem("UserIDStore");
const myUserIDStore2 = JSON.parse(UserID2);
const searchBar = document.getElementById("searchBox")

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

async function postAdminGDetalhes(url, data) {
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
postData("https://localhost:5001/api/Auth/Users", {
  UserID: myUserIDStore2.UserID
}
).then((data)=> {
  if(data.IsAdmin === true){

    document.getElementById("AdminTitle").innerText = data.Nome
    
  }
  else{
  }
})



getAdminDetalhes("https://localhost:5001/api/Auth/AdminQuestionario", {}).then(
  (data) => {

    const tbodyEl = document.getElementById("tabela");
    for (let i = 0; i < data.length; i++) {
      var Classificacao = 0;
      Classificacao += data[i].Classificacao
      tbodyEl.innerHTML += `
          <tr id="content">
          <td id="User${data[i].UserID}QID${
        data[i].QuestionarioID
      }" scope="row">${data[i].UserID}</td>
          <td>${data[i].Nome}</td>
          <td>${data[i].Descricao}</td>
          <td>${data[i].Data}</td>
          <td>${Classificacao.toFixed(2)}%</td>
          <td><button id="Button" type="button"  data-toggle="modal" data-target="#exampleModalCenter" class="btn btn-outline-dark">Ver Detalhes</button></td>
          </td>
          </tr>
          `;
    }


    var table = document.getElementById("tabela"),rIndex;
    for (var a = 0; a < table.rows.length; a++) {
      table.rows[a].onclick = function () {
        
        rIndex = this.rowIndex;
        var moment = data[this.rowIndex - 1]
        
        
            postAdminGDetalhes("https://localhost:5001/api/Auth/GPerguntasDetalhes", {
                UserID: moment.UserID,
                QuestionarioID: moment.QuestionarioID,
              }).then((data) => {
                document.getElementById("exampleModalLongTitle").innerHTML =
                  data[0].Descricao;
                  var container = document.getElementById("AdminPerguntasContainer");
                  container.innerText = "";
                  for (let i = 0; i < data.length; i++) {
                    container.innerHTML += '<br> <p class="try m-0" id="GPergunta'+i+'">'+data[i].GDescricao +'</p>'
                    var total = 0
                    total += data[i].Valor / 16 * 100
                    container.innerHTML += '<div class="progress"> <div id="Number'+i+'" class="progress-bar" style="width:'+total+'%;" role="progressbar" aria-valuenow="' + total +'" aria-valuemin="0" aria-valuemax="100">'+total +"%</div>" 
                    var teste = document.getElementById("Number"+i).innerText
                    testeInt = parseInt(teste.slice(0,teste.length -1))
                    if(testeInt >= 0 && testeInt <= 49)
                    {
                      document.getElementById("Number"+i).style.backgroundColor = "#D3212C";
                    }
                    else if(testeInt >= 50 && testeInt <= 74)
                    {
                      document.getElementById("Number"+i).style.backgroundColor = "#FF980E";
                    }
                    else if(testeInt >= 75 && testeInt <= 100)
                    {
                      document.getElementById("Number"+i).style.backgroundColor = "#069C56";
                    }
          
                  }
          
              });
              
              
      };
    }

    

  }
  );




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
