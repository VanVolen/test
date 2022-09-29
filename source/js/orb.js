
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
      orbexplode.play({ key: "explode", repeat: 0 });
      orbexplode.once("animationcomplete", () => {
        orbexplode.destroy();
      });
    }
  }
  // ----------------------------------------------------------------------------------------------------------
  