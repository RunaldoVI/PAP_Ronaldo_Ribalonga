const UserID2 = localStorage.getItem("UserIDStore");
const myUserIDStore2 = JSON.parse(UserID2);

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
  getAdminDetalhes("https://localhost:5001/api/Auth/AdminQuestionario", {
  }).then((data) => {
    console.log(data);

    const tbodyEl = document.getElementById("tabela");
      for(let i = 0; i < data.length; i++){

          tbodyEl.innerHTML += `
          <tr>
          <th id="User${data[i].UserID}QID${data[i].QuestionarioID}" scope="row">${data[i].UserID}</th>
          <td>${data[i].Nome}</td>
          <td>${data[i].Descricao}</td>
          <td>${data[i].Data}</td>
          <td>${data[i].Classificacao}</td>
          <td><button onclick="ola()" id="Button${[i]}" type="button" class="btn btn-outline-success">Success</button></td>
          </tr>
          `;
        }
              
      
    /*
        postAdminGDetalhes("https://localhost:5001/api/Auth/GPerguntasDetalhes", {
            UserID: myUserIDStore2.UserID,
            QuestionarioID: data.QuestionarioID,
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
          */

  });

  function ola() {
}
