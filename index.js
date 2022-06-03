const express = require("express");
const app = express();
const path = require('path');
const router = express.Router();

// app.get("/", function (req, res) {
 //  res.send("POGODITE STA SAM SKINUO 12312412421");
// });
app.get('/',function(req,res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

// $(body).on(function(){
//   $(this).addClass("svetaklasa");
// })

app.use('/', router);
app.listen(process.env.PORT || 5000);
