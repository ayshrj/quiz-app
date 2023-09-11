import { createRequire } from "module"; // in case you need to use require
const require = createRequire(import.meta.url);

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

import { config } from "dotenv";
config();

import { Configuration, OpenAIApi } from "openai";

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.API_KEY,
  })
);

app.post("/search", (req, res) => {
  const Topic = req.body.query;
  const Basic = `Give a quiz with 5 questions on ${Topic} in the JSON format like
  Eg:
  [
    {
      "question": "Question Here",
      "options": [
        "Option A",
        "Option B",
        "Option C",
        "Option D"
      ],
      "correct": "2"
    }
  ]
  
  Note: correct has 0-based indexing`;

  let data = null;

  openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: Basic }],
    })
    .then((response) => {
      data = response.data.choices[0].message.content;
      console.log(response.data.choices[0].message.content);
      res.json({ data });
    })
    .catch((error) => {
      console.error("OpenAI API error:", error);
      res
        .status(500)
        .json({ error: "An error occurred while processing your request" });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
