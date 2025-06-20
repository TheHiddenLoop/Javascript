function calculateBMI() {
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value) / 100;

  const resultDiv = document.getElementById("result");

  if (!weight || !height || weight <= 0 || height <= 0) {
    resultDiv.innerHTML = "Please enter valid weight and height.";
    return;
  }

  const bmi = (weight / (height * height)).toFixed(2);
  let category = "";

  if (bmi < 18.5) {
    category = "Underweight";
  } else if (bmi < 24.9) {
    category = "Normal weight";
  } else if (bmi < 29.9) {
    category = "Overweight";
  } else {
    category = "Obese";
  }

  resultDiv.innerHTML = `Your BMI is <strong>${bmi}</strong> <br> <span class="category">${category}</span>`;
}
