/// <reference path="../phaser.d.ts"/>

import "phaser";
import { MainScene } from "./scenes/mainScene";

// main game configuration
const config: GameConfig = {
  width: 600,
  height: 800,
  type: Phaser.AUTO,
  parent: "game",
  scene: MainScene,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 }
    }
  }
};

if(window.innerWidth && window.devicePixelRatio){
  config.width = window.innerWidth * window.devicePixelRatio;
  config.height = window.innerHeight * window.devicePixelRatio
}

// game class
export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

// when the page is loaded, create our game instance
window.onload = () => {
  var game = new Game(config);
};

