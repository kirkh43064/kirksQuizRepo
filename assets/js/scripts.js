// Gathering HTML elements for manipulation
let quizBody = document.getElementById("quiz");
let resultsEl = document.getElementById("result");
let finalScoreEl = document.getElementById("your_score");
let gameOver = document.getElementById("game_over");
let questionsEl = document.getElementById("question");
let quizTimer = document.getElementById("time");
let startQuizButton = document.getElementById("start");
let startIntro = document.getElementById("intro");
let highscoreContainer = document.getElementById("high_scores");
let highscoreRow = document.getElementById("high_row");
let highscoreInputName = document.getElementById("initials");
let highscoreDisplayName = document.getElementById("user_initials");
let endGameBtns = document.getElementById("reset_button");
let submitScoreBtn = document.getElementById("submit_score");
let displayScore = document.getElementById("your_score");
let buttonA = document.getElementById("a");
let buttonB = document.getElementById("b");
let buttonC = document.getElementById("c");
let buttonD = document.getElementById("d");

const questions = [
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses"
    },
    {
      title: "Arrays in JavaScript can be used to store ____.",
      choices: [
        "numbers and strings",
        "other arrays",
        "booleans",
        "all of the above"
      ],
      answer: "all of the above"
    },
    {
      title:
        "String values must be enclosed within ____ when being assigned to variables.",
      choices: ["commas", "curly brackets", "quotes", "parentheses"],
      answer: "quotes"
    },
    {
      title:
        "A very useful tool used during development and debugging for printing content to the debugger is:",
      choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
      answer: "console.log"
    }
];

  // Other global variables
let timeLeft = 90;
let timerInterval;
let score = 0;
let correct;
let currentQuestion = "";

quizBody.style.display = "none";
gameOver.style.display = "none";
highscoreContainer.style.display = "none";

function generateQuizQuestion(){

    for (let i=0; i < questions.length; i++) {
        let currentQuestion = questions[i].title;
        questionsEl.innerHTML = "<p>" + currentQuestion + "</p>";
        buttonA.innerHTML = questions[i].choices[0];
        buttonB.innerHTML = questions[i].choices[1];
        buttonC.innerHTML = questions[i].choices[2];
        buttonD.innerHTML = questions[i].choices[3];

        if (currentQuestion[i] === questions.length) {
            return showScore();
        }

    } 

};

// Start Quiz function starts the Timer, hides the start button, and displays the first quiz question.
function startQuiz() {

    startIntro.style.display = "none";

    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizBody.style.display = "flex";
}

// This function clears the list for the high scores and generates a new high score list from local storage
function generateHighScores() {
    highscoreInputName.innerHTML = "";
    highscoreDisplayName.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreInputName.appendChild(newScoreSpan);
    }
}

// This function is the end page screen that displays your score after either completeing the quiz or upon timer run out
function showScore() {
    quizBody.style.display = "none"
    gameOver.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    displayScore.innerHTML = "You got " + score + " out of " + questions.length + " correct!";
}


submitScoreBtn.addEventListener("click", showScore());
       
    let savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    let currentUser = highscoreInputName.value.trim();
    let currentHighscore = {
        name : currentUser,
        score : score
    };
    
    gameOver.style.display = "none";
    highscoreContainer.style.display = "flex";
    endGameBtns.style.display = "flex";
        
    savedHighscores.push(currentHighscore);
    localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));

    generateHighScores();



// This function displays the high scores page while hiding all of the other pages from 
function showHighscore() {
    startQuizDiv.style.display = "none"
    gameOver.style.display = "none";
    highscoreContainer.style.display = "flex";

    generateHighscores();
}

// This function clears the local storage of the high scores as well as clearing the text from the high score board
function clearScore() {
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

// This function sets all the variables back to their original values and shows the home page to enable replay of the quiz
function replayQuiz() {
    highscoreContainer.style.display = "none";
    gameOver.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 90;
    score = 0;
}

// This function checks the response to each answer 
buttonA.addEventListener("click", checkAnswer(buttonA));
buttonB.addEventListener("click", checkAnswer(buttonB));
buttonC.addEventListener("click", checkAnswer(buttonC));
buttonD.addEventListener("click", checkAnswer(buttonD));

function checkAnswer(answer) {
    correct = questions.answer;

    if (answer === correct && currentQuestion !== questions.length){
        score++;
        alert("That Is Correct!");
        currentQuestion++;
        generateQuizQuestion();
        //display in the results div that the answer is correct.
    }else if (answer !== correct && currentQuestion !== questions.length){
        alert("That Is Incorrect.")
        currentQuestion++;
        generateQuizQuestion();
        timeLeft = timeLeft - 10;
        //display in the results div that the answer is wrong.
    }else{
        showScore();
    }
}

// This button starts the quiz!
startQuizButton.addEventListener("click", startQuiz());