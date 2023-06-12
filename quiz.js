const questions = [
  {
    question: "Periyodik tabloda hidrojen atomunun simgesi nedir?",
    options: ["H", "O", "He", "C"],
    correctAnswer: 0
  },
  {
    question: "İlk 30 element arasında kaç alkali metal bulunur?",
    options: ["3", "5", "2", "4"],
    correctAnswer: 2
  },
  {
    question: "Periyodik tabloda simgesi 'Li' olan elementin adı nedir?",
    options: ["Lityum", "Bor", "Helyum", "Fosfor"],
    correctAnswer: 0
  },
  {
    question:
      "İlk 30 element arasında en yüksek atom numarasına sahip olan element hangisidir?",
    options: ["F", "Ca", "Ni", "Zn"],
    correctAnswer: 3
  },
  {
    question:
      "Periyodik tabloda 'Na' simgesiyle gösterilen elementin İngilizce adı nedir?",
    options: ["Sodium", "Nitrogen", "Nickel", "Neodymium"],
    correctAnswer: 0
  },
  {
    question:
      "İlk 30 element arasında yer alan gaz halindeki elementlerin sayısı kaçtır?",
    options: ["6", "8", "4", "10"],
    correctAnswer: 1
  },
  {
    question:
      "Periyodik tabloda 'K' simgesiyle gösterilen elementin adı nedir?",
    options: ["Potasyum", "Kalsiyum", "Kobalt", "Klor"],
    correctAnswer: 0
  },
  {
    question: "İlk 30 element arasında yer alan en hafif element hangisidir?",
    options: ["Li", "Be", "C", "B"],
    correctAnswer: 0
  },
  {
    question:
      "Periyodik tabloda 'Mg' simgesiyle gösterilen elementin adı nedir?",
    options: ["Magnezyum", "Manganez", "Mağnezyum", "Molibden"],
    correctAnswer: 0
  },
  {
    question:
      "İlk 30 element arasında yer alan soygaz elementlerin sayısı kaçtır?",
    options: ["6", "2", "4", "8"],
    correctAnswer: 2
  },
  {
    question:
      "Periyodik tabloda 'Fe' simgesiyle gösterilen elementin adı nedir?",
    options: ["Demir", "Flor", "Fosfor", "Kükürt"],
    correctAnswer: 0
  },
  {
    question: "İlk 30 element arasında yer alan metaloidlerin sayısı kaçtır?",
    options: ["1", "4", "2", "3"],
    correctAnswer: 1
  },
  {
    question:
      "Periyodik tabloda 'Cu' simgesiyle gösterilen elementin adı nedir?",
    options: ["Bakır", "Cıva", "Krom", "Kalsiyum"],
    correctAnswer: 0
  },
  {
    question: "İlk 30 element arasında yer alan halojenlerin sayısı kaçtır?",
    options: ["5", "4", "3", "2"],
    correctAnswer: 3
  },
  {
    question:
      "Periyodik tabloda 'Ag' simgesiyle gösterilen elementin adı nedir?",
    options: ["Gümüş", "Altın", "Çinko", "Galyum"],
    correctAnswer: 0
  },
  {
    question:
      "İlk 30 element arasında yer alan geçiş metallerin sayısı kaçtır?",
    options: ["18", "10", "8", "12"],
    correctAnswer: 3
  },
  {
    question:
      "Periyodik tabloda 'Zn' simgesiyle gösterilen elementin adı nedir?",
    options: ["Çinko", "Çelik", "Zirkonyum", "Zeytin"],
    correctAnswer: 0
  },
  {
    question:
      "İlk 30 element arasında yer alan metal elementlerin sayısı kaçtır?",
    options: ["22", "18", "16", "20"],
    correctAnswer: 3
  },
  {
    question:
      "Periyodik tabloda 'Sn' simgesiyle gösterilen elementin adı nedir?",
    options: ["Kalay", "Silisyum", "Talyum", "Alüminyum"],
    correctAnswer: 0
  },
  {
    question: "İlk 30 element arasında yer alan ametallerin sayısı kaçtır?",
    options: ["10", "12", "8", "6"],
    correctAnswer: 3
  }
];

let currentQuestion = 0;
let score = 0;
let lives = 3;

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const scoreElement = document.getElementById("score");
const submitButton = document.getElementById("submit-btn");

function loadQuestion() {
  const currentQuizQuestion = questions[currentQuestion];
  questionElement.innerText = currentQuizQuestion.question;

  optionsContainer.innerHTML = "";
  for (let i = 0; i < currentQuizQuestion.options.length; i++) {
    const option = document.createElement("button");
    option.className = "option";
    option.innerText = currentQuizQuestion.options[i];
    option.addEventListener("click", checkAnswer);
    optionsContainer.appendChild(option);
  }

  scoreElement.innerText =
    "Skor: " + score + " | Soru: " + Number(currentQuestion + 1);
}

function checkAnswer(event) {
  const selectedOption = event.target;
  const selectedAnswer = Array.from(optionsContainer.children).indexOf(
    selectedOption
  );
  const currentQuizQuestion = questions[currentQuestion];

  if (selectedAnswer === currentQuizQuestion.correctAnswer) {
    selectedOption.className = "option correct";
    score++;
  } else {
    selectedOption.className = "option incorrect";
    lives--;
  }

  disableOptions();
  submitButton.innerText = "Sonraki Soru";

  if (currentQuestion === questions.length - 1) {
    submitButton.innerText = "Sonuçları Göster";
  }

  submitButton.removeEventListener("click", checkAnswer);
  submitButton.addEventListener("click", nextQuestion);
}

function disableOptions() {
  const options = Array.from(optionsContainer.children);
  options.forEach((option) => {
    option.disabled = true;
    if (option.className === "option") {
      option.className = "option incorrect";
    }
  });
}

function enableOptions() {
  const options = Array.from(optionsContainer.children);
  options.forEach((option) => {
    option.disabled = false;
    if (option.className === "option incorrect") {
      option.className = "option";
    }
  });
}

function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion();
    enableOptions();
    submitButton.innerText = "Cevapla";
    submitButton.removeEventListener("click", nextQuestion);
    submitButton.addEventListener("click", checkAnswer);
  } else {
    showResults();
  }
}

function showResults() {
  questionElement.innerText = "Quiz Tamamlandı!";
  optionsContainer.innerHTML = "";
  scoreElement.innerText = "Sonuç: " + score + " / " + questions.length;

  if (score >= questions.length - 5) {
    scoreElement.style.color = "green";
  } else {
    scoreElement.style.color = "red";
  }

  submitButton.style.display = "none";
}

loadQuestion();
