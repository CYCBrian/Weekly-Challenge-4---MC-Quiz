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
var timer=

window.addEventListener('load', function() {
    quizBox.classList.add("inactiveQuiz");
    resultBox.classList.add("inactiveResult");
    highscoresBox.classList.add("inactiveHighscores");
});

viewHighscores.addEventListener('click',function(){
    startBox.classList.add("inactiveStart");
    quizBox.classList.add("inactiveQuiz");
    resultBox.classList.add("inactiveResult");
    highscoresBox.classList.remove("inactiveHighscores");
})

submitBtn.addEventListener('click',function(){
    startBox.classList.add("inactiveStart");
    quizBox.classList.add("inactiveQuiz");
    resultBox.classList.add("inactiveResult");
    highscoresBox.classList.remove("inactiveHighscores");
});

restartBtn.addEventListener('click',function(){
    startBox.classList.remove("inactiveStart")
    quizBox.classList.add("inactiveQuiz");
    resultBox.classList.add("inactiveResult");
    highscoresBox.classList.add("inactiveHighscores");
    quizQuestions = [...originalQuizQuestions];
})

function gameOver(){
    quizBox.classList.add("inactiveQuiz");
    resultBox.classList.remove("inactiveResult");
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
      }
    displayQuestion();
  }

startBtn.addEventListener("click", function() {
  startBox.classList.add("inactiveStart");
  quizBox.classList.remove("inactiveQuiz");
  startTimer();
  displayQuestion();
});

