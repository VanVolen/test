//MANAGE GAME CONTROLS
var Controls = new function(){

    this.cursors = null;
    this.pointerMovePosition = {x:0,y:0};
	this.pointerDownPosition = {x:0,y:0};
    this.UrisPusikuris = "Uris Pusikuris";

    //CALL ON SCENE START
	this.init = function(){

        this.setKeyboardMovement();
		this.setKeyboardKeys();
        this.addMouseEvents();

		Game.scene.input.setTopOnly(true);

    };

	//SET KEYBOARD MOVEMENT
    this.setKeyboardMovement = function () {
		//create cursors for player move
		//Controls.cursors = Game.scene.input.keyboard.addKeys({ up: 'W', left: 'A', down: 'S', right: 'D' });
	};

	//SET KEYBOARD KEYS
	this.setKeyboardKeys = function () {

		//init keyboard
		Game.scene.input.keyboard.on('keyup', function (event) {

			switch (event.key.toLowerCase ()) {

				case "f":
					console.log("F button pressed");
				    break;

				case "q":
					console.log("Q button pressed");
					break;	
			}

		});

	};

    //CREATE GLOBAL MOUSE EVENTS
    this.addMouseEvents = function(){
		
		Game.scene.input.on('pointerup', this.pointerup);
		Game.scene.input.on('pointerdown', this.pointerdown);
		Game.scene.input.on('pointermove', this.pointermove);
		Game.scene.input.on('wheel', this.wheel);

    }

	//ON MOUSEWHEEL
	this.wheel = function(pointer, gameObjects, deltaX, deltaY, deltaZ){

	}

	//ON POINTERUP
	this.pointerup = function(pointer){

		//get cursor position
		var position = Game.scene.input.activePointer.positionToCamera(Game.scene.cameras.main);

	}

	//ON POINTERDOWN
	this.pointerdown = function(pointer){
		
		//get cursor position
		var position = Game.scene.input.activePointer.positionToCamera(Game.scene.cameras.main);
		
		//send position to server
		Server.sendMove(position);
		

	}

	//ON POINTERMOVE
	this.pointermove = function(pointer){

		//get cursor position
		var position = Game.scene.input.activePointer.positionToCamera(Game.scene.cameras.main);

	}
	

}	