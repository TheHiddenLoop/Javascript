document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("scratch-canvas");
  const ctx = canvas.getContext("2d");
  const container = document.getElementById("scratchCardContainer");
  const revealThreshold = 70;

  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;
  let scratchedPixels = 0;
  let totalPixels = 0;

  function setCanvasSize() {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    totalPixels = canvas.width * canvas.height;
    drawOverlay();
  }

  function drawOverlay() {
    ctx.fillStyle = "#c0c0c0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#555";
    ctx.font = "bold 20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Scratch and Win!", canvas.width / 2, canvas.height / 2);
  }

  function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    };
  }

  function getTouchPos(canvas, touchEvt) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: touchEvt.touches[0].clientX - rect.left,
      y: touchEvt.touches[0].clientY - rect.top,
    };
  }

  function scratch(x, y) {
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2, false);
    ctx.fill();
  }

  function handleStart(e) {
    isDrawing = true;
    container.classList.add("scratching");
    const pos = e.type.startsWith("touch")
      ? getTouchPos(canvas, e)
      : getMousePos(canvas, e);
    [lastX, lastY] = [pos.x, pos.y];
    scratch(lastX, lastY);
    e.preventDefault();
  }

  function handleMove(e) {
    if (!isDrawing) return;
    const pos = e.type.startsWith("touch")
      ? getTouchPos(canvas, e)
      : getMousePos(canvas, e);
    const currentX = pos.x;
    const currentY = pos.y;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(currentX, currentY);
    ctx.lineWidth = 50;
    ctx.lineCap = "round";
    ctx.globalCompositeOperation = "destination-out";
    ctx.stroke();

    [lastX, lastY] = [currentX, currentY];
    checkRevealPercentage();
    e.preventDefault();
  }

  function handleEnd() {
    if (!isDrawing) return;
    isDrawing = false;
    container.classList.remove("scratching");
    checkRevealPercentage(true);
  }

  function checkRevealPercentage(forceCheck = false) {
    if (!forceCheck && Math.random() < 0.8) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < data.length; i += 4) {
      if (data[i] === 0) {
        transparentPixels++;
      }
    }

    scratchedPixels = transparentPixels;
    const percentageScratched = (scratchedPixels / totalPixels) * 100;

    if (percentageScratched > revealThreshold) {
      revealAll();
    }
  }

  function revealAll() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.removeEventListener("mousedown", handleStart);
    canvas.removeEventListener("mousemove", handleMove);
    document.removeEventListener("mouseup", handleEnd);
    canvas.removeEventListener("touchstart", handleStart, { passive: false });
    canvas.removeEventListener("touchmove", handleMove, { passive: false });
    document.removeEventListener("touchend", handleEnd);
    console.log("Revealed!");
  }

  setCanvasSize();
  window.addEventListener("resize", setCanvasSize);
  canvas.addEventListener("mousedown", handleStart);
  canvas.addEventListener("mousemove", handleMove);
  document.addEventListener("mouseup", handleEnd);
  canvas.addEventListener("touchstart", handleStart, { passive: false });
  canvas.addEventListener("touchmove", handleMove, { passive: false });
  document.addEventListener("touchend", handleEnd);
});
