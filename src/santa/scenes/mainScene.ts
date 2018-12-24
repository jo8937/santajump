import { Santa } from "../objects/santa";
import { Panel } from "../objects/panel";
import { Status } from "../component/status";
import { Life } from "../component/life";
import { Stage } from "../component/stage";
import { BackGroundScene } from "./backGroundScene";
import { UIScene } from "./uiScene";

export class MainScene extends Phaser.Scene {
  private phaserSprite: Phaser.GameObjects.Sprite;

  public mapHeight : integer = 2000;
  // variables
  private timer: Phaser.Time.TimerEvent;

  // Chara
  private santa: Santa;

  public life : Life;

  private stage: Stage;
 
  private bg : BackGroundScene;
  private ui : UIScene;

  constructor() {
    super({
      key: "MainScene"
    });
  }

  init(): void {
    // objects
    this.santa = null;
    // variables
    this.timer = undefined;

    this.life = null;

    this.bg = null;
    

  }

  createBackground(){
    this.scene.launch("BackGroundScene");
    this.scene.sendToBack("BackGroundScene"); 
    this.bg = <BackGroundScene> this.scene.get("BackGroundScene");
  }

  createUI(){
    this.scene.launch("UIScene");
    this.scene.bringToTop("UIScene"); 
    this.ui = <UIScene> this.scene.get("UIScene");
  }

  create(): void {
    this.createBackground();
    
    //let data = this.cache.json.get('preload');
    this.life = new Life(this.game.registry);
    this.stage = new Stage(this);
        
    
    this.stage.createStage();
    this.stage.generatePanels();
    this.createSanta();

    this.physics.add.collider(this.santa, this.stage.panels);
    this. setCamera();

    this.createUI();
  }

  private setCamera(){
    this.cameras.main.setSize(this.sys.canvas.width,this.sys.canvas.height);
    this.cameras.main.startFollow(this.santa);
    this.cameras.main.setBounds(0, -this.mapHeight, this.sys.canvas.width,this.sys.canvas.height+this.mapHeight);
  }

  createSanta(){
    
    this.santa = new Santa({
      scene: this,
      x: 50,
      y: 100,
      key: 'santa'
    });
  }

  update(): void{
    this.santa.update();
    this.checkGameState();
  }

  private timeoutFlag : number;

  public checkGameState(){
    if(this.santa.getDead()){
      // timer popup
      this.life.reduceLife();
      
      if(this.life.noLife()){
        this.game.sound.stopAll();

        this.time.addEvent({
          delay:1000,
          callback: ()=>{
            this.scene.stop("UIScene");  
            this.scene.stop("BackGroundScene");  
            this.scene.start("DeadScene");  
          }
        })
        // setTimeout(() => {
        //   this.scene.stop("MainScene");
        //   this.scene.start("DeadScene");
        // },1000);
      }else{
        this.scene.pause('MainScene');
        this.santa.setDead(false);
        if(!this.timeoutFlag){
          clearTimeout(this.timeoutFlag);
        }
        this.timeoutFlag = setTimeout(() => {
          this.resetSanta();
          //this.game.sound.resumeAll();
          if(this.ui != null){
            this.ui.rewindBgm();
          }
          this.scene.resume('MainScene');
        },1000);
      }
    }
  }

  public resetSanta(){
    this.santa.setDead(false);
    this.santa.placeStartLine();
  }

  private paused : boolean = false;

  public togglePause(){
    if(this.paused){
      this.scene.sleep("PauseScene");
      this.scene.moveDown("PauseScene");
      this.scene.resume();
    }else{
      this.scene.launch("PauseScene");
      this.scene.bringToTop("PauseScene");
      this.scene.pause();
    }
  }




}
