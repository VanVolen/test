const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("NIKOLAAAAAAAAAAAAAAA HEHEHEHEHEH NIKAD NECU GIT DA SKINEM!!!");
});

app.listen(process.env.PORT || 5000);
