document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const colorPicker = document.getElementById("colorPicker")
    const canvasColor = document.getElementById("canvasColor")
    const canvas = document.getElementById("myCanvas")
    const clearButton = document.getElementById("clearButton")
    const saveButton = document.getElementById("saveButton")
    const retrieveButton = document.getElementById("retrieveButton")
    const lineWidth = document.getElementById("lineWidth")
    const penMode = document.getElementById("penMode")
    const eraserMode = document.getElementById("eraserMode")
    const colorPreview = document.getElementById("colorPreview")
    const bgColorPreview = document.getElementById("bgColorPreview")
    const toast = document.getElementById("toast")
    const toastMessage = document.getElementById("toastMessage")
    const canvasOverlay = document.getElementById("canvasOverlay")
  
    // Canvas setup
    const ctx = canvas.getContext("2d")
    let isDrawing = false
    let lastX = 0
    let lastY = 0
    let currentColor = "#ffffff"
    let currentBgColor = "#1f2937"
    let currentLineWidth = 5
    let currentMode = "pen"
  
    // Initialize canvas
    initCanvas()
  
    // Make canvas responsive
    window.addEventListener("resize", resizeCanvas)
  
    // Update color previews
    colorPreview.style.backgroundColor = colorPicker.value
    bgColorPreview.style.backgroundColor = canvasColor.value
  
    // Event Listeners
    colorPicker.addEventListener("input", (e) => {
      currentColor = e.target.value
      colorPreview.style.backgroundColor = currentColor
      if (currentMode === "pen") {
        ctx.strokeStyle = currentColor
      }
    })
  
    canvasColor.addEventListener("input", (e) => {
      currentBgColor = e.target.value
      bgColorPreview.style.backgroundColor = currentBgColor
      clearCanvas()
    })
  
    lineWidth.addEventListener("change", (e) => {
      currentLineWidth = Number.parseInt(e.target.value)
      ctx.lineWidth = currentLineWidth
    })
  
    penMode.addEventListener("click", () => {
      currentMode = "pen"
      ctx.strokeStyle = currentColor
      canvas.style.cursor = "crosshair"
      penMode.classList.add("active")
      eraserMode.classList.remove("active")
    })
  
    eraserMode.addEventListener("click", () => {
      currentMode = "eraser"
      ctx.strokeStyle = currentBgColor
      // Use the provided FontAwesome eraser SVG
      const eraserSvg = `
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="24" height="24" fill="#ffffff">
  <path d="M290.7 57.4L57.4 290.7c-25 25-25 65.5 0 90.5l80 80c12 12 28.3 18.7 45.3 18.7L288 480l9.4 0L512 480c17.7 0 32-14.3 32-32s-14.3-32-32-32l-124.1 0L518.6 285.3c25-25 25-65.5 0-90.5L381.3 57.4c-25-25-65.5-25-90.5 0zM297.4 416l-9.4 0-105.4 0-80-80L227.3 211.3 364.7 348.7 297.4 416z"/>
</svg>
          `
      const encodedSvg = encodeURIComponent(eraserSvg)
      canvas.style.cursor = `url("data:image/svg+xml,${encodedSvg}") 12 12, auto`
      penMode.classList.remove("active")
      eraserMode.classList.add("active")
    })
  
    canvas.addEventListener("mousedown", startDrawing)
    canvas.addEventListener("touchstart", handleTouchStart)
  
    canvas.addEventListener("mousemove", draw)
    canvas.addEventListener("touchmove", handleTouchMove)
  
    canvas.addEventListener("mouseup", stopDrawing)
    canvas.addEventListener("touchend", stopDrawing)
    canvas.addEventListener("mouseout", stopDrawing)
  
    clearButton.addEventListener("click", () => {
      clearCanvas()
      showToast("Canvas cleared")
    })
  
    saveButton.addEventListener("click", saveSignature)
  
    retrieveButton.addEventListener("click", retrieveSignature)
  
    // Functions
    function initCanvas() {
      resizeCanvas()
      ctx.fillStyle = currentBgColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = currentColor
      ctx.lineWidth = currentLineWidth
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
    }
  
    function resizeCanvas() {
      const tempCanvas = document.createElement("canvas")
      const tempCtx = tempCanvas.getContext("2d")
      tempCanvas.width = canvas.width
      tempCanvas.height = canvas.height
      tempCtx.drawImage(canvas, 0, 0)
  
      const containerWidth = canvas.parentElement.clientWidth
      canvas.width = containerWidth
      canvas.height = containerWidth * 0.5
  
      ctx.fillStyle = currentBgColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, canvas.width, canvas.height)
  
      ctx.strokeStyle = currentMode === "pen" ? currentColor : currentBgColor
      ctx.lineWidth = currentLineWidth
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
    }
  
    function startDrawing(e) {
      isDrawing = true
      const rect = canvas.getBoundingClientRect()
      lastX = e.clientX - rect.left
      lastY = e.clientY - rect.top
    }
  
    function handleTouchStart(e) {
      e.preventDefault()
      if (e.touches.length === 1) {
        const touch = e.touches[0]
        const rect = canvas.getBoundingClientRect()
        lastX = touch.clientX - rect.left
        lastY = touch.clientY - rect.top
        isDrawing = true
      }
    }
  
    function draw(e) {
      if (!isDrawing) return
  
      const rect = canvas.getBoundingClientRect()
      const currentX = e.clientX - rect.left
      const currentY = e.clientY - rect.top
  
      ctx.beginPath()
      ctx.moveTo(lastX, lastY)
      ctx.lineTo(currentX, currentY)
      ctx.stroke()
  
      lastX = currentX
      lastY = currentY
    }
  
    function handleTouchMove(e) {
      e.preventDefault()
      if (!isDrawing) return
  
      if (e.touches.length === 1) {
        const touch = e.touches[0]
        const rect = canvas.getBoundingClientRect()
        const currentX = touch.clientX - rect.left
        const currentY = touch.clientY - rect.top
  
        ctx.beginPath()
        ctx.moveTo(lastX, lastY)
        ctx.lineTo(currentX, currentY)
        ctx.stroke()
  
        lastX = currentX
        lastY = currentY
      }
    }
  
    function stopDrawing() {
      isDrawing = false
    }
  
    function clearCanvas() {
      ctx.fillStyle = currentBgColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
  
    function saveSignature() {
      try {
        localStorage.setItem("signatureData", canvas.toDataURL())
  
        // Create download link
        const link = document.createElement("a")
        link.download = "signature.png"
        link.href = canvas.toDataURL()
        link.click()
  
        showToast("Signature saved successfully!")
      } catch (error) {
        showToast("Error saving signature: " + error.message)
      }
    }
  
    function retrieveSignature() {
      canvasOverlay.classList.add("active")
  
      setTimeout(() => {
        try {
          const savedSignature = localStorage.getItem("signatureData")
          if (savedSignature) {
            const img = new Image()
            img.crossOrigin = "anonymous"
            img.onload = () => {
              clearCanvas()
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
              canvasOverlay.classList.remove("active")
              showToast("Signature loaded successfully!")
            }
            img.onerror = () => {
              canvasOverlay.classList.remove("active")
              showToast("Error loading signature image")
            }
            img.src = savedSignature
          } else {
            canvasOverlay.classList.remove("active")
            showToast("No saved signature found")
          }
        } catch (error) {
          canvasOverlay.classList.remove("active")
          showToast("Error retrieving signature: " + error.message)
        }
      }, 500)
    }
  
    function showToast(message) {
      toastMessage.textContent = message
      toast.classList.add("show")
  
      setTimeout(() => {
        toast.classList.remove("show")
      }, 3000)
    }
  })
  