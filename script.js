const colors = [
  { name: "crimson", hex: "#dc143c" },
  { name: "teal", hex: "#008080" },
  { name: "olive", hex: "#808000" },
  { name: "goldenrod", hex: "#daa520" },
  { name: "indigo", hex: "#4b0082" },
  { name: "coral", hex: "#ff7f50" },
  { name: "turquoise", hex: "#40e0d0" },
  { name: "slateblue", hex: "#6a5acd" },
  { name: "salmon", hex: "#fa8072" },
  { name: "peru", hex: "#cd853f" },
  { name: "tomato", hex: "#ff6347" },
  { name: "orchid", hex: "#da70d6" },
  { name: "deeppink", hex: "#ff1493" },
  { name: "khaki", hex: "#f0e68c" },
  { name: "lavender", hex: "#e6e6fa" },
  { name: "plum", hex: "#dda0dd" },
  { name: "seagreen", hex: "#2e8b57" },
  { name: "dodgerblue", hex: "#1e90ff" },
  { name: "firebrick", hex: "#b22222" },
  { name: "steelblue", hex: "#4682b4" },
  { name: "beige", hex: "#f5f5dc" },
  { name: "maroon", hex: "#800000" },
  { name: "navy", hex: "#000080" },
  { name: "lime", hex: "#00ff00" },
  { name: "aqua", hex: "#00ffff" },
  { name: "fuchsia", hex: "#ff00ff" },
  { name: "purple", hex: "#800080" },
  { name: "cyan", hex: "#00ffff" },
  { name: "mintcream", hex: "#f5fffa" },
  { name: "mistyrose", hex: "#ffe4e1" },
  { name: "peachpuff", hex: "#ffdab9" },
  { name: "palegreen", hex: "#98fb98" },
  { name: "palevioletred", hex: "#db7093" },
  { name: "mediumorchid", hex: "#ba55d3" },
  { name: "mediumseagreen", hex: "#3cb371" },
  { name: "mediumslateblue", hex: "#7b68ee" },
  { name: "mediumspringgreen", hex: "#00fa9a" },
  { name: "mediumturquoise", hex: "#48d1cc" },
  { name: "mediumvioletred", hex: "#c71585" },
  { name: "midnightblue", hex: "#191970" },
  { name: "moccasin", hex: "#ffe4b5" },
  { name: "navajowhite", hex: "#ffdead" },
  { name: "oldlace", hex: "#fdf5e6" },
  { name: "papayawhip", hex: "#ffefd5" },
  { name: "powderblue", hex: "#b0e0e6" },
  { name: "rosybrown", hex: "#bc8f8f" },
  { name: "saddlebrown", hex: "#8b4513" },
  { name: "sandybrown", hex: "#f4a460" },
  { name: "sienna", hex: "#a0522d" },
  { name: "skyblue", hex: "#87ceeb" },
  { name: "snow", hex: "#fffafa" },
  { name: "tan", hex: "#d2b48c" },
  { name: "thistle", hex: "#d8bfd8" },
  { name: "wheat", hex: "#f5deb3" },
  { name: "whitesmoke", hex: "#f5f5f5" },
  { name: "yellowgreen", hex: "#9acd32" }
];

let correct = 0, total = 0;
let startTime, timerInterval;
const colorBox = document.getElementById("colorBox");
const optionsDiv = document.getElementById("options");
const feedbackDiv = document.getElementById("feedback");
const scoreP = document.getElementById("score");
const progressBar = document.getElementById("progressBar");
const timerP = document.getElementById("timer");
const correctSound = new Audio("correct.mp3");
const wrongSound = new Audio("wrong.mp3");

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function updateProgressBar() {
  const progress = (total / colors.length) * 100;
  progressBar.innerHTML = `<div style="width: ${progress}%"></div>`;
}

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    timerP.innerText = `Time: ${elapsedTime}s`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function nextQuestion() {
  feedbackDiv.innerText = "";
  const correctColor = colors[Math.floor(Math.random() * colors.length)];
  colorBox.style.background = correctColor.hex;

  let options = [correctColor.name];
  while (options.length < 4) {
    const rand = colors[Math.floor(Math.random() * colors.length)].name;
    if (!options.includes(rand)) options.push(rand);
  }
  shuffle(options);

  optionsDiv.innerHTML = "";
  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => {
      total++;
      if (opt === correctColor.name) {
        correct++;
        feedbackDiv.innerText = "✅ Correct!";
        correctSound.play();
      } else {
        feedbackDiv.innerText = `❌ Wrong! It was ${correctColor.name}`;
        wrongSound.play();
      }
      scoreP.innerText = `Score: ${correct} / ${total}`;
      updateProgressBar();
      setTimeout(nextQuestion, 1500);
    };
    optionsDiv.appendChild(btn);
  });
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (sidebar.style.left === "0px") {
    sidebar.style.left = "-250px";
  } else {
    sidebar.style.left = "0px";
  }
}

function showLastScores() {
  alert(`Last Scores:\nCorrect: ${correct}\nTotal: ${total}`);
}

function resetQuiz() {
  correct = 0;
  total = 0;
  scoreP.innerText = `Score: ${correct} / ${total}`;
  progressBar.innerHTML = `<div style="width: 0%"></div>`;
  stopTimer();
  startTimer();
  nextQuestion();
}

window.onload = () => {
  startTimer();
  nextQuestion();
};
