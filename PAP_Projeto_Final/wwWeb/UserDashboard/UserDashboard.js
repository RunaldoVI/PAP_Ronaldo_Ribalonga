document.getElementById("ProfileButton").addEventListener("click", () => {
  window.location.replace("../User/User.html");
});

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
  UserID: myUserIDStore2.UserID,
}).then((data) => {
  document.getElementById("Username").innerHTML = data.Username;
});

async function postDetalhes(url, data) {
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
postDetalhes("https://localhost:5001/api/Auth/QuestionarioDetalhes", {
  UserID: myUserIDStore2.UserID,
}).then((data) => {
  console.log(data);

  document.getElementById("QuestionarioID1").innerHTML = data[0].UserID;
  document.getElementById("UserNome1").innerHTML = data[0].Nome;
  document.getElementById("QuestionarioNome1").innerHTML = data[0].Descricao;
  document.getElementById("QuestionarioData1").innerHTML = data[0].Data;
  document.getElementById("QuestionarioClassificacao1").innerHTML =
    data[0].Classificacao + "%";

  document.getElementById("QuestionarioID2").innerHTML = data[1].UserID;
  document.getElementById("UserNome2").innerHTML = data[1].Nome;
  document.getElementById("QuestionarioNome2").innerHTML = data[1].Descricao;
  document.getElementById("QuestionarioData2").innerHTML = data[1].Data;
  document.getElementById("QuestionarioClassificacao2").innerHTML =
    data[1].Classificacao + "%";

  document.getElementById("QuestionarioID3").innerHTML = data[2].UserID;
  document.getElementById("UserNome3").innerHTML = data[2].Nome;
  document.getElementById("QuestionarioNome3").innerHTML = data[2].Descricao;
  document.getElementById("QuestionarioData3").innerHTML = data[2].Data;
  document.getElementById("QuestionarioClassificacao3").innerHTML =
    data[2].Classificacao + "%";
});

async function postGPDetalhes(url, data) {
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

document
  .getElementById("QuestionarioDetalhes1")
  .addEventListener("click", () => {
    postGPDetalhes("https://localhost:5001/api/Auth/GPerguntasDetalhes", {
      UserID: myUserIDStore2.UserID,
      QuestionarioID: 1,
    }).then((data) => {
      console.log(data[0].GDescricao);
      document.getElementById("exampleModalLongTitle").innerHTML =
        data[0].Descricao;
        console.log(data)
        var container = document.getElementById("GPerguntasContainer");
        container.innerText = "";
        for (let i = 0; i < data.length; i++) {
          console.log(i)
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
  });
