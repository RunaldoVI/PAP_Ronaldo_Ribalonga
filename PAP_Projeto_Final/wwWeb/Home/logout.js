const UserID3 = localStorage.getItem("UserIDStore");
const myUserIDStore3 = JSON.parse(UserID3);


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
  UserID: myUserIDStore3.UserID
}
).then((data)=> {
  document.getElementById("Nome").innerHTML =
  "Bom Dia " + data.Username;
})