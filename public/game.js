var i;
var spacebar;
var akey;
var wkey;
var dkey;
var player;
window.onload = () => {
  /*ORBBBBBBBBBBBBBBBBB*/
  class Orb extends Phaser.GameObjects.Sprite {
    // constructor(scene) {
    //   console.log(scene.player);
    //   var x = scene.player.x;
    //   var y = scene.player.y;
    //   super(scene, x, y, "orb");
    //   }
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
      setTimeout(function () {
        orb.destroy();
      }, 500);
    }
  }

  class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite) {
      super(scene, x, y, sprite);
      scene.physics.add.existing(this);
      this.scene.add.existing(this);
      this.setDrag(100);
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
      const moveAmt = 200;
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
          console.log("skok 2");
        } else if (this.skok == 0) {
          this.skok = 1;
          player.setVelocityY(-500);
          console.log("skok 1");
        }
      }
    }
  }
  /*MAIN SCENA*/
  class MainScene extends Phaser.Scene {
    preload() {
      this.load.image("player", "images/" + "char.png");
      this.load.image("bush", "images/" + "bush.png");
      this.load.image("ground", "images/" + "ground.png");
      this.load.image("orb", "images/" + "orb.png");
    }
    // ISPALI METAK

    create() {
      // DODAVANJE KEYBOARD MSM KEYS STAGOD
      spacebar = this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.SPACE
      );
      wkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      akey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      dkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
      // -----------------------
      this.createPlayer(this);
      this.createPlatform();
      this.cursors = this.input.keyboard.createCursorKeys();
      this.physics.add.collider(player, this.platforms);
      // ADD BUSH
      for (i = 0; i < 100; i++) {
        var p = i - 50;
        var value = Phaser.Math.Between(p * 100, (1 + p) * 100);
        this.add.image(value, 605, "bush").setOrigin(1);
      }
      player.create();
      // ON MOUSE CLICK ISPALI METAK
      //   var guza;
      //   guza = this;
      //   this.input.on("pointerup", function (pointer) {
      //     console.log("Ugao: " + angle);
      //     var angle = angle;
      //     guza.shootOrb(angle);
      //   });
    }
    createPlayer(scene) {
      player = new Player(scene, 100, 300, "player");
    }
    createPlatform() {
      this.platforms = this.physics.add.staticGroup();
      this.platforms.create(400, 600, "ground").setScale(40, 1).refreshBody();
      this.platforms.create(600, 400, "ground");
      this.platforms.create(50, 250, "ground");
      this.platforms.create(800, 220, "ground");
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

// *************************************** CHATING
var socket = io();

var messages = document.getElementById("messages");
var form = document.getElementById("form");
var input = document.getElementById("input");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", input.value);
    input.value = "";
  }
});

socket.on("chat message", function (msg) {
  var item = document.createElement("li");
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
