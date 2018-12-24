import { Santa } from "../objects/santa";
import { Panel } from "../objects/panel";
import { Life } from "../component/life";
import { Stage } from "../component/stage";
import { BackGroundScene } from "./backGroundScene";
import { UIScene } from "./uiScene";
import { Hukuro } from "../objects/hukuro";

export class MainScene extends Phaser.Scene {
  private phaserSprite: Phaser.GameObjects.Sprite;

  public mapHeight : integer = 2000;
  // variables
  private timer: Phaser.Time.TimerEvent;


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
    //  this.stage.generatePanels();

    this.physics.add.collider(this.stage.santa, this.stage.panels);
    this.physics.add.collider(this.stage.santa, this.stage.objects);
    this.physics.add.collider(this.stage.objects, this.stage.panels);
    this.physics.add.collider(this.stage.enermies, this.stage.panels);
    this.physics.add.overlap(this.stage.santa, this.stage.enermies, this.hitEnermy, null, this);

    this. setCamera();

    this.createUI();
  }

  private setCamera(){
    this.cameras.main.setSize(this.sys.canvas.width,this.sys.canvas.height);
    this.cameras.main.startFollow(this.stage.santa);
    this.cameras.main.setBounds(0, -this.mapHeight, this.sys.canvas.width,this.sys.canvas.height+this.mapHeight);
  }


  update(): void{
    this.stage.santa.update();
    this.checkGameState();
  }

  private timeoutFlag : number;

  public checkGameState(){
    if(this.stage.santa.getDead()){
      // timer popup
      this.life.reduceLife();
      this.stage.santa.showDead();
      this.physics.pause();

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
        //this.scene.pause('MainScene');
        this.stage.santa.setDead(false);
        this.ui.pauseBgm();
        if(!this.timeoutFlag){
          clearTimeout(this.timeoutFlag);
        }
        this.timeoutFlag = setTimeout(() => {
          this.stage.santa.showRebirth();
          this.resetSanta();
          this.physics.resume();
          //this.game.sound.resumeAll();
          if(this.ui != null){
            this.ui.rewindBgm();
          }
        },1000);
      }
    }
  }

  public resetSanta(){
    this.stage.placeStartLine();
    this.stage.santa.setDead(false);
  }
  public togglePause(){
    if(this.scene.isActive("PauseScene") && this.scene.isVisible("PauseScene")){
      console.log("resume");
      this.scene.sleep("PauseScene");
      this.scene.moveDown("PauseScene");
      this.scene.resume();
    }else{
      this.scene.launch("PauseScene");
      this.scene.bringToTop("PauseScene");
      this.scene.pause();
    }
  }

  hitEnermy (player, enermy)
  {
      this.physics.pause();
      this.stage.santa.setDead(true);
  }

}
