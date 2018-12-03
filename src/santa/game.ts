/// <reference path="../phaser.d.ts"/>

import "phaser";
import { MainScene } from "./scenes/mainScene";

// main game configuration
const config: GameConfig = {
  width: 375,
  height: 580,
  backgroundColor: "#FFFFFF",
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

// game class
export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

// when the page is loaded, create our game instance
window.onload = () => {

  if(window.innerWidth && window.innerHeight){
    // X 375 x 812 (635)
    // XR 414 x 896
    // nexus 412 x 732
    // note9 360 x 740
    // Max : 768 x 1024
    const MAX_HEIGHT = 1024;
    const MAX_WIDTH = 768;
    config.width = window.innerWidth < MAX_WIDTH ? window.innerWidth : MAX_WIDTH;  
    config.height = window.innerHeight < MAX_HEIGHT ? window.innerHeight : MAX_HEIGHT;  
  }
  

  var game = new Game(config);
};

