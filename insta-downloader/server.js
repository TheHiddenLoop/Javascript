const express = require("express")
const { igdl } = require("aetherz-downloader")
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.static("public"))



app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" })
})

// Main download endpoint
app.post("/download", async (req, res) => {
  const { url } = req.body

  if (!url) {
    return res.status(400).json({
      success: false,
      error: "URL is required",
    })
  }

  try {
    console.log(`Processing download request for: ${url}`)
    const result = await igdl(url)

    if (!result || result.length === 0) {
      return res.status(404).json({
        success: false,
        error: "No media found at this URL",
      })
    }

    console.log(`Successfully retrieved ${result.length} media items`)
    res.json({ success: true, data: result })
  } catch (error) {
    console.error("Download error:", error.message)
    res.status(500).json({
      success: false,
      error: "Failed to download media. Please check the URL and try again.",
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
