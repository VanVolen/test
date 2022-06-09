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


window.onload = () => {
    // ----------------------------------------------------------------------------------------------------------

    class Player extends Phaser.Physics.Arcade.Sprite {
        constructor(scene, x, y, sprite) {
            super(scene, x, y, sprite);
            scene.physics.add.existing(this);
            this.scene.add.existing(this);
            this.setDrag(150);
            this.setScale(0.5);
            this.skok = 0;


            // TODO: prosiriti na vise tipova weapona
            this.orb = new Orb(scene, x, y);
        }
        create() {
            this.shoot_orb();
        }
        update() {
            this.move();
            this.jump();
        }
        move() {
            var moveAmt = 100;
            if (shiftkey.isDown) moveAmt = 400;
            if (dkey.isDown) this.setVelocityX(moveAmt).flipX = false;
            if (akey.isDown) this.setVelocityX(-moveAmt).flipX = true;
        }
        shoot_orb() {
            player = this;
            this.scene.input.on("pointerup", function () {
                var angle = Math.atan2(
                    this.activePointer.worldY - player.y + 60,
                    this.activePointer.worldX - player.x
                );
                player.orb.action(angle, player);
            });
        }
        jump() {
            if (
                Phaser.Input.Keyboard.JustDown(spacebar) &&
                (player.body.touching.down || this.skok == 1)
            ) {
                if (this.skok == 1) {
                    player.setVelocityY(-500);
                    this.skok = 0;
                } else if (this.skok == 0) {
                    this.skok = 1;
                    player.setVelocityY(-500);
                }
            }
        }
    }
    // ----------------------------------------------------------------------------------------------------------
    class Orb extends Phaser.GameObjects.Sprite {
        constructor(scene, x, y) {
            super(scene, x, y, "orb");
        }

        action(angle, player) {
            var orb = this.scene.physics.add.image(
                player.x + 20,
                player.y - 50,
                "orb"
            );
            this.scene.physics.velocityFromRotation(angle, 1000, orb.body.velocity);
            var passvariabla = this;
            this.scene.physics.add.overlap(orb, platforms, function () {
                setTimeout(function () {
                    console.log("Dodirne plocu");
                    passvariabla.orbexplosion(orb.x, orb.y);
                    orb.destroy();
                }, 5);
            });

            setTimeout(function () {
                passvariabla.orbexplosion(orb.x, orb.y);
                orb.destroy();
            }, 500);


        }
        orbexplosion(x, y) {
            orbexplode = this.scene.add.sprite(x, y, "explodeorb");
            orbexplode.frame = 0;
            orbexplode.play({ key: 'explode', repeat: 0 });
            orbexplode.once('animationcomplete', () => {
                console.log("RADILI");
                orbexplode.destroy();
            })
        }

    }
    // ----------------------------------------------------------------------------------------------------------

    class MainScene extends Phaser.Scene {
        preload() {
            this.load.image("player", "images/" + "char.png");
            this.load.image("bush", "images/" + "bush.png");
            this.load.image("ground", "images/" + "ground.png");
            this.load.image("orb", "images/" + "orb.png");
            this.load.image("background", "images/" + "background.jpg");
            this.load.spritesheet("explodeorb", "images/" + "explodeorb.png", { frameWidth: 30, frameHeight: 30 });
        }

        create() {
            const mummyAnimation = this.anims.create({
                key: 'explode',
                frames: this.anims.generateFrameNumbers('explodeorb'),
                frameRate: 12
            });

            spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
            wkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
            akey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
            dkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
            shiftkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
            // -----------------------
            this.createPlayer(this);
            this.createPlatform();
            this.cursors = this.input.keyboard.createCursorKeys();
            this.physics.add.collider(player, platforms);
            // ADD BUSH
            for (i = 0; i < 100; i++) {
                var p = i - 50;
                var value = Phaser.Math.Between(p * 100, (1 + p) * 100);
                this.add.image(value, 605, "bush").setOrigin(1);
            }
            player.create();

        }
        // ---------- SVETI CREATE END
        createPlayer(scene) {
            player = new Player(scene, 100, 300, "player");
        }
        createPlatform() {
            platforms = this.physics.add.staticGroup();
            platforms.create(400, 600, "ground").setScale(40, 1).refreshBody();
            platforms.create(600, 400, "ground");
            platforms.create(50, 250, "ground");
            platforms.create(800, 220, "ground");
        }
        update() {
            this.cameras.main.startFollow(player);
            player.update();
        }
    }

    const game = new Phaser.Game({
        type: Phaser.AUTO,
        width: 1000,
        height: 600,
        physics: {
            default: "arcade",
            arcade: {
                gravity: { y: 700 },
                debug: false,
            },
        },
        backgroundColor: 0x9cbbd8,
        scene: [MainScene],
    });
};
