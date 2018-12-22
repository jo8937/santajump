import { Santa } from "../objects/santa";
import { Panel } from "../objects/panel";
import { Score } from "../component/score";
import { Life } from "../component/life";

export class MainScene extends Phaser.Scene {
  private phaserSprite: Phaser.GameObjects.Sprite;

  public scrollBorderLineY : integer = 200;
  // variables
  private timer: Phaser.Time.TimerEvent;

  // Chara
  private santa: Santa;
  // Phaser.Physics.Arcade.StaticGroup;
  private panels: Phaser.GameObjects.Group;
  // Back Ground
  private bg: Phaser.GameObjects.TileSprite;

  private life : Life;

  private score: Score;
  

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
  }

  createSnow():void{
    let particles = this.add.particles('snowflakes');
    particles.createEmitter({
        x: { min: 0, max: 400 },
        y: { min: 0, max: 20 },
        lifespan: 5000,
        speedY: { min: 100, max: 200 },
        speedX: { min: -50, max: 50 },
        scale: { start: 0.2, end: 1 },
        quantity: 0.1,
        gravityY: 11,
        blendMode: Phaser.BlendModes.LUMINOSITY,
        rotate: { min: 0, max: 100 },
    });
  }

  create(): void {
    //let data = this.cache.json.get('preload');

    this.bg = this.add.tileSprite(this.sys.canvas.width / 2, this.sys.canvas.height / 2, this.sys.canvas.width, this.sys.canvas.height, "bg");
    //let chara = this.add.image(200,0,"scg",2);
    //let panels = this.physics.add.staticGroup();
    
    this.score = new Score(this);
    this.score.updateScore();

    this.life = new Life(this);
    this.life.createStatus();

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
    this.santa.update();
  }

  public scrollBackground(upY : integer) : void{
    this.bg.setTilePosition(this.bg.tilePositionX,  upY);
  }


  generatePanels(): void{
    
    let mintop = this.sys.canvas.height / 4;
    // randomly pick a number between 1 and 5
    for(let i=0; i < 10; i++){
      let x = Math.floor(Math.random() * this.sys.canvas.width);
      let y = mintop + Math.floor(Math.random() * (3 * this.sys.canvas.height / 4));
  
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
