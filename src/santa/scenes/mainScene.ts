import { Santa } from "../objects/santa";

/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @license      Digitsensitive
 */

export class MainScene extends Phaser.Scene {
  private phaserSprite: Phaser.GameObjects.Sprite;

  // objects
  private santa: Santa;
  // private pipes: Phaser.GameObjects.Group;
  // private bg: Phaser.GameObjects.TileSprite;

  // variables
  private timer: Phaser.Time.TimerEvent;
  private score: number;
  private scoreText: Phaser.GameObjects.Text[];
  

  constructor() {
    super({
      key: "MainScene"
    });
  }

  preload(): void {
    //this.load.image("logo", "./assets/santa-sd-720.png");
    //this.load.image("logo", "./assets/dummy.png");
    this.load.image("bg", "./assets/SantaBG-png256.png");
    this.load.spritesheet('santa', './assets/santa-sd-720.png', {
      frameWidth: 80,
      frameHeight: 97
    });
    this.load.spritesheet('snowflakes', './assets/external/snowflakes.png', {
      frameWidth: 17,
      frameHeight: 17
    });
    this.load.spritesheet('snowflakes_large', './assets/external/snowflakes_large.png', {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.audio("bgm", './assets/bgm.mp3');

  }

  max = 0;
  front_emitter;
  mid_emitter;
  back_emitter;
  update_interval = 4 * 60;
  i = 0;

  create(): void {
    //this.phaserSprite = this.add.sprite(<number> this.game.config.width,<number> this.game.config.height, "logo");
    
    this.add.image(0, 0, 'bg');
    //this.add.sprite(200,200,'santa');
    this.sound.add('bgm');
    this.sound.play('bgm');
    var particles = this.add.particles('snowflakes_large');

    particles.createEmitter({
        x: { min: 0, max: 400 },
        y: { min: 0, max: 20 },
        lifespan: 5000,
        speedY: { min: 100, max: 200 },
        speedX: { min: -50, max: 50 },
        scale: { start: 0.1, end: 0.3 },
        quantity: 0.1,
        gravityY: 2,
        blendMode: Phaser.BlendModes.NORMAL,
        rotate: { min: 0, max: 100 },
    });

    this.santa = new Santa({
      scene: this,
      x: 50,
      y: 100,
      key: 'santa'
    });
   // this.c = this.input.keyboard.createCursorKeys();
  }


  update(): void{
    this.santa.handleInput();
  }



}
