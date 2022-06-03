var Q1 = document.getElementById("Q1");
var Q2 = document.getElementById("Q2");
var Q3 = document.getElementById("Q3");
var QT1 = document.getElementById("Descricao1");
var QT2 = document.getElementById("Descricao2");
var QT3 = document.getElementById("Descricao3");
const UserID2 = localStorage.getItem("UserIDStore");
const myUserIDStore2 = JSON.parse(UserID2);

async function postQuestionario(urlQuestionario, Qdata) {
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

async function RespostasDelete(urlRespostasDelete, data) {
  // Default options are marked with *
  const response = await fetch(urlRespostasDelete, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json();
}

async function QuestionarioDelete(QuestionarioDelete, data) {
  // Default options are marked with *
  const response = await fetch(QuestionarioDelete, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json();
}

async function GPDelete1(GPDelete1, data) {
  // Default options are marked with *
  const response = await fetch(GPDelete1, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json();
}

async function GPDelete2(GPDelete2, data) {
  // Default options are marked with *
  const response = await fetch(GPDelete2, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json();
}


async function GPDelete3(GPDelete3, data) {
  // Default options are marked with *
  const response = await fetch(GPDelete3, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json();
}



getQuestionario("https://localhost:5001/api/Auth/Questionario", {}).then(
  (Qdata) => {
    QT1.innerText = Qdata[0].Descricao;
    QT2.innerText = Qdata[1].Descricao;
    QT3.innerText = Qdata[2].Descricao;
  }
);

Q1.addEventListener("click", () => {
  console.log(localStorage);
  localStorage.removeItem("QuestionarioIDStore");
  localStorage.removeItem("PerguntasIDStore");
  localStorage.removeItem("GPerguntasIDStore");
  const QuestionarioID = { QuestionarioID: 1 };
  const MyQuestionarioID = JSON.stringify(QuestionarioID);
  localStorage.setItem("QuestionarioIDStore", MyQuestionarioID);
  document.getElementById("ButtonDanger").addEventListener("click", () => {
    RespostasDelete("https://localhost:5001/api/Auth/RespostasDelete", {
      UserID: myUserIDStore2.UserID,
      QuestionarioID: 1,
    }).then((data) => {
      if (data.status !== 404) {
        QuestionarioDelete(
          "https://localhost:5001/api/Auth/QuestionarioRespondidoDelete",
          {
            UserID: myUserIDStore2.UserID,
            QuestionarioID: 1,
          }
        ).then(() => {
          GPDelete1(
            "https://localhost:5001/api/Auth/GPRDeleteQ1",
            {
              UserID: myUserIDStore2.UserID,
            }
          ).then(() => {
            document.getElementById("alert").style.display = "block";
            document.getElementById("alert").innerText =
            "O Questionário foi apagado com sucesso!";
            setTimeout(() => {
              document.getElementById("alert").style.display = "none";
            }, 2000);
          });
        });
      } else {
        document.getElementById("alert").innerText =
          "O Questionário ainda não foi respondido";
        document.getElementById("alert").style.display = "block";
        setTimeout(() => {
          document.getElementById("alert").style.display = "none";
        }, 2000);
      }
    });
  });

  document
    .getElementById("ButtonQuestionario")
    .addEventListener("click", () => {
      window.location.replace("../Questionario1/Questionario1.html");
    });
});

Q2.addEventListener("click", () => {
  console.log(localStorage);

  localStorage.removeItem("QuestionarioIDStore");
  localStorage.removeItem("PerguntasIDStore");
  localStorage.removeItem("GPerguntasIDStore");
  const QuestionarioID = { QuestionarioID: 2 };
  const MyQuestionarioID = JSON.stringify(QuestionarioID);
  localStorage.setItem("QuestionarioIDStore", MyQuestionarioID);

  document.getElementById("ButtonDanger").addEventListener("click", () => {
    RespostasDelete("https://localhost:5001/api/Auth/RespostasDelete", {
      UserID: myUserIDStore2.UserID,
      QuestionarioID: 2,
    }).then((data) => {
      if (data.status !== 404) {
        QuestionarioDelete(
          "https://localhost:5001/api/Auth/QuestionarioRespondidoDelete",
          {
            UserID: myUserIDStore2.UserID,
            QuestionarioID: 2,
          }
        ).then(() => {
          GPDelete2(
            "https://localhost:5001/api/Auth/GPRDeleteQ2",
            {
              UserID: myUserIDStore2.UserID,
            }
          ).then(() => {
            document.getElementById("alert").style.display = "block";
            document.getElementById("alert").innerText =
            "O Questionário foi apagado com sucesso!";
            setTimeout(() => {
              document.getElementById("alert").style.display = "none";
            }, 2000);
          });
        });
      } else {
        document.getElementById("alert").innerText =
          "O Questionário ainda não foi respondido";
        document.getElementById("alert").style.display = "block";
        setTimeout(() => {
          document.getElementById("alert").style.display = "none";
        }, 2000);
      }
    });
  });

  document
    .getElementById("ButtonQuestionario")
    .addEventListener("click", () => {
      window.location.replace("../Questionario1/Questionario1.html");
    });
});

Q3.addEventListener("click", () => {
  console.log(localStorage);

  localStorage.removeItem("QuestionarioIDStore");
  localStorage.removeItem("PerguntasIDStore");
  localStorage.removeItem("GPerguntasIDStore");
  const QuestionarioID = { QuestionarioID: 3 };
  const MyQuestionarioID = JSON.stringify(QuestionarioID);
  localStorage.setItem("QuestionarioIDStore", MyQuestionarioID);

  document.getElementById("ButtonDanger").addEventListener("click", () => {
    RespostasDelete("https://localhost:5001/api/Auth/RespostasDelete", {
      UserID: myUserIDStore2.UserID,
      QuestionarioID: 3,
    }).then((data) => {
      if (data.status !== 404) {
        QuestionarioDelete(
          "https://localhost:5001/api/Auth/QuestionarioRespondidoDelete",
          {
            UserID: myUserIDStore2.UserID,
            QuestionarioID: 3,
          }
        ).then(() => {
          GPDelete3(
            "https://localhost:5001/api/Auth/GPRDeleteQ3",
            {
              UserID: myUserIDStore2.UserID,
            }
          ).then(() => {
            document.getElementById("alert").innerText =
          "O Questionário foi apagado com sucesso!";
            document.getElementById("alert").style.display = "block";
            setTimeout(() => {
              document.getElementById("alert").style.display = "none";
            }, 2000);
          });
        });
      } else {
        document.getElementById("alert").innerText =
          "O Questionário ainda não foi respondido";
        document.getElementById("alert").style.display = "block";
        setTimeout(() => {
          document.getElementById("alert").style.display = "none";
        }, 2000);
      }
    });
  });

  document
    .getElementById("ButtonQuestionario")
    .addEventListener("click", () => {
      window.location.replace("../Questionario1/Questionario1.html");
    });
});
