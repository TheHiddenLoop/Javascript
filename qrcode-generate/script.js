const input = document.getElementById("txt");
const canvas = document.getElementById("canvas");
const qrContainer = document.getElementById("qr-container");
const btn = document.getElementById("btn");
const reset = document.getElementById("reset");

btn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  qrContainer.classList.remove("hidden");

  canvas.width = 200;
  canvas.height = 200;

  QRCode.toCanvas(
    canvas,
    text,
    {
      width: 200,
      margin: 1,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
      errorCorrectionLevel: "H",
    },
    (err) => {
      if (err) {
        console.error(err);
        qrContainer.classList.add("hidden");
      }
    }
  );
});

reset.addEventListener("click", () => {
  qrContainer.classList.add("hidden");

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  input.value = "";
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    btn.click();
  }
});
