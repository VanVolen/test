//MAIN GAME FUNCTION
var Game = new function() {

    this.scene = null;
    this.gameStarted = false;
    this.players = {};
    this.playerUuid = 0;
    this.username = "Default Name";

    //SETUP EVERYTHING FOR FIRST TIME GAME START
    this.start = function() {
        
        this.generateScene();
        this.gameStarted = true;


    }

    //GENERATE SCENE
    this.generateScene = function () {

        console.log("Game Started");

    }

    //ADD NEW PLAYER
    this.addPlayer = function (id,username,x,y) {

        var player = new Player();
        player.init(id,username,x,y);
        this.players[id] = player;

        

    }

    
	//GENERATE  UUID
	this.generateUUID = function(){

		return Phaser.Utils.String.UUID() + '-' + Date.now().toString(36);

	}

}    