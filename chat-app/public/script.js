const socket = io()
const chatBox = document.getElementById("chat-box")
const input = document.getElementById("message-input")
const sendBtn = document.getElementById("send-btn")

let username = localStorage.getItem("chat-username")
if (!username) {
  username = prompt("Enter your name:")
  username = username?.trim() || "Anonymous"
  localStorage.setItem("chat-username", username)
}

function appendMessage(data) {
  const message = document.createElement("div")
  const isSent = data.name === username
  message.className = isSent ? "message sent" : "message received"

  const name = isSent ? "You" : data.name
  message.innerText = `${name}: ${data.text}`

  chatBox.appendChild(message)
  chatBox.scrollTop = chatBox.scrollHeight
}

sendBtn.addEventListener("click", () => {
  const msg = input.value.trim()
  if (msg) {
    socket.emit("chat message", { name: username, text: msg })
    input.value = ""
  }
})

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendBtn.click()
})

socket.on("chat message", (data) => {
  appendMessage(data)
})
