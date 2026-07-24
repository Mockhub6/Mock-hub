let questions = JSON.parse(localStorage.getItem("questions")) || [
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

let current = 0;
const TEST_TIME = 30;
let timeLeft = TEST_TIME * 60;
let answers = new Array(questions.length).fill(null);
function startTimer() {
  const timer = setInterval(function () {
    if (timeLeft < 0) return;
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    document.getElementById("timer").innerHTML =
      "⏱ " + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

    if (timeLeft <= 0) {
      timeLeft = 0;
      clearInterval(timer);
      submitTest();
      return;
    }

    timeLeft--;
  }, 1000);
}

function loadQuestion() {
document.getElementById("questionNo").innerText =
`Question ${current + 1} of ${questions.length}`;

document.getElementById("question").innerText =
questions[current].question;

let html = "";
questions[current].options.forEach((opt, i) => {
html += `
<label>
<input type="radio" name="option" value="${i}" ${answers[current] == i ? "checked" : ""}>
${opt}
</label><br><br>`;
});
document.getElementById("options").innerHTML = html;
}

function saveAnswer() {
let selected = document.querySelector('input[name="option"]:checked');
if (selected) answers[current] = Number(selected.value);
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

function submitTest() {
saveAnswer();
let score = 0;
answers.forEach((a, i) => {
if (a === questions[i].answer) score++;
});
document.getElementById("result").style.display = "block";
document.getElementById("resultText").innerHTML =
"आपका स्कोर: " + score + " / " + questions.length +
"<br>प्रतिशत: " + Math.round((score / questions.length) * 100) + "%";
document.getElementById("result").scrollIntoView({ behavior: "smooth" });
}
function createPalette() {
  let html = "";

  questions.forEach((q, i) => {
    html += `<button onclick="current=${i};loadQuestion()">${i + 1}</button>`;
  });

  document.getElementById("palette").innerHTML = html;
}

window.onload = function () {
  document.getElementById("timer").innerHTML = "🕒 " + TEST_TIME + ":00";
  loadQuestion();
  createPalette();
  startTimer();
};
console.log("test.js loaded");
console.log(questions);
loadQuestion();
