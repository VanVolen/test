/*import { Server } from 'socket.io';
import express from 'express';
import { createServer } from 'http';

const app = express();
const server = createServer(app);
const io = new Server(server);

var players = {};


var myid;
server.listen(process.env.PORT || 3000, () => {
});

// - - - - - - - - - - STATIC FILES
// app.use(express.static("public"));
import path from 'path';
const __dirname = path.resolve();
app.use(express.static('public'))

app.use(express.static(path.join(__dirname + "/images")));
app.use(express.static(path.join(__dirname + "/css")));
app.use(express.static(path.join(__dirname + "/lib")));

// app.use('/source', express.static(__dirname + '/source'))


app.use(express.static("source"));
app.use(express.static(path.join(__dirname + "/source")));

app.get("/", (req, res) => {
        res.sendFile(__dirname + "/index.html");
});

// - - - - -  - -  CHAT
if (io.connected) {
        console.log("guda");
}
 import "socket.io-client.js" as {socket};
socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});
io.on("connection", (socket) => {
        console.log('New user connected: ', socket.id);
});*/
