const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', (socket) => {console.log('a user connected');});
server.listen(3000, () => {/*console.log('listening on *:3000');*/});

// - - - - - - - - - - STATIC FILES
app.use(express.static("public"));
app.use("/css",express.static(__dirname+"public/css"))
app.use("/js",express.static(__dirname+"public/js"))
app.use("/images",express.static(__dirname+"public/images"))
app.use("/lib",express.static(__dirname+"public/lib"))

app.get('/', (req, res) => {res.sendFile(__dirname + '/views/index.html');});

// - - - - -  - -  CHAT

// io.on('connection', (socket) => {
//   socket.on('chat message', (msg) => {
//     console.log('message: ' + msg);
//   });
// });


io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});


/*
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
});*/
