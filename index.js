const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("ajde ne");
});

app.listen(process.env.PORT || 5000);
