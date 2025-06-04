const colors = [
  { name: "Crimson", hex: "#dc143c", base: "Red" },
  { name: "Teal", hex: "#008080", base: "Green" },
  { name: "Olive", hex: "#808000", base: "Green" },
  { name: "Goldenrod", hex: "#daa520", base: "Yellow" },
  { name: "Indigo", hex: "#4b0082", base: "Blue" },
  { name: "Coral", hex: "#ff7f50", base: "Orange" },
  { name: "Turquoise", hex: "#40e0d0", base: "Blue" },
  { name: "Slate Blue", hex: "#6a5acd", base: "Blue" },
  { name: "Salmon", hex: "#fa8072", base: "Pink" },
  { name: "Peru", hex: "#cd853f", base: "Brown" },
  { name: "Tomato", hex: "#ff6347", base: "Red" },
  { name: "Orchid", hex: "#da70d6", base: "Purple" },
  { name: "Deep Pink", hex: "#ff1493", base: "Pink" },
  { name: "Khaki", hex: "#f0e68c", base: "Yellow" },
  { name: "Lavender", hex: "#e6e6fa", base: "Purple" },
  { name: "Plum", hex: "#dda0dd", base: "Purple" },
  { name: "Sea Green", hex: "#2e8b57", base: "Green" },
  { name: "Dodger Blue", hex: "#1e90ff", base: "Blue" },
  { name: "Firebrick", hex: "#b22222", base: "Red" },
  { name: "Steel Blue", hex: "#4682b4", base: "Blue" },
  { name: "Beige", hex: "#f5f5dc", base: "Brown" },
  { name: "Maroon", hex: "#800000", base: "Red" },
  { name: "Navy", hex: "#000080", base: "Blue" },
  { name: "Lime", hex: "#00ff00", base: "Green" },
  { name: "Aqua", hex: "#00ffff", base: "Blue" },
  { name: "Fuchsia", hex: "#ff00ff", base: "Pink" },
  { name: "Purple", hex: "#800080", base: "Purple" },
  { name: "Cyan", hex: "#00ffff", base: "Blue" },
  { name: "Mint Cream", hex: "#f5fffa", base: "Green" },
  { name: "Misty Rose", hex: "#ffe4e1", base: "Pink" },
  { name: "Peach Puff", hex: "#ffdab9", base: "Orange" },
  { name: "Pale Green", hex: "#98fb98", base: "Green" },
  { name: "Pale Violet Red", hex: "#db7093", base: "Pink" },
  { name: "Medium Orchid", hex: "#ba55d3", base: "Purple" },
  { name: "Medium Sea Green", hex: "#3cb371", base: "Green" },
  { name: "Medium Slate Blue", hex: "#7b68ee", base: "Blue" },
  { name: "Medium Spring Green", hex: "#00fa9a", base: "Green" },
  { name: "Medium Turquoise", hex: "#48d1cc", base: "Blue" },
  { name: "Medium Violet Red", hex: "#c71585", base: "Pink" },
  { name: "Midnight Blue", hex: "#191970", base: "Blue" },
  { name: "Moccasin", hex: "#ffe4b5", base: "Yellow" },
  { name: "Navajo White", hex: "#ffdead", base: "Yellow" },
  { name: "Old Lace", hex: "#fdf5e6", base: "Yellow" },
  { name: "Papaya Whip", hex: "#ffefd5", base: "Yellow" },
  { name: "Powder Blue", hex: "#b0e0e6", base: "Blue" },
  { name: "Rosy Brown", hex: "#bc8f8f", base: "Brown" },
  { name: "Saddle Brown", hex: "#8b4513", base: "Brown" },
  { name: "Sandy Brown", hex: "#f4a460", base: "Brown" },
  { name: "Sienna", hex: "#a0522d", base: "Brown" },
  { name: "Sky Blue", hex: "#87ceeb", base: "Blue" },
  { name: "Snow", hex: "#fffafa", base: "White" },
  { name: "Tan", hex: "#d2b48c", base: "Brown" },
  { name: "Thistle", hex: "#d8bfd8", base: "Purple" },
  { name: "Wheat", hex: "#f5deb3", base: "Yellow" },
  { name: "White Smoke", hex: "#f5f5f5", base: "White" },
  { name: "Yellow Green", hex: "#9acd32", base: "Green" }
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
  progressBar.style.width = `${progress}%`;
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
    btn.className = "btn btn-outline-primary btn-block";
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

function showHint() {
  const correctColor = colors.find(color => color.hex === colorBox.style.background);
  alert(`Hint: This color is a shade of ${correctColor.base}`);
}

function resetQuiz() {
  correct = 0;
  total = 0;
  scoreP.innerText = `Score: ${correct} / ${total}`;
  progressBar.style.width = "0%";
  stopTimer();
  startTimer();
  nextQuestion();
}

function startIDColorQuiz() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("game").style.display = "block";
  resetQuiz();
}

function startGuessColorQuiz() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("game").style.display = "block";
  nextGuessColorQuestion();
}

function nextGuessColorQuestion() {
  feedbackDiv.innerText = "";
  const correctColor = colors[Math.floor(Math.random() * colors.length)];
  colorBox.innerText = correctColor.name;

  let options = [correctColor.hex];
  while (options.length < 4) {
    const rand = colors[Math.floor(Math.random() * colors.length)].hex;
    if (!options.includes(rand)) options.push(rand);
  }
  shuffle(options);

  optionsDiv.innerHTML = "";
  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline-primary btn-block";
    btn.style.background = opt;
    btn.onclick = () => {
      total++;
      if (opt === correctColor.hex) {
        correct++;
        feedbackDiv.innerText = "✅ Correct!";
        correctSound.play();
      } else {
        feedbackDiv.innerText = `❌ Wrong! It was ${correctColor.name}`;
        wrongSound.play();
      }
      scoreP.innerText = `Score: ${correct} / ${total}`;
      updateProgressBar();
      setTimeout(nextGuessColorQuestion, 1500);
    };
    optionsDiv.appendChild(btn);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const colorContainer = document.getElementById("colorContainer");

  colors.forEach(color => {
    const colorStrip = document.createElement("div");
    colorStrip.className = "color-strip";
    colorStrip.style.background = color.hex;
    colorStrip.textContent = `${color.name} (${color.hex})`;
    colorContainer.appendChild(colorStrip);
  });
});

window.onload = () => {
  startTimer();
  nextQuestion();
};