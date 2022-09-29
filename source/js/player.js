
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