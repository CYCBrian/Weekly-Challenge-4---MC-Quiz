var quizQuestions = [
    {
        num: 1,
        question: "1question text",
        answer: "1answer text",
        options: [
            "1incorrect answer text",
            "1answer text",
            "1incorrect answer text",
            "1incorrect answer text"
        ]
    },
    {
        num: 2,
        question: "2question text",
        answer: "2answer text",
        options: [
            "2incorrect answer text",
            "2answer text",
            "2incorrect answer text",
            "2incorrect answer text"
        ]
    },
    {
        num: 3,
        question: "3question text",
        answer: "3answer text",
        options: [
            "3incorrect answer text",
            "3answer text",
            "3incorrect answer text",
            "3incorrect answer text"
        ]
    },
    {
        num: 4,
        question: "4question text",
        answer: "4answer text",
        options: [
            "4incorrect answer text",
            "4answer text",
            "4incorrect answer text",
            "4incorrect answer text"
        ]
    },
    {
        num: 5,
        question: "5question text",
        answer: "5answer text",
        options: [
            "5incorrect answer text",
            "5answer text",
            "5incorrect answer text",
            "5incorrect answer text"
        ]
    }
];

var viewHighscores = document.querySelector(".view-highscores")
var timerText = document.querySelector(".timer-text");
var timerDisplay = document.querySelector(".timer-display")
var startBtn = document.querySelector (".start-btn");
var startBox = document.querySelector(".start-box");
var quizBox = document.querySelector(".quiz-box");
var resultBox = document.querySelector(".result-box");
var highscoresBox = document.querySelector(".highscores-box");
var questionElement = document.querySelector(".question");
var optionList = document.querySelector(".option-list");
var correctWrong = document.querySelector(".correct-wrong");
var quizResults = document.querySelector(".quiz-results");
var submitBtn = document.querySelector(".submit-btn");
var highscoresList = document.querySelector(".highscores-list");
var restartBtn = document.querySelector(".restart-btn");
var clearBtn = document.querySelector(".clear-btn");
var timerCount = 60;
var userScore = 0;
var selectedQuestion;
var originalQuizQuestions = [...quizQuestions];
var timer;
var nameInput = document.querySelector(".name-input");


window.addEventListener('load', function() {
    hide(quizBox);
    hide(resultBox);
    hide(highscoresBox);
});

viewHighscores.addEventListener('click',function(){
    hide(startBox);
    hide(quizBox);
    hide(resultBox);
    showHighscores();
})

function showHighscores(){
    var highScores = getScores();
    highscoresList.innerHTML = "";
    highScores.forEach(function(highScore){
        var scoreItem = document.createElement("li");
        scoreItem.textContent = highScore.initials + " - " + highScore.score;
        highscoresList.appendChild(scoreItem);
        scoreItem.classList.add("score-list");
    })
    show(highscoresBox);
}

clearBtn.addEventListener('click', function(){
    clearScores();
    showHighscores();
})

submitBtn.addEventListener('click',function(event){
    event.preventDefault();
    if (nameInput.value.trim() === ""){
        alert("Enter a name.")
        return false;
    }
    addScore(nameInput.value);
    hide(startBox);
    hide(quizBox);
    hide(resultBox);
    showHighscores();
});

restartBtn.addEventListener('click',function(){
    show(startBox);
    hide(quizBox);
    hide(resultBox);
    hide(highscoresBox);
    quizQuestions = [...originalQuizQuestions];
    userScore = 0;
})



function hide(element){
    element.classList.add("inactive");
}

function show(element){
    element.classList.remove('inactive');
}

function gameOver(){
    hide(quizBox)
    show(resultBox)
    quizResults.textContent = "You scored " + userScore + "!";
}

//  takes the list of scores from local storage and sorts them in descending order
function getScores(){
    var scoresString = localStorage.getItem("highscores") || "[]";
    var scores = JSON.parse(scoresString);
    scores.sort(function(a,b){
        return b.score - a.score;
    });
    return scores;
}

function addScore(initials){
    var scores = getScores();
    scores.push({
        initials: initials,
        score: userScore
    });
    localStorage.setItem("highscores", JSON.stringify(scores));
}

function clearScores(){
    localStorage.setItem("highscores", "[]");
}

function startTimer() {
    timerCount = 60
    timerDisplay.textContent = timerCount;
    timer = setInterval(function() {
        timerCount--;
        timerDisplay.textContent = timerCount;
    if (timerCount === 0) {
        clearInterval(timer);
        gameOver();
        }
    }, 1000);
}

function displayQuestion() {
    if (quizQuestions.length === 0) {
      gameOver();
      clearInterval(timer);
      return;
    }
    var randomIndex = Math.floor(Math.random() * quizQuestions.length);
    selectedQuestion = quizQuestions[randomIndex];
    questionElement.textContent = selectedQuestion.question;
    optionList.innerHTML = "";
    selectedQuestion.options.forEach(function(option) {
      var optionItem = document.createElement("li");
      optionItem.textContent = option;
      optionList.appendChild(optionItem);
      optionItem.classList.add("options");
      optionItem.classList.add("options:hover");
    });
    quizQuestions.splice(randomIndex, 1);
    for (let i = 0; i < selectedQuestion.options.length; i++) {
      optionList.children[i].addEventListener("click", function() {
        optionSelected(this);
      });
    }
  }
  function optionSelected(answer){
    var userAns = answer.textContent;
    var correctAns = selectedQuestion.answer;
    if (userAns === correctAns) {
        userScore += 1;
        correctWrong.textContent = "Correct!";
      } else {
        timerCount -=3;
        correctWrong.textContent = "Wrong!";  
        timerDisplay.textContent = timerCount;
      }
    displayQuestion();
  }

startBtn.addEventListener("click", function() {
    hide(startBox);
    show(quizBox);
  startTimer();
  displayQuestion();
  correctWrong.textContent = "";
});
