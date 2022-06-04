var i;
window.onload = () => {
    class MainScene extends Phaser.Scene {
        preload() {
            this.load.image('player', 'images/' + 'char.png');
            this.load.image('bush', 'images/' + 'bush.png');

        }

        create() {
            this.player = this.physics.add.sprite(100, 300, 'player');
            this.cursors = this.input.keyboard.createCursorKeys();
            for (i=0;i<100;i++){
                var p = i-50;
                var value = Phaser.Math.Between(p*100,(1+p)*100);
                this.add.image(value,605,"bush").setOrigin(1);
            }
        }

        update() {
            this.cameras.main.startFollow(this.player);
            const moveAmt = 200;
            this.player.setDrag(500);

            if (this.cursors.right.isDown) this.player.setVelocityX(moveAmt).flipX=false;
            if (this.cursors.left.isDown) this.player.setVelocityX(-moveAmt).flipX=true;
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