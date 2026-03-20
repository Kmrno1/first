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
const overlay = document.getElementById("birthday-overlay");
const startButton = document.getElementById("start-celebration");
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

let currentIndex = 0;
let fireworksActive = false;
let fireworks = [];
let particles = [];

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

const resizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

const randomColor = () => {
  const palette = ["#ff6f91", "#ffc75f", "#845ec2", "#2c73d2", "#f9a826", "#c34a36"];
  return palette[Math.floor(Math.random() * palette.length)];
};

const launchFirework = () => {
  const startX = Math.random() * canvas.width;
  fireworks.push({
    x: startX,
    y: 0,
    targetY: canvas.height * (0.4 + Math.random() * 0.2),
    color: randomColor(),
    speed: 4 + Math.random() * 3,
  });
};

const explode = (firework) => {
  const count = 30 + Math.floor(Math.random() * 20);
  for (let i = 0; i < count; i += 1) {
    const angle = (Math.PI * 2 * i) / count;
    const speed = 2 + Math.random() * 3;
    particles.push({
      x: firework.x,
      y: firework.y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      color: firework.color,
    });
  }
};

const updateFireworks = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fireworks = fireworks.filter((firework) => {
    firework.y += firework.speed;
    ctx.fillStyle = firework.color;
    ctx.beginPath();
    ctx.arc(firework.x, firework.y, 2.5, 0, Math.PI * 2);
    ctx.fill();
    if (firework.y >= firework.targetY) {
      explode(firework);
      return false;
    }
    return true;
  });

  particles = particles.filter((particle) => {
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.vy += 0.03;
    particle.alpha -= 0.015;
    if (particle.alpha <= 0) {
      return false;
    }
    ctx.globalAlpha = particle.alpha;
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    return true;
  });

  if (fireworksActive) {
    if (Math.random() < 0.08) {
      launchFirework();
    }
    requestAnimationFrame(updateFireworks);
  }
};

const startCelebration = () => {
  fireworksActive = true;
  overlay.style.display = "none";
  resizeCanvas();
  for (let i = 0; i < 5; i += 1) {
    launchFirework();
  }
  updateFireworks();
};

startButton.addEventListener("click", startCelebration);
window.addEventListener("resize", resizeCanvas);

updateQuestion();
resizeCanvas();
