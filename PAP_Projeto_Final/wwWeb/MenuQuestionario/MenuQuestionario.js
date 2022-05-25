var Q1 = document.getElementById("Q1")
var Q2 = document.getElementById("Q2")
var Q3 = document.getElementById("Q3")
var QT1 = document.getElementById("Descricao1")
var QT2 = document.getElementById("Descricao2")
var QT3 = document.getElementById("Descricao3")

async function postQuestionario(urlQuestionario,Qdata) {
    // Default options are marked with *
    const response = await fetch(urlQuestionario, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(Qdata), // body data type must match "Content-Type" header
    });
    return response.json();
  }
  

  async function getQuestionario(urlQuestionario) {
    // Default options are marked with *
    const response = await fetch(urlQuestionario, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.json();
  }

  
getQuestionario("https://localhost:5001/api/Auth/Questionario", {
  }).then((Qdata) => {
  
    QT1.innerText = Qdata[0].Descricao
    QT2.innerText = Qdata[1].Descricao
    QT3.innerText = Qdata[2].Descricao
  
  });
  


Q1.addEventListener("click", () => {
 let nQuestionario = 1;

postQuestionario("https://localhost:5001/api/Auth/Questionarios", {
    QuestionarioID: nQuestionario
  }).then((Qdata) => {

    
    const QuestionarioID = { QuestionarioID: Qdata[0].QuestionarioID };
    const MyQuestionarioID = JSON.stringify(QuestionarioID);
    localStorage.setItem("QuestionarioIDStore", MyQuestionarioID);

  
  });

  window.location.replace('../Questionario1/Questionario1.html');

})

Q2.addEventListener("click", () => {
    let nQuestionario = 2;

    postQuestionario("https://localhost:5001/api/Auth/Questionarios", {
        QuestionarioID: nQuestionario
      }).then((Qdata) => {
      
        const QuestionarioID = { QuestionarioID: Qdata[0].QuestionarioID };
        const MyQuestionarioID = JSON.stringify(QuestionarioID);
        localStorage.setItem("QuestionarioIDStore", MyQuestionarioID);

        console.log(Qdata[0])
      
      });
      window.location.replace('../Questionario1/Questionario1.html');

})

Q3.addEventListener("click", () => {
    let nQuestionario = 3;

    postQuestionario("https://localhost:5001/api/Auth/Questionarios", {
        QuestionarioID: nQuestionario
      }).then((Qdata) => {
              
        const QuestionarioID = { QuestionarioID: Qdata[0].QuestionarioID };
        const MyQuestionarioID = JSON.stringify(QuestionarioID);
        localStorage.setItem("QuestionarioIDStore", MyQuestionarioID);
      
        console.log(Qdata[0])
      
      });
      window.location.replace('../Questionario1/Questionario1.html');

})

