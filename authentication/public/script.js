const toast = document.getElementById("toast")

async function sendOTP() {
  const email = document.getElementById("email").value

  if (!email || !email.includes("@")) {
    showToast("Please enter a valid email address")
    return
  }

  try {
    const response = await fetch("/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })

    const result = await response.json()
    showToast(result.message)

    if (result.success) {
      document.getElementById("email-section").style.display = "none"
      document.getElementById("otp-section").style.display = "block"
    }
  } catch (error) {
    showToast("Error sending OTP. Please try again.")
    console.error("Error:", error)
  }
}

async function verifyOTP() {
  const email = document.getElementById("email").value
  const otp = document.getElementById("otp").value

  if (!otp) {
    showToast("Please enter the OTP")
    return
  }

  try {
    const response = await fetch("/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    })

    const result = await response.json()
    showToast(result.message)

    if (result.success) {
      window.location.href = `welcome.html?email=${encodeURIComponent(email)}`
    }
  } catch (error) {
    showToast("Error verifying OTP. Please try again.")
    console.error("Error:", error)
  }
}

function showToast(message) {
  toast.textContent = message
  toast.style.opacity = 1
  toast.style.top = "50px"
  setTimeout(() => {
    toast.style.opacity = 0
    toast.style.top = "30px"
  }, 3000)
}
