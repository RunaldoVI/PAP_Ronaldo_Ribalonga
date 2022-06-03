const UserID2 = localStorage.getItem("UserIDStore");
const myUserIDStore2 = JSON.parse(UserID2);

const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const submitBtn = document.getElementById("submit");
const finishBtn = document.getElementById("Finish");

const QuestionarioID2 = localStorage.getItem("QuestionarioIDStore");
const MyQuestionarioID2 = JSON.parse(QuestionarioID2);


console.log(localStorage)

const groupOrganizer = (items) => {
  items.map(item => {
    let groupIndex = classificationsByAnswerGroup.findIndex((group) => {
      return group.GPerguntasID === item.GPerguntasID;
    });
    console.log(classificationsByAnswerGroup);
    if (groupIndex < 0) {
      classificationsByAnswerGroup = [
        ...classificationsByAnswerGroup,
        { GPerguntasID: item.GPerguntasID, Valor: item.Valor },
      ];
      // nao chega a fazer nada aqui
    } else {
      classificationsByAnswerGroup[groupIndex].Valor += item.Valor; //Soma e mete os dados no gpr
    }   
    //console.log(groupIndex)
  })
  };

finishBtn.style.display = "none";
let classificationsByAnswerGroup = [];
var ines = 0; // max 31
let score = 0;
nPerguntas = 1; // max 31
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

function putGPRespostas(urlGPRespostas, GPData) {
  // Default options are marked with *
  return fetch(urlGPRespostas, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(GPData),
  });
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
        QuestionarioID: MyQuestionarioID2.QuestionarioID,
      });
    }
  });
  return answer;
}

submitBtn.addEventListener("click", () => {
  const answer = getSelected();
  if (answer) {
    //console.log(perguntaChanger)

    //console.log(MyQuestionarioID2.QuestionarioID)
    if(nPerguntas > 31){
      submitBtn.style.display = "none";
      postSoma("https://localhost:5001/api/Auth/RespostasSumar", {
        UserID: myUserIDStore2.UserID,
        QuestionarioID: MyQuestionarioID2.QuestionarioID,
      }).then((data) => {
        groupOrganizer(data);
        let TotalScore = data
        .map((resposta) => {
          return resposta.Valor;
        })
        .reduce((previousValue, currentValue) => {
          return previousValue + currentValue;
        });
        //console.log(TotalScore);
        
        percentScore = (TotalScore / 128) * 100;
        finishBtn.style.display = "block";
        document.getElementById("nPerguntas").innerText = "Parabéns chegas-te ao final queres terminar o quiz?";
        document.getElementById("question").style.display = "none";
        document.getElementById("lista").style.display = "none";
        
      }).catch(err =>{
        console.log(err)
      })
    }
    else{
      ines++;
      nPerguntas++;
    }
    loadQuiz();
  }
  }
);


  finishBtn.addEventListener("click", () => {
    let today = new Date();
    let day = `${today.getDate() < 10 ? "0" : ""}${today.getDate()}`;
    let month = `${today.getMonth() + 1 < 10 ? "0" : ""}${today.getMonth() + 1}`;
    let year = today.getFullYear();
    
    data = `${day}/${month}/${year}`;
    QuizAnswer(classificationsByAnswerGroup).then(info =>{
      console.log(info)
     }).catch(err =>{
       console.log(err)
     })

    putQuestionarioRespondido(
      "https://localhost:5001/api/Auth/QuestionarioRespondido",
      {
        UserID: myUserIDStore2.UserID,
        QuestionarioID: MyQuestionarioID2.QuestionarioID,
      Classificacao: percentScore,
      Data: data,
    }
    ).then(()=> {
      localStorage.removeItem("QuestionarioIDStore");
      localStorage.removeItem("PerguntasIDStore");
      localStorage.removeItem("GPerguntasIDStore");
      window.location.replace("../MenuQuestionario/MenuQuestionario.html");
    })




 
  }); // end finish button

loadQuiz();

function QuizAnswer(data){
  return Promise.all(data.map(info => {
        putGPRespostas("https://localhost:5001/api/Auth/GRespostas", {
          UserID: myUserIDStore2.UserID,
          GPerguntasID: info.GPerguntasID,
          Valor: info.Valor,
        });
  }))
}