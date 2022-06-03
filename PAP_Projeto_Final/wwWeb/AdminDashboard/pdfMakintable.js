const UserChoose2 = localStorage.getItem("MyUserChooseStore");
const MyUserChoose2 = JSON.parse(UserChoose2);

async function postData(url, Nomedata) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(Nomedata), // body data type must match "Content-Type" header
  });
  return response.json();
}

async function postGAdminDetalhes(url, data) {
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
  
    


function waitForLocalStorage() {
  var i = null;
  if (MyUserChoose2 == i) {
    setTimeout(() => {
     location.reload();
    }, 1500);
  } else {
    postData("https://localhost:5001/api/Auth/AdminUtilizadorPdf", {
      UserID: MyUserChoose2.UserID,
    }).then((Nomedata) => {
      console.log(Nomedata)
      for (var a = 0; a < Nomedata.length; a++) {
        const tbodyEl = document.getElementById("TabelaPdf");
        var Arounded = Math.round(Nomedata[a].Classificacao)
        tbodyEl.innerHTML += `
                  <tr id="content">
                  <td>${Nomedata[a].Nome}</td>
                  <td>${Nomedata[a].Descricao}</td>
                  <td>${Arounded}</td>
                  </td>
                  </tr>
                  `;
      }


      postGAdminDetalhes("https://localhost:5001/api/Auth/GPerguntasDetalhes", {
        UserID: MyUserChoose2.UserID,
        QuestionarioID: 1,
      }).then((data) => {

        console.log(data)
        document.getElementById("exampleModalLabel").innerHTML = data[0].Descricao
        var FormContainer = document.getElementById("ModalGPerguntas");
        FormContainer.innerText = "";
        for(let i = 0; i < data.length; i++)
        {
            FormContainer.innerHTML += '<br> <p class="try m-0" id="GPergunta'+i+'">'+data[i].GDescricao +'</p>'
            var total = 0;
            total += data[i].Valor / 16 * 100
            FormContainer.innerHTML += '<div class="progress"> <div id="Number'+i+'" class="progress-bar" style="width:'+total+'%;" role="progressbar" aria-valuenow="' + total +'" aria-valuemin="0" aria-valuemax="100">'+total +"%</div>" 
            var teste = document.getElementById("Number"+i).innerText;
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

        postGAdminDetalhes("https://localhost:5001/api/Auth/GPerguntasDetalhes", {
        UserID: MyUserChoose2.UserID,
        QuestionarioID: 2,
      }).then((data) => {

        document.getElementById("exampleModalLabel2").innerHTML = data[0].Descricao
        var FormContainer = document.getElementById("ModalGPerguntas2");
        FormContainer.innerText = "";
        for(let i = 0; i < data.length; i++)
        {
            FormContainer.innerHTML += '<br> <p class="try m-0" id="GPergunta'+i+'">'+data[i].GDescricao +'</p>'
            var total = 0;
            total += data[i].Valor / 16 * 100
            FormContainer.innerHTML += '<div class="progress"> <div id="Number2'+i+'" class="progress-bar" style="width:'+total+'%;" role="progressbar" aria-valuenow="' + total +'" aria-valuemin="0" aria-valuemax="100">'+total +"%</div>" 
            var teste = document.getElementById("Number2"+i).innerText;
            testeInt = parseInt(teste.slice(0,teste.length -1))
            if(testeInt >= 0 && testeInt <= 49)
            {
              document.getElementById("Number2"+i).style.backgroundColor = "#D3212C";
            }
            else if(testeInt >= 50 && testeInt <= 74)
            {
              document.getElementById("Number2"+i).style.backgroundColor = "#FF980E";
            }
            else if(testeInt >= 75 && testeInt <= 100)
            {
              document.getElementById("Number2"+i).style.backgroundColor = "#069C56";
            } 
        }
      

        postGAdminDetalhes("https://localhost:5001/api/Auth/GPerguntasDetalhes", {
            UserID: MyUserChoose2.UserID,
            QuestionarioID: 3,
          }).then((data) => {
    
            document.getElementById("exampleModalLabel3").innerHTML = data[2].Descricao
            var FormContainer = document.getElementById("ModalGPerguntas3");
            FormContainer.innerText = "";
            for(let i = 0; i < data.length; i++)
            {
                FormContainer.innerHTML += '<br> <p class="try m-0" id="GPergunta'+i+'">'+data[i].GDescricao +'</p>'
                var total = 0;
                total += data[i].Valor / 16 * 100
                FormContainer.innerHTML += '<div class="progress"> <div id="Number3'+i+'" class="progress-bar" style="width:'+total+'%;" role="progressbar" aria-valuenow="' + total +'" aria-valuemin="0" aria-valuemax="100">'+total +"%</div>" 
                var teste = document.getElementById("Number3"+i).innerText;
                testeInt = parseInt(teste.slice(0,teste.length -1))
                if(testeInt >= 0 && testeInt <= 49)
                {
                  document.getElementById("Number3"+i).style.backgroundColor = "#D3212C";
                }
                else if(testeInt >= 50 && testeInt <= 74)
                {
                  document.getElementById("Number3"+i).style.backgroundColor = "#FF980E";
                }
                else if(testeInt >= 75 && testeInt <= 100)
                {
                  document.getElementById("Number3"+i).style.backgroundColor = "#069C56";
                } 
            }
        
            const item = document.getElementById("element");
    
    
            var opt = {
              margin: 0.4,
              padding: 0.4,
              filename: `${Nomedata[0].Nome}_Questionarie.pdf`,
              html2canvas: { scale: 2 },
              jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
            };
            
            html2pdf().set(opt).from(item).save();
                  localStorage.removeItem("MyUserChooseStore")
      setTimeout(() => {
        location.reload();
      }, 1500);

        })
  
    })
        
    })
    
    
    
    /*

      

      */
    });
  }
}

waitForLocalStorage();
