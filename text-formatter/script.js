const inputText = document.getElementById("inputText");
const outputResult = document.getElementById("outputResult");
const boldBtn = document.getElementById("boldBtn");
const italicBtn = document.getElementById("italicBtn");
const underlineBtn = document.getElementById("underlineBtn");
const uppercaseBtn = document.getElementById("uppercaseBtn");
const lowercaseBtn = document.getElementById("lowercaseBtn");
const capitalizeBtn = document.getElementById("capitalizeBtn");

let currentText = "";
let boldActive = false;
let italicActive = false;
let underlineActive = false;

const updateOutput = () => {
  let formattedText = currentText;

  if (boldActive) {
    formattedText = `<strong>${formattedText}</strong>`;
  }
  if (italicActive) {
    formattedText = `<em>${formattedText}</em>`;
  }
  if (underlineActive) {
    formattedText = `<u>${formattedText}</u>`;
  }
  outputResult.innerHTML = formattedText;
};

inputText.addEventListener("input", (e) => {
  currentText = e.target.value;
  updateOutput();
});

boldBtn.addEventListener("click", () => {
  boldActive = !boldActive;
  updateOutput();
});

italicBtn.addEventListener("click", () => {
  italicActive = !italicActive;
  
  updateOutput();
});

underlineBtn.addEventListener("click", () => {
  underlineActive = !underlineActive;
  updateOutput();
});

uppercaseBtn.addEventListener("click", () => {
  currentText = currentText.toUpperCase();
  inputText.value = currentText;
  updateOutput();
});

lowercaseBtn.addEventListener("click", () => {
  currentText = currentText.toLowerCase();
  inputText.value = currentText;
  updateOutput();
});

capitalizeBtn.addEventListener("click", () => {
  currentText = currentText.replace(/\b\w/g, (char) => char.toUpperCase());
  inputText.value = currentText;
  updateOutput();
});

window.onload = updateOutput;
