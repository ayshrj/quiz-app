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

const mongoLink = `mongodb+srv://admin:${process.env.mongoKey}@openai-project.w5wxmvh.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(mongoLink, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const DataSchema = new mongoose.Schema({
  query: String,
  response: String,
});

const DataModel = mongoose.model("Data", DataSchema);

const filterUnwantedOption = (data) => {
  const hasAnyDelimiter = (inputString) => {
    const delimiters = [":", ".", ")"];

    for (const delimiter of delimiters) {
      if (inputString.includes(delimiter)) {
        return true;
      }
    }

    return false;
  };

  const isGenericOption = (options) => {
    const genericOptions = [
      ["Option 1", "Option 2", "Option 3", "Option 4"],
      ["Option A", "Option B", "Option C", "Option D"],
      ["Option 1", "Option 2"],
      ["Option A", "Option B"],
      ["1", "2", "3", "4"],
      ["A", "B", "C", "D"],
      ["1", "2"],
      ["A", "B"],
    ];

    for (const genericOption of genericOptions) {
      if (JSON.stringify(genericOption) === JSON.stringify(options)) {
        return true;
      }
    }

    return false;
  };

  for (let i = 0; i < data.length; i++) {
    let options = data[i].options;

    if (isGenericOption(data[i].options)) {
      data.splice(i, 1);
      i--;
    } else if (hasAnyDelimiter(data[i].options[0])) {
      for (let j = 0; j < options.length; j++) {
        let optionParts = options[j].split(/[:.)]/);

        let newOption = optionParts[1] ? optionParts[1].trim() : "";
        if (newOption !== "") {
          options[j] = newOption;
        } else {
          options.splice(j, 1);
          j--;
        }
      }

      if (data[i].options.length === 0) {
        data.splice(i, 1);
        i--;
      }
    }
  }

  return data;
};

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

      data = JSON.stringify(
        filterUnwantedOption(
          JSON.parse(response.data.choices[0].message.content)
        )
      );

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

//combineData
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

  try {
    let existingData = await DataModel.findOne({ query: Topic });

    if (existingData) {
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
        JSON.stringify(
          filterUnwantedOption(
            JSON.parse(
              response.data.choices[0].message.content.match(/\[.*\]/s)
            )
          )
        )
      );

      const newData = {
        query: Topic,
        response: data,
      };

      await DataModel.updateMany({ query: Topic }, newData);

      existingData = await DataModel.findOne({ query: Topic });

      // console.log(existingData);
      res.json({ data });
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

      data = JSON.stringify(
        filterUnwantedOption(
          JSON.parse(response.data.choices[0].message.content)
        )
      );

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

app.listen(parseInt(process.env.PORT), () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
