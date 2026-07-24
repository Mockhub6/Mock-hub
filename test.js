let questions = [
  {
    question: "भारत की राजधानी क्या है?",
    options: ["मुंबई", "दिल्ली", "चेन्नई", "जयपुर"],
    answer: 1
  },
  {
    question: "2 + 2 = ?",
    options: ["3", "4", "5", "6"],
    answer: 1
  },
  {
    question: "भारत का राष्ट्रीय पशु कौन है?",
    options: ["शेर", "बाघ", "हाथी", "घोड़ा"],
    answer: 1
  }
];

const TEST_TIME = 30;
let timeLeft = TEST_TIME * 60;
let current = 0;
let answers = new Array(questions.length).fill(null);

function loadQuestion() {
  document.getElementById("questionNo").innerText =
    `Question ${current + 1} of ${questions.length}`;

  document.getElementById("question").innerText =
    questions[current].question;

  let html = "";

  questions[current].options.forEach((opt, i) => {
    html += `
      <label>
        <input type="radio" name="option" value="${i}"
        ${answers[current] === i ? "checked" : ""}>
        ${opt}
      </label><br><br>
    `;
  });

  document.getElementById("options").innerHTML = html;
}

function saveAnswer() {
  const selected = document.querySelector('input[name="option"]:checked');
  if (selected) {
    answers[current] = Number(selected.value);
  }
}

function nextQuestion() {
  saveAnswer();
  if (current < questions.length - 1) {
    current++;
    loadQuestion();
  }
}

function prevQuestion() {
  saveAnswer();
  if (current > 0) {
    current--;
    loadQuestion();
  }
}
function createPalette() {
  let html = "";

  questions.forEach((q, i) => {
    html += `
      <button onclick="gotoQuestion(${i})">
        ${i + 1}
      </button>
    `;
  });

  document.getElementById("palette").innerHTML = html;
}

function gotoQuestion(index) {
  saveAnswer();
  current = index;
  loadQuestion();
}

function startTimer() {
  const timer = setInterval(() => {

    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    document.getElementById("timer").innerText =
      `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      submitTest();
      return;
    }

    timeLeft--;
  }, 1000);
}

function submitTest() {

  saveAnswer();

  let score = 0;

  answers.forEach((ans, i) => {
    if (ans === questions[i].answer) {
      score++;
    }
  });

  document.getElementById("result").style.display = "block";

  document.getElementById("resultText").innerHTML =
    `आपका स्कोर: <b>${score}</b> / ${questions.length}<br>
     प्रतिशत: <b>${Math.round(score * 100 / questions.length)}%</b>`;
}

window.onload = function () {
  loadQuestion();
  createPalette();
  startTimer();
};
