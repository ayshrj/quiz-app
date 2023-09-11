import { createRequire } from "module";
const require = createRequire(import.meta.url);

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import mongoose from "mongoose";

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

config();

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.API_KEY,
  })
);

mongoose.connect(process.env.mongoKey, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const DataSchema = new mongoose.Schema({
  query: String,
  response: String,
});

const DataModel = mongoose.model("Data", DataSchema);

app.post("/search", async (req, res) => {
  const Topic = req.body.query;

  try {
    const existingData = await DataModel.findOne({ query: Topic });

    if (existingData) {
      res.json({ data: existingData.response });
    } else {
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

      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: Basic }],
      });

      data = response.data.choices[0].message.content;

      const newData = new DataModel({
        query: Topic,
        response: data,
      });
      await newData.save();

      res.json({ data });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
