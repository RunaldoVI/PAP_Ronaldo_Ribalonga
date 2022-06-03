const UserID2 = localStorage.getItem("UserIDStore");
const myUserIDStore2 = JSON.parse(UserID2);

document.getElementById("Q1").addEventListener("click",() => {
    window.location.href = "../MenuQuestionario/MenuQuestionario.html"
})

document.getElementById("Q2").addEventListener("click",() => {
    window.location.href = "../UserDashboard/UserDashboard.html"
})

document.getElementById("Q3").addEventListener("click",() => {
    window.location.href = "../User/User.html"
})

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
        UserID: myUserIDStore2.UserID,
      }
      ).then((data) => {
           document.getElementById("titulo").innerText = `Bom Dia ${data.Nome}`
      })