function updateClock() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = hours12(now.getHours());

  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = hours * 30 + minutes * 0.5;

  document.getElementById(
    "second"
  ).style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;
  document.getElementById(
    "minute"
  ).style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
  document.getElementById(
    "hour"
  ).style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;

  const date = document.getElementById("date");
  date.innerHTML = `${now.getDate()}-${now.getMonth() + 1}-${now
    .getFullYear()
    .toString()
    .slice(-2)}`;
}

function hours12(hours) {
  return hours % 12 || 12;
}

function createSecondDots() {
  const container = document.querySelector(".second-dots");

  for (let i = 0; i < 60; i++) {
    const dot = document.createElement("div");
    dot.className = "second-dot";
    if (i % 5 === 0) {
      dot.classList.add("hour-marker");
    }
    const angle = i * 6;
    dot.style.transform = `rotate(${angle}deg) translateY(-140px)`;
    container.appendChild(dot);
  }
}

function initClock() {
  createSecondDots();
  updateClock();
  setInterval(updateClock, 1000);
}

window.addEventListener("DOMContentLoaded", initClock);
