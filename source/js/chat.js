/*
var socket = io.connect(window.location.hostname);
console.log(socket);
console.log(socket.id);

socket.on("giveid", function (id) {
    console.log("PLAYER ID JE:  " + id);
    addPlayer(scene, playerInfo);
    createPlayer(GS);
});

$("#sendmessage").click(function (e) {
    console.log(socket.id);
    e.preventDefault();
    var msg = $(".chatinput").val();
    if (msg) {
        console.log(msg);
        socket.emit("chat message", msg);
        $(".chatinput").val("");
    }
});
socket.on("chat message", function (msg) {
    $(".chatmessages").append("<li>" + msg + "</li>");
    window.scrollTo(0, document.body.scrollHeight);
});

*/