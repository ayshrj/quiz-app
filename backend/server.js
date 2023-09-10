import { config } from "dotenv";
config();

// import { createRequire } from "module"; //incase need to use require
// const require = createRequire(import.meta.url);

import { Configuration, OpenAIApi } from "openai";

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.API_KEY,
  })
);

const Topic = "Dynamic Programming";
const Basic = `Give a quiz with 2 questions on ${Topic} in the JSON format like
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
  .then((res) => {
    data = res.data.choices[0].message.content;
    console.log(res.data.choices[0].message.content);
  })
  .finally(() => {
    console.log(JSON.parse(data));
  });
