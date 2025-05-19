const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const recordedVideo = document.getElementById("recordedVideo");
const downloadLink = document.getElementById("downloadLink");

let mediaRecorder = [];
let recoredChunks = [];

startBtn.addEventListener("click", async () => {
  try {
    const streem = await navigator.mediaDevices.getDisplayMedia({
      video: { cursor: "motion" },
      audio: true,
    });

    mediaRecorder = new MediaRecorder(streem, {
      mimeType: "video/webm; codecs=vp9",
    });
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recoredChunks.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(recoredChunks, { type: "video/webm" });
      recoredChunks = [];
      mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      startBtn.style.display = "inline-block";
      stopBtn.style.display = "none";
      const videoURL = URL.createObjectURL(blob);
      recordedVideo.src = videoURL;
      downloadLink.href = videoURL;
      downloadLink.innerHTML = `<i class="fa-solid fa-download download"></i>`;
    };

    mediaRecorder.start();
    startBtn.style.display = "none";
    stopBtn.style.display = "inline-block";
  } catch (error) {
    console.log(error);
  }
});

stopBtn.addEventListener("click", () => {
  mediaRecorder.stop();
  mediaRecorder.stream.getTracks().forEach((track) => track.stop());
  startBtn.style.display = "inline-block";
  stopBtn.style.display = "none";
  recordedVideo.style.display = "inline-block";
});


