/// <reference path="../phaser.d.ts"/>

import "phaser";
import { MainScene } from "./scenes/mainScene";
import { BootScene } from "./scenes/bootScene";
import { TitleScene } from "./scenes/titleScene";

// main game configuration
const config: GameConfig = {
  width: 400,
  height: 600,
  backgroundColor: "#FFFFFF",
  type: Phaser.AUTO,
  parent: "game",
  scene: [BootScene, TitleScene, MainScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1300 }
    }
  },
  input: {
    keyboard: true,
    mouse: true,
    touch: true,
    gamepad: false,
    activePointers: 1
  }
};

// game class
export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

// when the page is loaded, create our game instance
window.onload = () => {

  if(window.innerWidth && window.innerHeight){
    // X 375 x 812 (635)     // XR 414 x 896     // nexus 412 x 732     // note9 360 x 740     // Max : 768 x 1024
    const MAX_HEIGHT = 800;
    //const MAX_WIDTH = 768;
    //config.width = window.innerWidth < MAX_WIDTH ? window.innerWidth : MAX_WIDTH;  
    config.height = window.innerHeight < MAX_HEIGHT ? window.innerHeight : MAX_HEIGHT;  
  }
  
  var game = new Game(config);
};

