document.addEventListener("DOMContentLoaded", function () {
    var AdminUser = document.getElementById("AdminUser")


  document.getElementById("PdfButton").addEventListener("click", () => {


    let UserEscolhido = AdminUser.value

       


    console.log(UserEscolhido)

    if(UserEscolhido === "")
    {
        alert("Precisa Inserir Um Numero no ID Utilizador")
    }
    else{
    
      let myWindow;

      const UserChoose = { UserID: UserEscolhido };
      const MyUserChoose = JSON.stringify(UserChoose);
      localStorage.setItem("MyUserChooseStore", MyUserChoose);
      myWindow = window.open("pdfMaker.html");
      setTimeout(() =>{
        myWindow.close()
      },1500)
  }    

});

});
