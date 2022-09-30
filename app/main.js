//load windows
window.addEventListener('load', function () {

	//setup phaser (this setup to use html as ui, not canvas)
	var game = new Phaser.Game({
		width: 640,
		height: 360,
		type: Phaser.AUTO,
        backgroundColor: "#00000",
		pixelArt: true,
		parent: 'app',
		disableContextMenu:false,
		powerPreference:"high-performance",
		input:{
			mouse:{
				target: document.body
			}
		},
		dom:{
			createContainer: true
		},
		scale: {
			parent: 'app',
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH
		},
		physics: {
			default: 'arcade',
			arcade: {
			    debug: false
			}
		}
	});
	
	//add boot scene
	game.scene.add("Boot", Boot, true);

});


//boot scene
class Boot extends Phaser.Scene {

	preload() {
		
		//load all game assets that game will use (we can add in this file every image, sound, script, file that game will need)
		this.load.pack("pack", "asset-pack.json");
        
	}

	create() {

		//start main scene
		this.scene.start("Scene");

	}

}


