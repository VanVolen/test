var i;
var spacebar;
var akey;
var wkey;
var dkey;
var player;
var shiftkey;
var platforms;
var orbexplode;
var explode;
var player;

import "./player.js"
class main_scene extends Phaser.Scene {
    constructor() {
        super({ key: 'background', active: true });
    }
    // ---------- SVETI CREATE END
    createPlayer(scene) {
        player = new Player(scene, 100, 300, "player");
    }
    //TODO: playerinfo
    addPlayer(scene, playerInfo) {
        //var player = new Player(scene, 100, 300, "player");
    }
    preload() {

        this.load.image("player", "images/" + "char.png");
        this.load.image("bush", "images/" + "bush.png");
        this.load.image("ground", "images/" + "ground.png");
        this.load.image("orb", "images/" + "orb.png");
        this.load.image("background", "images/" + "background.jpg");
        this.load.spritesheet("explodeorb", "images/" + "explodeorb.png", {
            frameWidth: 30,
            frameHeight: 30,
        });
    }

    create() {
        var GS = this;
        // var socket = io.connect(window.location.hostname);
        // socket.on("giveid", function (id) {
        //     addPlayer(scene, playerInfo);
        //     createPlayer(GS);
        // });
        // if (socket.connected) {
        //     this.addPlayer(scene);
        // }
        const mummyAnimation = this.anims.create({


            key: "explode",
            frames: this.anims.generateFrameNumbers("explodeorb"),
            frameRate: 12,
        });

        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        wkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        akey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        dkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        shiftkey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SHIFT
        );
        // -----------------------

        var scene = this;


        // io.on("currentPlayers", function (players) {
        //   Object.keys(players).forEach(function (id) {
        //     if (players[id].playerId === scene.socket.id) {
        //       addPlayer(scene, players[id]);
        //     }
        //   });
        // });
        //   this.createPlayer(scene);
        // player.create();
        this.createPlatform();
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(player, platforms);
        // ADD BUSH
        for (i = 0; i < 100; i++) {
            var p = i - 50;
            var value = Phaser.Math.Between(p * 100, (1 + p) * 100);
            this.add.image(value, 605, "bush").setOrigin(1);
        }
    }
    createPlatform() {
        platforms = this.physics.add.staticGroup();
        platforms.create(400, 600, "ground").setScale(40, 1).refreshBody();
        platforms.create(600, 400, "ground");
        platforms.create(50, 250, "ground");
        platforms.create(800, 220, "ground");
    }
    update() {
        // this.cameras.main.startFollow(player);
        // player.update();
    }

}


export { main_scene }

