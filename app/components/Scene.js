//MAIN GAME SCENE
class Scene extends Phaser.Scene {
	
	constructor() {
		super("Scene");
	}

	//PRELOAD EVERYTHING
	preload(){

	}

    //START SCENE
	create() {

		//make scene global accesable 
		Game.scene = this;
		Ui.init();
		Controls.init();

    }

}