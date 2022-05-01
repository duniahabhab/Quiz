const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];


let questions = [
  {
    question: " In what year were the first Air Jordan sneakers released?",
    choice1: "1980",
    choice2: "1984",
    choice3: "1991",
    choice4: "189",
    answer: 2
  },
  {
    question: " In a bingo game, which number is represented by the phrase “two little ducks”",
    choice1: "2",
    choice2: "18",
    choice3: "22",
    choice4: "35",
    answer: 3
  },
  {
    question: "According to Greek mythology, who was the first woman on earth?",
    choice1: "Pandora",
    choice2: "Apollo",
    choice3: "Ares",
    choice4: "Hermes",
    answer: 1
  },
  {
    question:
      "Which African country was formerly known as Abyssinia?",
    choice1: "Eygpt",
    choice2: "Ethoipia",
    choice3: "Libya",
    choice4: "Libyria",
    answer: 2
  },
  {
    question: "In which European city would you find Orly airport?",
    choice1: "London",
    choice2: "Rome",
    choice3: "Paris",
    choice4: "Nice",
    answer: 3
  },

];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("/Code Quiz Assignment 4/end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();