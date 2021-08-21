// Gathering HTML elements for manipulation
let quizBody = document.getElementById("quiz");
let resultsEl = document.getElementById("result");
let finalScoreEl = document.getElementById("finalScore");
let gameoverDiv = document.getElementById("game_over");
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

// Start Quiz function starts the TimeRanges, hides the start button, and displays the first quiz question.
    function startQuiz() {
        gameoverDiv.style.display = "none";
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

  // Other global variables
let timeLeft = 90;
let timerInterval;
let score = 0;
let correct;
let currentQuestion = "";

function generateQuizQuestion(){
    startIntro.style.display = "none";
    gameoverDiv.style.display = "none";
    

    for (leti=0; i < questions.length; i++) {
        let currentQuestion = questions.title[i];
        questionsEl.innerHTML = "<p>" + currentQuestion.title + "</p>";
        buttonA.innerHTML = currentQuestion.choices[0];
        buttonB.innerHTML = currentQuestion.choices[1];
        buttonC.innerHTML = currentQuestion.choices[2];
        buttonD.innerHTML = currentQuestion.choices[3];

    } 

    if (currentQuestion[i] === questions.length) {
        return showScore();
    }
};

// This function is the end page screen that displays your score after either completeing the quiz or upon timer run out
function showScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

// On click of the submit button, we run the function highscore that saves and stringifies the array of high scores already saved in local stoage
// as well as pushing the new user name and score into the array we are saving in local storage. Then it runs the function to show high scores.
submitScoreBtn.addEventListener("click", function highscore(){
    
    
    if(highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        let savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        let currentUser = highscoreInputName.value.trim();
        let currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "flex";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});

// This function clears the list for the high scores and generates a new high score list from local storage
function generateHighscores() {
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

// This function displays the high scores page while hiding all of the other pages from 
function showHighscore() {
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

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
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 90;
    score = 0;
}

// This function checks the response to each answer 
function checkAnswer(answer) {
    correct = quizQuestions[currentQuestion].answer;

    if (answer === correct && currentQuestion !== currentQuestion.length){
        score++;
        alert("That Is Correct!");
        currentQuestion++;
        generateQuizQuestion();
        //display in the results div that the answer is correct.
    }else if (answer !== correct && currentQuestion !== currentQuestion.length){
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