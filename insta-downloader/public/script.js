  async function download() {
    const url = document.getElementById("url").value
    if (!url) {
      showError("Please enter an Instagram URL")
      return
    }
  
    const resultDiv = document.getElementById("result")
    const loader = document.getElementById("loader")
    const downloadInfo = document.getElementById("download-info")
    const directDownload = document.getElementById("direct-download")
  
    // Reset UI
    resultDiv.innerHTML = ""
    loader.classList.remove("hidden")
    downloadInfo.classList.remove("hidden")
    directDownload.classList.add("hidden")
  
    try {
      const response = await fetch("/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })
  
      if (!response.ok) {
        throw new Error("Server error: " + response.status)
      }
  
      const result = await response.json()
  
      if (result.success && result.data && result.data.length > 0) {
        const videoData = result.data[0]
        const videoUrl = videoData.url
  
        const video = document.createElement("video")
        video.controls = true
        video.preload = "metadata"
        video.src = videoUrl
  
        video.addEventListener("play", () => {
          console.log("Video playback started")
        })
  
        video.addEventListener("error", () => {
          showError("Error loading video. Please try again.")
        })
  
        resultDiv.appendChild(video)
  
        directDownload.href = videoUrl
        directDownload.classList.remove("hidden")
  
        if (videoData.thumbnail) {
          video.poster = videoData.thumbnail
        }
      } else {
        throw new Error("No video found in the response")
      }
    } catch (error) {
      console.error("Download error:", error)
      showError("Failed to download video. Please check the URL and try again.")
    } finally {
      loader.classList.add("hidden")
    }
  }
  
  function showError(message) {
    const resultDiv = document.getElementById("result")
    resultDiv.innerHTML = `<div class="error-message">${message}</div>`
  
    const downloadInfo = document.getElementById("download-info")
    downloadInfo.classList.add("hidden")
  }
  