const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use(cors());
const PORT = 3000;

app.post("/run", async (req, res) => {
  const { source_code, language_id } = req.body;

  try {
    const response = await axios.post(
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
      { source_code, language_id },
      {
        headers: {
          "Content-Type": "application/json",
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
          "x-rapidapi-key":
            "7705782420msh2bdf4e388feeb27p157f0ajsn15e70d2f6845",
        },
      }
    );
    res.json(response.data);


  } catch (error) {
    console.error("Judge0 API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Code execution failed." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
