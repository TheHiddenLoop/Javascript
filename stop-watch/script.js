let timerInterval
let running = false
let startTime
let elapsedTime = 0
let lapCount = 0
let lastLapTime = 0
let lapTimes = []
let progressCircle
let circumference

const timerElement = document.getElementById("timer")
const startBtn = document.getElementById("startBtn")
const stopBtn = document.getElementById("stopBtn")
const resetBtn = document.getElementById("resetBtn")
const lapBtn = document.getElementById("lapBtn")
const lapsList = document.getElementById("lapsList")
const progressRingCircle = document.querySelector(".progress-ring-circle")

const radius = progressRingCircle.r.baseVal.value
circumference = radius * 2 * Math.PI
progressRingCircle.style.strokeDasharray = `${circumference} ${circumference}`
progressRingCircle.style.strokeDashoffset = circumference

startBtn.addEventListener("click", startTimer)
stopBtn.addEventListener("click", stopTimer)
resetBtn.addEventListener("click", resetTimer)
lapBtn.addEventListener("click", recordLap)

function startTimer() {
  if (!running) {
    running = true
    startBtn.disabled = true

    if (elapsedTime === 0) {
      startTime = Date.now()
    } else {
      startTime = Date.now() - elapsedTime
    }

    timerInterval = setInterval(updateTimer, 10) 

    startBtn.classList.add("pulse")
    setTimeout(() => startBtn.classList.remove("pulse"), 300)
  }
}

function stopTimer() {
  if (running) {
    running = false
    clearInterval(timerInterval)
    startBtn.disabled = false
    elapsedTime = Date.now() - startTime

    stopBtn.classList.add("pulse")
    setTimeout(() => stopBtn.classList.remove("pulse"), 300)
  }
}

function resetTimer() {
  stopTimer()
  elapsedTime = 0
  lapCount = 0
  lastLapTime = 0
  lapTimes = []
  updateDisplay()
  clearLaps()

  progressRingCircle.style.strokeDashoffset = circumference

  resetBtn.classList.add("pulse")
  setTimeout(() => resetBtn.classList.remove("pulse"), 300)
}

function updateTimer() {
  elapsedTime = Date.now() - startTime
  updateDisplay()
  updateProgressRing()
}

function updateDisplay() {
  const milliseconds = Math.floor((elapsedTime % 1000) / 10)
  const seconds = Math.floor((elapsedTime / 1000) % 60)
  const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60)
  const hours = Math.floor(elapsedTime / (1000 * 60 * 60))

  const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
  const formattedMs = `.${String(milliseconds).padStart(2, "0")}`

  timerElement.innerHTML = formattedTime + `<span class="milliseconds">${formattedMs}</span>`

  if (seconds % 1 === 0 && milliseconds < 10) {
    timerElement.classList.add("pulse")
    setTimeout(() => timerElement.classList.remove("pulse"), 300)
  }
}

function updateProgressRing() {
  const seconds = (elapsedTime / 1000) % 60
  const progress = seconds / 60
  const offset = circumference - progress * circumference
  progressRingCircle.style.strokeDashoffset = offset
}

function recordLap() {
  if (running) {
    lapCount++
    const totalTime = elapsedTime
    const lapTime = totalTime - lastLapTime
    lastLapTime = totalTime

    lapTimes.push({
      number: lapCount,
      lapTime: lapTime,
      totalTime: totalTime,
    })

    const lapMs = Math.floor((lapTime % 1000) / 10)
    const lapSec = Math.floor((lapTime / 1000) % 60)
    const lapMin = Math.floor((lapTime / (1000 * 60)) % 60)
    const lapHr = Math.floor(lapTime / (1000 * 60 * 60))

    const formattedLapTime = `${String(lapHr).padStart(2, "0")}:${String(lapMin).padStart(2, "0")}:${String(lapSec).padStart(2, "0")}.${String(lapMs).padStart(2, "0")}`

    const totalMs = Math.floor((totalTime % 1000) / 10)
    const totalSec = Math.floor((totalTime / 1000) % 60)
    const totalMin = Math.floor((totalTime / (1000 * 60)) % 60)
    const totalHr = Math.floor(totalTime / (1000 * 60 * 60))

    const formattedTotalTime = `${String(totalHr).padStart(2, "0")}:${String(totalMin).padStart(2, "0")}:${String(totalSec).padStart(2, "0")}.${String(totalMs).padStart(2, "0")}`

    const lapItem = document.createElement("div")
    lapItem.className = "lap-item"
    lapItem.innerHTML = `
      <span class="lap-number">Lap ${lapCount}</span>
      <span class="lap-time">${formattedLapTime}</span>
      <span class="total-time">${formattedTotalTime}</span>
    `

    lapsList.insertBefore(lapItem, lapsList.firstChild)

    if (lapCount > 1) {
      updateLapHighlights()
    }

    lapBtn.classList.add("pulse")
    setTimeout(() => lapBtn.classList.remove("pulse"), 300)
  }
}

function updateLapHighlights() {
  let fastestLap = lapTimes[0]
  let slowestLap = lapTimes[0]

  for (let i = 1; i < lapTimes.length; i++) {
    if (lapTimes[i].lapTime < fastestLap.lapTime) {
      fastestLap = lapTimes[i]
    }
    if (lapTimes[i].lapTime > slowestLap.lapTime) {
      slowestLap = lapTimes[i]
    }
  }

  const lapItems = document.querySelectorAll(".lap-item .lap-time")
  lapItems.forEach((item) => {
    item.classList.remove("fastest", "slowest")
  })

  if (lapTimes.length > 1) {
    const fastestIndex = lapTimes.length - fastestLap.number
    const slowestIndex = lapTimes.length - slowestLap.number

    if (fastestIndex >= 0 && fastestIndex < lapItems.length) {
      lapItems[fastestIndex].classList.add("fastest")
    }

    if (slowestIndex >= 0 && slowestIndex < lapItems.length) {
      lapItems[slowestIndex].classList.add("slowest")
    }
  }
}

function clearLaps() {
  lapsList.innerHTML = ""
  lapTimes = []
}

updateDisplay()
