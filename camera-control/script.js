let stream;
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const snapshot = document.getElementById("snapshot");

document.getElementById("open").addEventListener("click", async () => {
  stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;
  document.getElementById("open").style.display = "none";
  document.getElementById("close").style.display = "block";

  document.getElementById("capture").style.display = "block";
});

document.getElementById("close").addEventListener("click", () => {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
    video.srcObject = null;
  }
  document.getElementById("open").style.display = "block";
  document.getElementById("close").style.display = "none";
  document.getElementById("capture").style.display = "none";
});

document.getElementById("capture").addEventListener("click", (e) => {
  document.getElementById("video").style.display = "none";
  snapshot.style.display = "block";
  document.getElementById("save").style.display = "block";
  document.getElementById("close").style.display = "none";

  e.preventDefault();
  const context = canvas.getContext("2d");
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  snapshot.src = canvas.toDataURL("image/png");
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
    video.srcObject = null;
  }
  document.getElementById("capture").style.display = "none";
  document.getElementById("reset").style.display = "block";
});
document.getElementById("save").addEventListener("click", () => {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "snapshot.png";
  link.click();
});

document.getElementById("reset").addEventListener("click", () => {
  snapshot.src = "";
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  snapshot.style.display = "none";
  document.getElementById("video").style.display = "block";
  document.getElementById("save").style.display = "none";
  document.getElementById("reset").style.display = "none";
  document.getElementById("open").style.display = "block";
});
