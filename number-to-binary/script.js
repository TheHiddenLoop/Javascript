const decimalInput = document.getElementById("decimalInput");
const convertButton = document.getElementById("convertButton");
const binaryOutput = document.getElementById("binaryOutput");

convertButton.addEventListener("click", () => {
  const decimalValue = parseInt(decimalInput.value, 10);

  if (isNaN(decimalValue) || decimalValue < 0) {
    binaryOutput.textContent = "Please enter a non-negative whole number.";
    binaryOutput.classList.remove("text-green-700");
    binaryOutput.classList.add("text-red-600");
  } else {
    binaryOutput.textContent = decimalValue.toString(2);
    binaryOutput.classList.remove("text-red-600");
    binaryOutput.classList.add("text-green-700");
  }
});
