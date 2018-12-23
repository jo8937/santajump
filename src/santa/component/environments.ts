import { MainScene } from "../scenes/mainScene";

export class Environments {
  
  private scene: MainScene;
    // Back Ground
  private bg: Phaser.GameObjects.TileSprite;

  private bgm : Phaser.Sound.BaseSound;

  private soundToggleKey: Phaser.Input.Keyboard.Key;

  constructor(scene) {
    this.scene = scene;
  }

  createSettings(){
        
  }

  public checkLife(){

  }

  public createBgm(){

    this.bgm = this.scene.sound.add('bgm');
    this.playBgm();

    this.soundToggleKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ESC
    );

  }

  public playBgm(){
    //this.scene.sound.play('bgm',  { loop : true } );
    this.bgm.play("",  { loop: true });
  }

  public createBackground(){

    this.bg = this.scene.add.tileSprite(this.scene.sys.canvas.width / 2, this.scene.sys.canvas.height / 2, this.scene.sys.canvas.width, this.scene.sys.canvas.height, "bg");
    //let chara = this.add.image(200,0,"scg",2);
    //let panels = this.physics.add.staticGroup();
    
  }

  public createSnows():void{
    let particles = this.scene.add.particles('snowflakes');
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


  public update(){
    
    if(Phaser.Input.Keyboard.JustDown(this.soundToggleKey)){
      if ( this.bgm.isPlaying ) {
        this.bgm.stop();
        //this.scene.sound.stopAll();
      }else{
        this.bgm.play();
      }
    }
  }
}
  