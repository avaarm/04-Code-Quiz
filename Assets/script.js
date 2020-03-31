// Variable set for timer, event listener, quiz Q and A
var remainingSeconds = 60;
var timerEl = document.querySelector(".timer");
var timerStart;
var start = document.querySelector(".startQuiz");
var buttons = document.querySelector(".buttons");
var container = document.querySelector(".container");
var submit = document.querySelector(".submit");
var scores = [];
var save = [];
var highScoresEl = document.querySelector(".highScoresLink");
var clear = document.querySelector(".clear");
var form = document.querySelector(".submitForm");
var index = 0;
var score = 0;


// Using addEventListener on "Start Quiz" button to start the timer:
function startQuiz() {
    start.addEventListener("click", function(event) {
      if (remainingSeconds < 60) {
        event.preventDefault();
      } else {
        timerEl.textContent = "Time: " + remainingSeconds; 
        timer();
        insertQuestion();
      }
    });
  }


// Use function timer() to countdown from remainingSeconds:
function timer() {
    var timerInterval = setInterval(function() {
      remainingSeconds--;
      timerEl.textContent = "Time: " + remainingSeconds;
      if (remainingSeconds <= 0) {
        clearInterval(timerInterval);
        timerEl.textContent = "Time's up!";
      }
    }, 1000);
  }

// Set an array as a variable that includes questions, answers, and correct answers:
var arrayofQuestions = [
  {
    question: "Commonly used data types DO NOT include:",
    answers: [
      "a. strings",
      "b. booleans",
      "c. alerts", 
      "d. numbers"
    ],
    rightAnswer: "c. alerts"
  },
  {
    question:
      "The condition of an if / else statement is enclosed within ________",
    answers: [
      "a. quotes",
      "b. curly brackets",
      "c. parentheses", 
      "d. square brackets"
    ],
    rightAnswer: "c. parentheses"
  },
  {
    question: "Arrays in JavaScript can be used to store ________",
    answers: [
      "a. numbers and strings",
      "b. other arrays",
      "c. booleans",
      "d. all of the above"
    ], 
    rightAnswer: "d. all of the above"
  },
  {
    question:
      "String values must be enclosed within ________ when being assigned to variables.",
    answers: ["a. commas", "b. curly brackets", "c. quotes", "d. parentheses"], //correct
    rightAnswer: "d. parentheses"
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: [
      "a. JavaScript",
      "b. terminal/bash",
      "c. for loops",
      "d. console.log"
    ],
    rightAnswer: "c. for loops"
  }
];

// In order for the user to be prompted with a questions and for the questions to be in a "new screen"
function insertQuestion() {
  container.innerHTML = "<h2>" + arrayofQuestions[index].question + "</h2>";
  container.style.textAlign = "left";
  for (var i = 0; i < arrayofQuestions[index].answers.length; i++) {
    document.querySelector(".answer" + i).innerHTML =
      "<button type='button' class='btn btn-primary'>" +
      arrayofQuestions[index].answers[i] +
      "</button>";
  }
}
// Adding an event listener for the right answer choice/ button 
buttons.addEventListener("click", function(event) {
  event.preventDefault();
 

  if (event.target.textContent === arrayofQuestions[index].rightAnswer) {
    score = score + 10;
  } else {
    remainingSeconds = remainingSeconds - 10;
  }
  if (index < arrayofQuestions.length - 1) {
    index++;
    insertQuestion();
  } else {
    remainingSeconds = 0;
    enterScore();
  }
});

function correctAnswer() {
  return;
}

function enterScore() {
  container.innerHTML = "<h2>All Done!</h2><br>";
  buttons.innerHTML = "Final score  " + score + "." + "<br><br>";
    var form = document.createElement("form");
    submit.appendChild(form);
    innerHTML = enterInitials;
    var initialsButton = document.querySelector(".initialButton");
  initialsButton.addEventListener("click", function(event) {
    event.preventDefault(); 
    if (localStorage.getItem("user,score") !== null) {
      scores = JSON.parse(localStorage.getItem("user,score"));
    }

    if (scores.length > 0) {
      for (var b = 0; b < scores.length; b++) {
        save.push(scores[b]);
      }
    }


    var userInitials = document.querySelector(".initInput").value;
    var userScore = { userInitials, score };

    save.push(userScore);

    localStorage.setItem("user,score", JSON.stringify(save));
    viewScore();
  });
}

function viewScore() {
  container.innerHTML = "<h2>High Scores!</h2><br>";
  for (var a = 0; a < save.length; a++) {
    var scoreList = document.createElement("div");
    scoreList.textContent =
      "Usser: " +
      save[a].userInitials +
      "----------------" +
      "   Score: " +
      save[a].score;
    container.appendChild(scoreList);
  }
  buttons.innerHTML = "<button type='button' class='btn btn-primary'>" + "Clear Scores" +
  "</button>";
  form.innerHTML = "<div></div>";
}
startQuiz();

