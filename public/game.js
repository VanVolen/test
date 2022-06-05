var i;
var spacebar;
var akey;
var wkey;
var dkey;
var player;
window.onload = () => {
    /*ORBBBBBBBBBBBBBBBBB*/
    class Orb extends Phaser.GameObjects.Sprite {
        constructor(scene) {
            var x = scene.player.x;
            var y = scene.player.y;
            super(scene, x, y, "orb");

        }
    }

    /*MAIN SCENA*/
    class MainScene extends Phaser.Scene {
        preload() {
            this.load.image('player', 'images/' + 'char.png');
            this.load.image('bush', 'images/' + 'bush.png');
            this.load.image('ground', 'images/' + 'ground.png');
            this.load.image('orb', 'images/' + 'orb.png');
        }
        shootOrb(angle) {
            var orb = this.physics.add.image(player.x + 20, player.y - 50, "orb");
            this.physics.velocityFromRotation(angle, 1000, orb.body.velocity);
            setTimeout(function(){
                orb.destroy();
                }, 1000);

        }
        create() {
            spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
            wkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
            akey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
            dkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
            this.createPlayer();
            this.createPlatform();
            this.cursors = this.input.keyboard.createCursorKeys();
            this.physics.add.collider(player, this.platforms);
            for (i = 0; i < 100; i++) {
                var p = i - 50;
                var value = Phaser.Math.Between(p * 100, (1 + p) * 100);
                this.add.image(value, 605, "bush").setOrigin(1);
            }
            var guza;
            guza = this;
            this.input.on('pointerup', function (pointer) {
                var angle = Math.atan2(this.activePointer.worldY - player.y+60 , this.activePointer.worldX - player.x);
                console.log("Ugao: " + angle);
                var angle = angle;
                guza.shootOrb(angle);
            });



        }
        createPlayer() {
            player = this.physics.add.sprite(100, 300, 'player').setOrigin(1);
            player.setScale(0.5);
            player.setDrag(100);
        }
        createPlatform() {
            this.platforms = this.physics.add.staticGroup();
            this.platforms.create(400, 600, 'ground').setScale(40, 1).refreshBody();
            this.platforms.create(600, 400, 'ground');
            this.platforms.create(50, 250, 'ground');
            this.platforms.create(800, 220, 'ground');
        }
        update() {
            this.cameras.main.startFollow(player, false, 0, 0.05, 0, 200);
            const moveAmt = 200;
            if (dkey.isDown) player.setVelocityX(moveAmt).flipX = false;
            if (akey.isDown) player.setVelocityX(-moveAmt).flipX = true;
            if (spacebar.isDown && player.body.touching.down) { player.setVelocityY(-600); }
            //this.physics.add.collider(player, platforms);
        }
        penetrate() {
            console.log("Svrsh");
        }
    }

    const game = new Phaser.Game({
        type: Phaser.AUTO,
        width: 1000,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 700 },
                debug: false
            }
        },
        backgroundColor: 0x9cbbd8,
        scene: [MainScene]
    });
};

// *************************************** CHATING
var socket = io();

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
    }
});

socket.on('chat message', function (msg) {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});