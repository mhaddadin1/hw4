// Global Variables
const startBtn = document.getElementById("start");
const questionDiv = document.getElementById("question");
const answersDiv = document.getElementById("answers");
const timerElement = document.getElementById("timer");
const userName = document.getElementById("userName");
const userScore = document.getElementById("userScore");
const clearScoreBtn = document.getElementById("clearScore");
const questions = [
  {
    title: "How many rings has Michael Jordan won?",
    answers: ["3", "4", "5", "6"],
    correct: "6",
  },
  {
    title: "How many MVPs has Michael Jordan won?",
    answers: ["3", "4", "5", "6"],
    correct: "6",
  },
  {
    title: "How many Scoring titles has Jordan won?",
    answers: ["3", "4", "5", "10"],
    correct: "10",
  },
  {
    title: "How many teams has Jordan played for?",
    answers: ["2", "4", "5", "6"],
    correct: "2",
  },
];

let qIndex = 0;
let timerCount = 20;
let isWin = false;
let scores = timerCount;

// Functions
function startGame() {
  // Clear out previous question
  answersDiv.textContent = "";
  // Show first question with answers
  questionDiv.innerHTML = questions[qIndex].title;
  // Loop through answers
  questions[qIndex].answers.forEach((answer) => {
    // Create element button, add attributes value and text, add click event, and append button to the answers div
    const answerBtn = document.createElement("button");
    answerBtn.textContent = answer;
    answerBtn.setAttribute("value", answer);
    answerBtn.onclick = answerClick;
    answersDiv.appendChild(answerBtn);
  });
}
// Answer click function
function answerClick() {
  // Determine the answer the user chose
  let clickedAnswer = this.value;
  // Verify to see answer is correct
  if (clickedAnswer === questions[qIndex].correct) {
    // Let user know they got the right answer
    alert("You got the right answer!");
    // Move to next question or end game
    qIndex++;
    if (questions.length > qIndex) {
      startGame();
    } else {
      endGame();
    }
  } else {
    // Let user know they got the answer wrong
    alert("You're wrong. -2 seconds!");
    // TODO: Subtract time from timer
    if (clickedAnswer !== questions[qIndex].correct);
    timerCount = timerCount - 2;
  }
}

// End quiz
function endGame() {
  isWin = true;
}
function startTimer() {
  // Sets timer
  startGame();
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
      // Tests if win condition is met
      if (isWin && timerCount > 0) {
        // Clears interval and stops timer
        let userInitials = prompt(
          `Congrats you know as much about the GOAT as I do! You scored ${timerCount} points!`
        );
        //local storage save high score
        localStorage.setItem("User", userInitials);
        localStorage.setItem("Score", timerCount);

        clearInterval(timer);
        // winGame();
        location.reload();
      }
    }

    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      // loseGame();
      alert("You Lost!");
      endGame();
      location.reload();
    }
  }, 1000);
}

//save highscore
let userInput = localStorage.getItem("User");
let userPoints = localStorage.getItem("Score");
document.getElementById("userName").innerHTML = userInput;
document.getElementById("userScore").innerHTML = userPoints;

function clearScores() {
  localStorage.clear();
  document.getElementById("userName").innerHTML = "";
  document.getElementById("userScore").innerHTML = "";
}
//clear score

// Initialization- start
startBtn.addEventListener("click", startTimer);
clearScoreBtn.addEventListener("click", clearScores);
