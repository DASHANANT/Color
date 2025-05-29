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
  { name: "steelblue", hex: "#4682b4" }
];

let correct = 0, total = 0;
const colorBox = document.getElementById("colorBox");
const optionsDiv = document.getElementById("options");
const feedbackDiv = document.getElementById("feedback");
const scoreP = document.getElementById("score");
const correctSound = new Audio("correct.mp3");
const wrongSound = new Audio("wrong.mp3");

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
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
      setTimeout(nextQuestion, 1500);
    };
    optionsDiv.appendChild(btn);
  });
}

window.onload = nextQuestion;
