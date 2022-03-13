//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
// if startQuiz button clicked
var ines = 0;
var nquestao = 1;
var valor = 1;

async function postRespostas(urlRespostas,dataRespostas) {
    // Default options are marked with *
    const response = await fetch(urlRespostas, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(dataRespostas),
    });
    return response.json();
  }


async function postPerguntas(urlPerguntas,dataPerguntas) {
    // Default options are marked with *
    const response = await fetch(urlPerguntas, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(dataPerguntas),
    });
    return response.json();
  }

  function respostas(){
    postRespostas("https://localhost:5001/api/Auth/Respostas", {

        perguntasID:valor

    }
    ).then((dataRespostas) => {
       
      console.log(dataRespostas[0]);

      var respostas1 = dataRespostas[0];
      var respostas2 = dataRespostas[1];
      var respostas3 = dataRespostas[2];
      var respostas4 = dataRespostas[3];
      var respostas5 = dataRespostas[4];

      let options = '<div class="option"><span>'+ respostas1["Valor"] +'</span></div>'
      + '<div class="option"><span>'+ respostas2["Valor"] +'</span></div>'
      + '<div class="option"><span>'+ respostas3["Valor"] +'</span></div>'
      + '<div class="option"><span>'+ respostas4["Valor"] +'</span></div>'
      + '<div class="option"><span>'+ respostas5["Valor"] +'</span></div>';
      option_list.innerHTML = options; //adding new div tag inside option_tag
      
      const option = option_list.querySelectorAll(".option");
      // set onclick attribute to all available options
      for(i=0; i < option.length; i++){
          option[i].setAttribute("onclick", "optionSelected(this)");
      }

    });
  }


  function perguntas(){

    postPerguntas("https://localhost:5001/api/Auth/Perguntas", {

        QuestionarioID:1
    }
    ).then((dataPerguntas) => {
       
        
       dat = dataPerguntas[ines] 
       const que = document.querySelector(".que_text");
       que.innerHTML = '<span>'+ dat["Descricao"] +'</span>';
       //console.log(dat);
       //console.log(dataPerguntas)

       const numeroPerguntas = document.querySelector("footer .total_que");
       let totalQueCounTag = '<span><p>'+ nquestao +'</p> of <p>'+ dataPerguntas.length +'</p> Questions</span>';
       numeroPerguntas.innerHTML = totalQueCounTag;  
        
    });
}



start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo");

}
// if exitQuiz button clicked
exit_btn.onclick = ()=>{

    info_box.classList.remove("activeInfo");
     //hide info box
}
// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); //calling showQestions function
}
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");
// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    showQuetions(); //calling showQestions function
    next_btn.classList.remove("show"); //hide the next button
}
// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}
const next_btn = document.querySelector("footer .next_btn");
const finish_btn = document.querySelector("footer .finish_btn");

// if Next Que button clicked
next_btn.onclick = ()=>{
    if(nquestao <= 32 - 1){
        ines++; //if question count is less than total question length~
        nquestao++;
        valor++;
        showQuetions(); //calling showQestions function
        next_btn.classList.remove("show")
       
    }
}

finish_btn.onclick = ()=>{
  window.location.href = "../Home/Site.html"
}
// getting questions and options from array
function showQuetions(){
    const que_text = document.querySelector(".que_text");
    que_text.innerHTML = perguntas();  
    const option = option_list.querySelectorAll(".option");
    option.innerHTML = respostas();

}
// IMPORTANTE É O QUE FAZ PASSAR PERGUNTA DE PERGUNTA
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(){
    let userAns = document.querySelector(".option"); //getting user selected option
    const allOptions = option_list.children.length; //getting all option items
    
        
        console.log(userAns)
        //console.log(allOptions)
           
            //answer.insertAdjacentHTML("beforeend", tickIconTag);

        
        //answer.classList.add("correct"); //adding green color to correct selected option
         //adding tick icon to correct selected option
  
       // answer.classList.add("incorrect"); //adding red color to correct selected option
        //answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
    
    for(i=0; i < allOptions; i++){
        //option_list.children[i].classList.add() //once user select an option then disabled all options
    }
    if(nquestao !== 32)
    {
      next_btn.classList.add("show");;
       //show the next button if user selected any option
    }
    else{
      finish_btn.classList.add("show");
    }
}