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
  // ... (existing code)
});

// Combine Data Function
function combineData(data1, data2) {
  // Parse the JSON strings into arrays
  const array1 = JSON.parse(data1);
  const array2 = JSON.parse(data2);

  // Merge the two arrays
  const combinedArray = [...array1, ...array2];

  // Stringify the combined array back to JSON
  const data3 = JSON.stringify(combinedArray, null, 4); // Use null and 4 for formatting

  return data3;
}

// Get All Questions Function
function getAllQuestions(jsonData) {
  try {
    const data = JSON.parse(jsonData);
    let allQuestions = `{\n`;

    for (const questionObj of data) {
      const question = questionObj.question;
      allQuestions += `${question},\n`;
    }

    allQuestions += "}";

    return allQuestions;
  } catch (error) {
    console.error("Error parsing JSON data:", error);
    return "";
  }
}

app.post("/searchMore", async (req, res) => {
  const Topic = req.body.query;
  const result = req.body.result;

  try {
    const existingData = await DataModel.findOne({ query: Topic });

    const existingQuestion = getAllQuestions(existingData.response);

    const Basic = `Give a quiz with 5 questions on ${Topic} other than
    ${existingQuestion}
    in the JSON format like
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

    data = combineData(
      existingData.response,
      response.data.choices[0].message.content.match(/\[.*\]/s)
    );

    const newData = new DataModel({
      query: Topic,
      response: data,
    });
    await newData.save();

    res.json({ data });
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
