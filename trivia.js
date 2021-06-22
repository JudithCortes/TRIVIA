
let body = document.getElementById("body");
//elementos html
let triviaForm = document.getElementById("trivia");
let containerQuiz = document.getElementById("containerQuiz");
let reiniciar = document.getElementById("reinicia-btn");

//obtener inputs
let amount = document.getElementById("amount");
let category = document.getElementById("category");
let difficulty = document.getElementById("difficulty");
let type = document.getElementById("type");
let answers = document.getElementsByClassName("answer");

///botones respuestas
let answ_1 = document.getElementById("1");
let answ_2 = document.getElementById("2");
let answ_3 = document.getElementById("3");
let answ_4 = document.getElementById("4");
            
//variables
let questions;
let correctIndex = 0;
let questIndex = 0;
let score = 0;

//funciones
let getApiData = (e) => {
    e.preventDefault();
    //console.log(amount.value, category.value, difficulty.value, type.value);
    let url = `https://opentdb.com/api.php?amount=${amount.value}&category=${category.value}&difficulty=${difficulty.value}&type=${type.value}`;
    fetch(url)
    .then(response =>{
        return response.json();
    }).then( data => {
        //console.log(data);
        questions = data.results;
        nextQuestion();

    }).catch(err => {
        console.log(err);
    });
};

const nextQuestion = () => {
    console.log(questions);
    console.log(amount.value);
    console.log("your score is " + score);
    containerQuiz.style.display = "flex";
    triviaForm.style.display = "none";
    
        //
        let currentQuestion = questions[questIndex];
        document.getElementById("questionName").innerText = 
        currentQuestion.question;

        if(currentQuestion.incorrect_answers.length ==1){
    
            answ_1.innerText = "True";
            answ_2.innerText = "False";
            answ_3.style.display = "none";
            answ_4.style.display = "none";

            if(currentQuestion.correct_answer === "True"){
                
                correctIndex =1;
            }
                
            else {
                correctIndex = 2;
            }
                
        }
        else{
            
            document.getElementById("1").style.display = "Block";
            document.getElementById("2").style.display = "Block";
            document.getElementById("3").style.display = "Block";
            document.getElementById("4").style.display = "Block";

            correctIndex = Math.floor(Math.random()*4)+1;
            document.getElementById(correctIndex).innerText=
            currentQuestion.correct_answer;

            //console.log(correctIndex);

            let j=0;
            for(let i=1; i<= 4; i++){

                if(i === correctIndex) continue;

                     document.getElementById(i).innerText=
                     currentQuestion.incorrect_answers[j];
                j++;
            }
    }
};

let selectAnswer = id => {
    //console.log(id);
    let answerId = id;
    if(answerId == correctIndex){
        
        score = score +1;
        body.classList.add("correct");
        //alert("Respuesta correcta. Felicidades!");
        
    }
    else{
        body.classList.add("wrong");
        //alert("Ups! Respuesta incorrecta");
        
    }
    if(questIndex < amount.value -1){
        questIndex++;
        nextQuestion();
    }
    else if(questIndex == amount.value -1){
        showFinalResults();
        reiniciar.classList.remove('hide');
    }
};

const showFinalResults =() => { 
    containerQuiz.innerHTML = "";
    let scoreFinal= document.createElement("p");
    scoreFinal.innerHTML = `Juego finalizado! Tu score es: ${score}`;
    containerQuiz.appendChild(scoreFinal);
    body.classList.remove("wrong");
    body.classList.remove("correct");
    //questionContainer.appendChild(restartBtn);
};


for(let i=0; i <answers.length; i++){
    const element = answers[i];
    element.addEventListener("click", () => selectAnswer(element.id));


}

const reinicia = () => {
    location.reload();
}

const audioIniciar =  () => {
    let soundInit = document.createElement("iframe");
    soundInit.classList.add("hide");
    //console.log("sí escucho", soundInit);
    soundInit.setAttribute("src", "assets/sound/inicio.mp3");
    document.body.appendChild(soundInit);
}
 
//listeners
triviaForm.addEventListener("submit", getApiData);
triviaForm.addEventListener("submit", audioIniciar);
reiniciar.addEventListener("click", reinicia);