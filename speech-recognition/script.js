const toggleBtn = document.getElementById("toggle-btn");
const output = document.getElementById("output");
const dots=document.getElementById("typing-dots");


const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  alert("Not supported browser.");
} else {
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";
  let isListening = false;
  toggleBtn.addEventListener("click", () => {
    if (!isListening) {
      recognition.start();
      toggleBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
      toggleBtn.classList.add("pulsing");
      dots.style.display="none";
    } else {
      recognition.stop();
      toggleBtn.innerHTML = `<i class="fa-solid fa-microphone"></i>`;
      toggleBtn.classList.remove("pulsing");
    }
    isListening = !isListening;
  });

  recognition.onresult = (e) => {
    let transcript = "";
    for (let i = e.resultIndex; i < e.results.length; i++) {
      transcript += e.results[i][0].transcript;
    }
    output.textContent = transcript;
  };

  recognition.onerror = (event) => {
    console.error("Speech Recognition Error", event.error);
  };
}
