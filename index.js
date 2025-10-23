require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");
const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello PB AI!");
});
const ai = new GoogleGenAI({});

async function generateContent(message) {
  console.log;
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: message,
  });
  console.log(response.text);
  return response.text;
}

app.post("/generate", async (req, res) => {
  const { prompt } = req.body;
  let response = await generateContent(
    prompt +
      "always give response in an array format so that i can use it in code"
  );

  // Convert response to string (if it's not already)
  response = String(response);

  // Remove code block markers like ```json and ```
  response = response.replace(/```json|```/g, "").trim();

  // Try parsing JSON array from string
  try {
    const parsed = JSON.parse(response);
    res.send({ response: parsed });
  } catch (err) {
    console.error("Failed to parse AI response:", err);
    res
      .status(500)
      .send({ error: "Invalid AI response format", raw: response });
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
