const input = document.getElementById("txt");
const copy = document.getElementById("copy");
const btn = document.getElementById("btn");
const toast = document.getElementById("toast");

btn.addEventListener("click", randomPassword);

function randomPassword() {
  let length = 15;
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  const all = upper + lower + digits + symbols;

  let password = [
    upper[Math.floor(Math.random() * upper.length)],
    lower[Math.floor(Math.random() * lower.length)],
    digits[Math.floor(Math.random() * digits.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
  ];

  for (let i = 4; i < length; i++) {
    password.push(all[Math.floor(Math.random() * all.length)]);
  }
  password = password.sort(() => Math.random() - 0.5);

  let generatedPass = password.join("");
  return (input.value = generatedPass);
}

copy.addEventListener("click", () => {
  navigator.clipboard
    .writeText(input.value)
    .then(() => {
      showToast("Password Copied.");
    })
    .catch((err) => console.error("Failed to copy:", err));
});

function showToast(message) {
  toast.textContent = message;
  toast.style.opacity = 1;
  toast.style.top = "50px";
  setTimeout(() => {
    toast.style.opacity = 0;
    toast.style.top = "30px";
  }, 3000);
}
