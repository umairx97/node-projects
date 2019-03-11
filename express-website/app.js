
const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");

const urlencodeParser = bodyParser.urlencoded({ extended: false });

app.use("/css", express.static(__dirname + "/public/css"));

app.get("/", (req, res) => {
  let HTML = fs.readFileSync(`${__dirname}/public/index.html`);
  res.send(`${HTML}`);
});

app.get("/about", (req, res) => {
  let HTML = fs.readFileSync(`${__dirname}/public/about.html`);
  res.send(`${HTML}`);
});

app.post("/enteruser", urlencodeParser, (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "umair") {
    console.log("You entered Umair");
    res.send("Everything is okay");
  } else {
    console.log("username was incorrect");
    res.send("You entered wrong username");
  }
});

app.post("/senduser", (req, res) => {});

app.listen(3000);
