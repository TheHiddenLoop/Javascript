const targetDate = new Date("2026-01-01T00:00:00");

function updateCountDown() {
  const currentDate = new Date();
  const timeDiff = targetDate - currentDate;

  if (timeDiff < 0) {
    document.getElementById("countDown").innerHTML = "Happy New Year 2026!";
    return;
  }

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff / 1000) % 60);

  document.getElementById(
    "countDown"
  ).innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

updateCountDown();
setInterval(updateCountDown, 1000);
