import { createRequire } from "module"; //incase need to use require
const require = createRequire(import.meta.url);

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post("/search", (req, res) => {
  const searchData = req.body.query;
  // Process searchData here
  res.json({ searchData });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
