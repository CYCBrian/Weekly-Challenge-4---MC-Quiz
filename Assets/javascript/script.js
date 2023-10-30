// VARIABLES
// Variable for an array containing quiz question objects
var quizQuestions = [
    {
        num: 1,
        question: "1question text",
        answer: "1answer text",
        options: [
            "1incorrect answer text",
            "1incorrect answer text",
            "1incorrect answer text",
            "1answer text"
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
            "3answer text",
            "3incorrect answer text",
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
            "4incorrect answer text",
            "4incorrect answer text",
            "4answer text"
        ]
    },
    {
        num: 5,
        question: "5question text",
        answer: "5answer text",
        options: [
            "5incorrect answer text",
            "5incorrect answer text",
            "5answer text",
            "5incorrect answer text"
        ]
    }
];

// Variables to select elements from the HTML document using their class names
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
var nameInput = document.querySelector(".name-input");

// Variables that will be used for functions within the JavaScript
var timerCount = 60;
var userScore = 0;
var selectedQuestion;
var originalQuizQuestions = [...quizQuestions];
var timer;
// END OF VARIABLES

// FUNCTION
// Function to hide the selected HTML element and its nest HTML elements by adding a "inactive" CSS class
function hide(element){
    element.classList.add("inactive");
}

// Function to show the selected HTML element and its nested HTML elements by removing the "inactive" CSS class
function show(element){
    element.classList.remove('inactive');
}

// Function to start the quiz timer
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

// Function to display a randomly selected quiz question and its answer options
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

// Function to handle the user's option selection
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

// Function to retrieve and sort high scores from local storage
function getScores(){
    var scoresString = localStorage.getItem("highscores") || "[]";
    var scores = JSON.parse(scoresString);
    // Sort scores in descending order
    scores.sort(function(a,b){
        return b.score - a.score;
    });
    return scores;
}

// Function to add a new score with initials to the high scores
function addScore(initials){
    var scores = getScores();
    scores.push({
        initials: initials,
        score: userScore
    });
    localStorage.setItem("highscores", JSON.stringify(scores));
}

// Function to display the final score when the game is over
function gameOver(){
    // Hide the quiz-box and show the result-box with the users score
    hide(quizBox)
    show(resultBox)
    quizResults.textContent = "You scored " + userScore + " out of 5!";
}

// Function to display highscores and display highscores-box
function showHighscores(){
    // Retrieve highscores from local storage and display them by appending them to the created list item element
    var highScores = getScores();
    highscoresList.innerHTML = "";
    highScores.forEach(function(highScore){
        var scoreItem = document.createElement("li");
        scoreItem.textContent = highScore.initials + " - " + highScore.score;
        highscoresList.appendChild(scoreItem);
        // Apply styles to the scoreItem by adding the "score-list" CSS class
        scoreItem.classList.add("score-list");
    })
    // Display highscores-box
    show(highscoresBox);
}

// Function to clear high scores from local storage
function clearScores(){
    localStorage.setItem("highscores", "[]");
}
// END OF FUNCTIONS


// EVENT LISTENERS
// Add an event listener to hide the quiz-box, result-box, and the highscores-box when the page is loaded
window.addEventListener('load', function() {
    hide(quizBox);
    hide(resultBox);
    hide(highscoresBox);
});

// Add an event listener to the view-highscores element to hide the start-box, quiz-box, result-box, and run the showHighscores function
viewHighscores.addEventListener('click',function(){
    hide(startBox);
    hide(quizBox);
    hide(resultBox);
    showHighscores();
})

// Add an event listener to the "Start" button
startBtn.addEventListener("click", function() {
    hide(startBox);
    show(quizBox);
    startTimer();
    displayQuestion();
    correctWrong.textContent = "";
});

// Add an event listener to the "Submit" button
submitBtn.addEventListener('click',function(event){
    // Prevents the default behavior of the button
    event.preventDefault();
    // If the user did not enter their initials, a alert message appears and prevents the submit button from working.
    if (nameInput.value.trim() === ""){
        alert("Enter a name.")
        return false;
    }
    // Add the user's score with initials to the high scores
    addScore(nameInput.value);
    // Hide the start-box, quiz-box, and result-box, then run the showHighscores function
    hide(startBox);
    hide(quizBox);
    hide(resultBox);
    showHighscores();
});

// Add an event listener to the "Restart" button
restartBtn.addEventListener('click',function(){
    // Show the start-box, hide the quiz-box, result-box, and highscores-box
    show(startBox);
    hide(quizBox);
    hide(resultBox);
    hide(highscoresBox);
    // Restore the original quiz questions and reset the user's score
    quizQuestions = [...originalQuizQuestions];
    userScore = 0;
})

// Add an event listener to the "Clear Highscores" button
clearBtn.addEventListener('click', function(){
    // Run functions to clear highscores and update the displayed list
    clearScores();
    showHighscores();
})
// END OF EVENT LISTENERS