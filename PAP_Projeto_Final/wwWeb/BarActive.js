navbar = document.querySelectorAll(".navbar a")

navbar.forEach(element => {
    element.addEventListener("click", () => {
        resetLinks();
        element.classList.add("active")
    })
});

function resetLinks() {
    navbar.forEach(element => {
        element.classList.remove("active")
    })
}



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
  if(data.IsAdmin === true){
    document.getElementById("AdminBar").style.display = 'block';
    document.getElementById("AdminUserBar").style.display = 'block';
  }
})

document.getElementById("LogOut").addEventListener("click", () => {
    window.location.replace('../Login&Register/register.html');      
    localStorage.clear();
})