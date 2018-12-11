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

  createScore() : void{
    this.scoreText.push(
      this.add.text(this.sys.canvas.width / 2 - 14, 30, "0", {
        fontSize: "40px",
        fill: "#000"
      })
    );
    this.scoreText.push(
      this.add.text(this.sys.canvas.width / 2 - 16, 30, "0", {
        fontSize: "40px",
        fill: "#fff"
      })
    );
  }

  createSnow():void{
    let particles = this.add.particles('snowflakes');
    particles.createEmitter({
        x: { min: 0, max: 400 },
        y: { min: 0, max: 20 },
        lifespan: 5000,
        speedY: { min: 100, max: 200 },
        speedX: { min: -50, max: 50 },
        scale: { start: 0.5, end: 1 },
        quantity: 0.1,
        gravityY: 5,
        blendMode: Phaser.BlendModes.NORMAL,
        rotate: { min: 0, max: 100 },
    });
  }

  create(): void {
    //let data = this.cache.json.get('preload');

    this.bg = this.add.tileSprite(this.sys.canvas.width / 2, this.sys.canvas.height / 2, this.sys.canvas.width, this.sys.canvas.height, "bg");
    //let chara = this.add.image(200,0,"scg",2);
    //let panels = this.physics.add.staticGroup();

    this.santa = new Santa({
      scene: this,
      x: 50,
      y: 100,
      key: 'santa'
    });
    this.createScore();
    this.generatePanels();
    this.setScore();

    this.sound.add('bgm');
    this.sound.play('bgm');

    this.createSnow();

    this.physics.add.collider(this.santa, this.panels);
  }

  update(): void{
    this.santa.handleInput();
  }


  setScore(): void{
    // update the score
    this.score += 1;
    this.scoreText[0].setText("" + this.score);
    this.scoreText[1].setText("" + this.score);
  }

  generatePanels(): void{
    
    // randomly pick a number between 1 and 5
    for(let i=0; i < 3; i++){
      let x = Math.floor(Math.random() * this.sys.canvas.width);
      let y = Math.floor(Math.random() * this.sys.canvas.height);
  
      this.generateOnePanel(x,y, 0)  
    }
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
