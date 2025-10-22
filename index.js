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
  console.log("prompt", prompt);
  let response = await generateContent(prompt);
  res.send({ response, body: req.body });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
