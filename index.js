const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("POGODITE STA SAM SKINUO");
});
app.get('/',function(req,res) {
  res.sendFile('index.html');
});

$(body).on(function(){
$(this).addClass("svetaklasa");
})


app.listen(process.env.PORT || 5000);
