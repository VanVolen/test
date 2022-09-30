const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
app.use(express.static('app'));

var connect = 0;

var players = {

};

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/app/index.html');
});

//on connection
io.on('connection', (socket) => {

  socket.emit('newclientconnect', players);
  console.log(players);
  socket.on('addPlayer', msg => {
    players[socket.id] = msg;
    var message = {};
    message[socket.id] = msg;
    socket.emit('addPlayer', message);
    socket.broadcast.emit('addPlayer', message);
  });

  socket.on('movePlayer', msg => {
    players[socket.id].x = msg.x;
    players[socket.id].y = msg.y;
    var message = {};
    message[socket.id] = msg;
    socket.emit('movePlayer', message);
    socket.broadcast.emit('movePlayer', message);
  });
  
  socket.on("disconnect", (reason) => {
    players[socket.id] = null;
    delete players[socket.id];
    console.log("disconeted");
    socket.broadcast.emit('removePlayer', socket.id);
  });

});

io.on('connect', function() { 
  connect++; console.log(connect);
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
