import { main_scene } from "./js/main_scene.js";
import "./js/chat.js"
import "./js/player.js"
var config = {
        type: Phaser.AUTO,
        width: 600,
        height: 400,
        physics: {
                default: "arcade",
                arcade: {
                        gravity: { y: 700 },
                        debug: false,
                },
        },
        backgroundColor: 0x9cbbd8,
        scene: main_scene
};

window.onload = (event) => {
        var game = new Phaser.Game(config);
};



