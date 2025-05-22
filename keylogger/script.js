const logDiv = document.getElementById("log");
const stateDiv = document.getElementById("state");
const startBtn = document.getElementById("str");
const stopBtn = document.getElementById("stop");
const downloadBtn = document.getElementById("download");

let keyHistory = [];

startBtn.addEventListener("click", () => {
  document.addEventListener("keydown", handleDown);
  document.addEventListener("keyup", handleUp);
  startBtn.disabled = true;
  stopBtn.disabled = false;
  downloadBtn.style.display = "none";
  keyHistory = [];
  logDiv.textContent = "";
  stateDiv.textContent = "Logging started...";
});

stopBtn.addEventListener("click", () => {
  document.removeEventListener("keydown", handleDown);
  document.removeEventListener("keyup", handleUp);
  stateDiv.textContent = "Stopped logging.";
  startBtn.disabled = false;
  stopBtn.disabled = true;
  downloadBtn.style.display = "inline-block";
});

downloadBtn.addEventListener("click", () => {
  const blob = new Blob([keyHistory.join("\n")], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "keylogger-history.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

function handleDown(e) {
  const entry = `Key "${e.key}" pressed down`;
  logDiv.textContent = entry;
  stateDiv.textContent = "Key is down";
  keyHistory.push(entry);
}

function handleUp(e) {
  const entry = `Key "${e.key}" released`;
  logDiv.textContent = entry;
  stateDiv.textContent = "Key is up";
  keyHistory.push(entry);
}
