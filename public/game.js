window.onload = () => {
    class MainScene extends Phaser.Scene {
        preload() {
            this.load.image('player', 'images/' + 'char.png');
        }

        create() {
            this.player = this.physics.add.sprite(100, game.config.height / 2, 'player');
            this.cursors = this.input.keyboard.createCursorKeys();
        }

        update() {
            const moveAmt = 200;
            this.player.setDrag(500);

            if (this.cursors.right.isDown) this.player.setVelocityX(moveAmt);
            if (this.cursors.left.isDown) this.player.setVelocityX(-moveAmt);
            if (this.cursors.down.isDown) this.player.setVelocityY(moveAmt);
            if (this.cursors.up.isDown) this.player.setVelocityY(-moveAmt);
        }
    }

    const game = new Phaser.Game({
        type: Phaser.AUTO,
        width: 600,
        height: 600,
        physics: {
            default: 'arcade',
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