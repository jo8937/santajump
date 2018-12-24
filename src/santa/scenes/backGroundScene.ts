
export class BackGroundScene extends Phaser.Scene {

  constructor() {
    super({
      key: "BackGroundScene"
    });
  }

    // Back Ground
  private bg: Phaser.GameObjects.TileSprite;

  init(): void {
    this.bg = null;
    console.log("bg1");

  }

  create(): void {
    this.createBackground();
    this.createSnows();
    console.log("bg3");
  }
  
  public createBackground(){
    console.log("bg4");
    this.bg = this.add.tileSprite(this.sys.canvas.width / 2, this.sys.canvas.height / 2, this.sys.canvas.width, this.sys.canvas.height, "bg");
    //let chara = this.add.image(200,0,"scg",2);
    //let panels = this.physics.add.staticGroup();
    
  }

  public createSnows():void{
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

  public scrollBackground(upY : integer) : void{
    this.bg.setTilePosition(this.bg.tilePositionX,  upY);
  }
}
