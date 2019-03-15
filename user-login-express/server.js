const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + `/index.html`));
});

router.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname + `/about.html`));
});

router.get("/services", (req, res) => {
  res.sendFile(path.join(__dirname + `/services.html`));
});

app.use("/", router);
app.listen(process.env.port || 3000);
console.log("Running at Port 3000");
