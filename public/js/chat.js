var socket = io();

$(document).ready(function () {
  $("#sendmessage").click(function (e) {
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
});
