import { Santa } from "../objects/santa";
import { Panel } from "../objects/panel";

export class MainScene extends Phaser.Scene {
  private phaserSprite: Phaser.GameObjects.Sprite;

  // Chara
  private santa: Santa;

  // Phaser.Physics.Arcade.StaticGroup;
  private panels: Phaser.GameObjects.Group;

  // Back Ground
  private bg: Phaser.GameObjects.TileSprite;
  
  // variables
  private timer: Phaser.Time.TimerEvent;
  private score: number;
  private scoreText: Phaser.GameObjects.Text[];
  
  constructor() {
    super({
      key: "MainScene"
    });
  }

  init(): void {
    // objects
    this.santa = null;
    this.panels = this.add.group({ classType: Panel });
    this.bg = null;

    // variables
    this.timer = undefined;
    this.score = -1;
    this.scoreText = [];
  }


  createSnow():void{
    let particles = this.add.particles('snowflakes_large');
    particles.createEmitter({
        x: { min: 0, max: 400 },
        y: { min: 0, max: 20 },
        lifespan: 5000,
        speedY: { min: 100, max: 200 },
        speedX: { min: -50, max: 50 },
        scale: { start: 0.1, end: 0.3 },
        quantity: 0.1,
        gravityY: 50,
        blendMode: Phaser.BlendModes.NORMAL,
        rotate: { min: 0, max: 100 },
    });
  }

  create(): void {
    this.bg = this.add.tileSprite(0, 0, this.cameras.main.width, this.cameras.main.height, "bg");
    //let panels = this.physics.add.staticGroup();

    this.santa = new Santa({
      scene: this,
      x: 50,
      y: 100,
      key: 'santa'
    });

    this.generatePanels();

    this.sound.add('bgm');
    this.sound.play('bgm');

    this.createSnow();

    this.physics.add.collider(this.santa, this.panels);
  }

  update(): void{
    this.santa.handleInput();
  }

  generatePanels(): void{
    // update the score
    this.score += 1;
    this.scoreText[0].setText("" + this.score);
    this.scoreText[1].setText("" + this.score);

    // randomly pick a number between 1 and 5
    let x = Math.floor(Math.random() * this.cameras.main.width);
    let y = Math.floor(Math.random() * this.cameras.main.height);

    this.generateOnePanel(x,y, 0)
  }

  private generateOnePanel(x, y, frame): void {
    // create a pipe at the position x and y
    let panel = new Panel({
      scene: this,
      x: x,
      y: y,
      frame: frame,
      key: "panel"
    });

    // add pipe to group
    this.panels.add(panel);
  }


}
