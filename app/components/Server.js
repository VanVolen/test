
//FUNCTIONS FOR COMUNICATING WITH SERVER
var Server = new function() {
    
    this.websocketAddress = "";
    this.httpAddress = "";
    this.socket = null;

    //init server
    this.init = function(){
        this.createWebsocket();
    }

    this.createWebsocket = function(){

        this.socket = io();

        this.socket.on('error', function(){
            document.getElementById("errorMessage").innerHTML = "Can't connect to websocket";
        });

        this.socket.on('newclientconnect', function(data){
            Game.start();
            document.getElementById("connect").style.display = "none";
            for(var k in data){
                Game.addPlayer(k,data[k].username, data[k].x, data[k].y);
            }
        });

        this.socket.emit("addPlayer", {username:Game.username,x:150,y:150});

        this.socket.on('addPlayer', function(data){
            var key = Object.keys(data)[0];
            Game.addPlayer(Object.keys(data)[0],data[key].username, data[key].x, data[key].y);
        });    

        this.socket.on('movePlayer', function(data){
            var key = Object.keys(data)[0];
            Game.players[key].moveTo({x:data[key].x,y:data[key].y});
        });  

        this.socket.on('removePlayer', function(data){
            Game.players[data].remove();
        });
    }

    this.sendMove = function(position){
        console.log(position);
        this.socket.emit('movePlayer', position);
    }
    
}    