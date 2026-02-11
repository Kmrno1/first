const questions = [
  "What is your favorite memory of us together?",
  "Which song reminds you of our love story?",
  "What is one thing that always makes you smile?",
  "If today could be one perfect moment, what would it be?",
  "What adventure do you want us to take next?",
  "Finish this sentence: I feel most loved when...",
];

const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const nextButton = document.getElementById("next-button");
const progressCount = document.getElementById("progress-count");
const completion = document.getElementById("completion");
const questionnaire = document.querySelector(".questionnaire");

let currentIndex = 0;

const updateQuestion = () => {
  questionEl.textContent = questions[currentIndex];
  progressCount.textContent = `${currentIndex + 1} / ${questions.length}`;
  answerEl.value = "";
  answerEl.focus();
  nextButton.textContent =
    currentIndex === questions.length - 1 ? "Finish" : "Next question";
};

nextButton.addEventListener("click", () => {
  if (currentIndex < questions.length - 1) {
    currentIndex += 1;
    updateQuestion();
  } else {
    questionnaire.setAttribute("hidden", "true");
    completion.removeAttribute("hidden");
  }
});

updateQuestion();
