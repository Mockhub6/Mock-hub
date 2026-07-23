const questions = [
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
alert("आपका स्कोर: " + score + " / " + questions.length);
}

window.onload = loadQuestion;
