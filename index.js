const express = require("express");
const app = express();
const path = require("path");
var $ = (jQuery = require("jquery"));

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const uri = process.env.MONGODB_URI;

// app.get("/", function (req, res) {
//  res.send("POGODITE STA SAM SKINUO 12312412421");
// });
//app.get('/',function(req,res) {
//res.sendFile(path.join(__dirname+'/index.html'));
//});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/css.css");
});

app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(process.env.PORT || 5000, () => {
  console.log("listening on *:5000");
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
  });
});
io.emit("some event", {
  someProperty: "some value",
  otherProperty: "other value",
}); // This will emit the event to all connected sockets

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});
