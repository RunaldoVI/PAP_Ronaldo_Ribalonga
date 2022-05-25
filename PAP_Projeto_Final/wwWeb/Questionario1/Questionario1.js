const UserID2 = localStorage.getItem("UserIDStore");
const myUserIDStore2 = JSON.parse(UserID2);

const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const submitBtn = document.getElementById("submit");
const finishBtn = document.getElementById("Finish")

finishBtn.style.display = 'none';

var ines = 0;
let score = 0;
nPerguntas = 1;
timesCount = 1;
perguntaChanger = 1;
//let TotalScore = 0;
let percentScore;
let soma = 0;

var mudarNumero = document.getElementById("nPerguntas");

async function putQuestionarioRespondido(urlQRespondido, QRdata) {
  // Default options are marked with *
  const response = await fetch(urlQRespondido, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(QRdata),
  });
  return response.json();
}

async function putGPRespostas(urlGPRespostas, GPData) {
  // Default options are marked with *
  const response = await fetch(urlGPRespostas, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(GPData),
  });
  return response.json();
}



async function postQuestionarioRespondido(urlQRespondido, QRdata) {
  // Default options are marked with *
  const response = await fetch(urlQRespondido, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(QRdata),
  });
  return response.json();
}


async function postSoma(urlSoma, data) {
  // Default options are marked with *
  const response = await fetch(urlSoma, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json();
}

async function postPerguntas(urlPerguntas, data) {
  // Default options are marked with *
  const response = await fetch(urlPerguntas, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json();
}

async function putRespostas(urlRespostas, data) {
  // Default options are marked with *
  const response = await fetch(urlRespostas, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

function loadQuiz() {
  deselectAnswers();

  postPerguntas("https://localhost:5001/api/Auth/Perguntas", {
    QuestionarioID: MyQuestionarioID2.QuestionarioID,
  }).then((dataPerguntas) => {
    dat = dataPerguntas[ines];
    mudarNumero.innerText = `Numero: ${nPerguntas}/32`;
    questionEl.innerText = dat.Descricao;

    const GPergunta = { GPerguntasID: dat.GPerguntasID };
    const MyGPerguntaID = JSON.stringify(GPergunta);

    const pergunta = { PerguntasID: dat.PerguntasID };
    const MyPerguntaID = JSON.stringify(pergunta);

    localStorage.setItem("GPerguntasIDStore", MyGPerguntaID);
    localStorage.setItem("PerguntasIDStore", MyPerguntaID);
  });
}

function deselectAnswers() {
  answerEls.forEach((answerEl) => (answerEl.checked = false));
}

const QuestionarioID2 = localStorage.getItem("QuestionarioIDStore");
const MyQuestionarioID2 = JSON.parse(QuestionarioID2);

function getSelected() {
  let answer;

  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      const Pergunta2 = localStorage.getItem("PerguntasIDStore");
      //console.log(Pergunta2);

      const MyPerguntaID2 = JSON.parse(Pergunta2);

      const GPergunta2 = localStorage.getItem("GPerguntasIDStore");
      const MyGPerguntaID2 = JSON.parse(GPergunta2);

      //console.log(MyGPerguntaID2.GPerguntasID);

      //console.log(MyPerguntaID2);
      answer = answerEl.id;
      let parsed = parseInt(answer);

      score += parsed;

      putRespostas("https://localhost:5001/api/Auth/Respostas", {
        Valor: parsed,
        PerguntasID: MyPerguntaID2.PerguntasID,
        UserID: myUserIDStore2.UserID,
        GPerguntasID: MyGPerguntaID2.GPerguntasID,
        QuestionarioID: MyQuestionarioID2.QuestionarioID
      });
    }
  });
  return answer;
}

submitBtn.addEventListener("click", () => {
  const answer = getSelected();
  if (answer) {
    ines++;
    nPerguntas++;
    //console.log(perguntaChanger)

  //console.log(MyQuestionarioID2.QuestionarioID)
  postSoma("https://localhost:5001/api/Auth/RespostasSumar", {
  UserID: myUserIDStore2.UserID,
  QuestionarioID: MyQuestionarioID2.QuestionarioID
}).then((data) => {
  
//console.log(data)

let classificationsByAnswerGroup = [];

  let groupOrganizer = (item) => {
    let groupIndex = classificationsByAnswerGroup.findIndex((group) => {
      return group.GPerguntasID === item.GPerguntasID; 
    });

    if (groupIndex < 0) {
      console.log("bas")
      classificationsByAnswerGroup = [
        ...classificationsByAnswerGroup,
        { GPerguntasID: item.GPerguntasID, Valor: item.Valor },
      ];
      // nao chega a fazer nada aqui 
    }
    else {
      console.log("das")
       classificationsByAnswerGroup[groupIndex].Valor += item.Valor; //Soma e mete os dados no gpr
    }
    console.log(groupIndex)
    
    //console.log(groupIndex)
  };


  let TotalScore = data
  .map((resposta) => {
    groupOrganizer(resposta);
    return resposta.Valor;
    })
    .reduce((previousValue, currentValue) => {
      return previousValue + currentValue;
    });


  
  if(nPerguntas > 31)
  {
    finishBtn.style.display = 'block';
    submitBtn.style.display = 'none';

      

      percentScore = (TotalScore / 128) * 100;
      
      
   
  

finishBtn.addEventListener("click", () =>{





  putQuestionarioRespondido(
    "https://localhost:5001/api/Auth/QuestionarioRespondido",
    {
      UserID: myUserIDStore2.UserID,
      QuestionarioID: MyQuestionarioID2.QuestionarioID,
      Classificacao: percentScore
    }
  );
  
    
    for (let i = 0; i < classificationsByAnswerGroup.length; i++) {
      putGPRespostas("https://localhost:5001/api/Auth/GRespostas", {
        UserID: myUserIDStore2.UserID,
        GPerguntasID: classificationsByAnswerGroup[i].GPerguntasID,
        Valor: classificationsByAnswerGroup[i].Valor,
      });
    }
     setTimeout(()=>{

       window.location.replace('../MenuQuestionario/MenuQuestionario.html');
     },5000);

})

  

  
}


});
loadQuiz();
  }
});




loadQuiz();
