const coin = document.getElementById("coin");
const button = document.getElementById("toss-button");
const result = document.getElementById("result");

button.addEventListener("click", () => {
  button.disabled = true;
  result.style.opacity = 0;

  const isHeads = Math.random() < 0.5;
  const face = isHeads ? "Heads" : "Tails";
  const imageUrl = isHeads
    ? "https://media.geeksforgeeks.org/wp-content/uploads/20231016151817/heads.png"
    : "https://media.geeksforgeeks.org/wp-content/uploads/20231016151806/tails.png";

  coin.classList.add("flip");

  setTimeout(() => {
    coin.innerHTML = `<img src="${imageUrl}" alt="${face}" />`;
    coin.classList.remove("flip");

    setTimeout(() => {
      result.textContent = `Result: ${face}`;
      result.style.opacity = 1;
      button.disabled = false;
    }, 500);
  }, 1000);
});
