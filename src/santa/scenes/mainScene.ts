import { Santa } from "../objects/santa";
import { Panel } from "../objects/panel";
import { Life } from "../component/life";
import { Stage } from "../component/stage";
import { BackGroundScene } from "./backGroundScene";
import { UIScene } from "./uiScene";
import { Hukuro } from "../objects/hukuro";
import { Keys } from "../component/keys";

export class MainScene extends Phaser.Scene {
  private phaserSprite: Phaser.GameObjects.Sprite;

  // variables
  private timer: Phaser.Time.TimerEvent;
  private totalSecond : number = 0;

  public life : Life;

  public stage: Stage;
 
  private bg : BackGroundScene;
  private ui : UIScene;

  private canvas_height : number = 0;
  private canvas_width : number = 0;


  constructor() {
    super({
      key: "MainScene"
    });
  }

  init(): void {

    // variables
    this.timer = undefined;
    this.totalSecond = 0;
    this.life = null;

    this.bg = null;
    
    this.canvas_width = this.sys.canvas.width;
    this.canvas_height = this.sys.canvas.height;
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

    this.physics.add.collider(this.stage.santa, this.stage.panels, this.hitPanelLanding, null, this);
    this.physics.add.collider(this.stage.santa, this.stage.objects, this.hitPresent, null, this);

    this.physics.add.collider(this.stage.objects, this.stage.panels);
    this.physics.add.collider(this.stage.enermies, this.stage.panels);

    this.physics.add.overlap(this.stage.santa, this.stage.enermies, this.hitEnermy, null, this);

    this. setCamera();

    this.createUI();
    this.initEventListener();
    this.setTimer();
  }

  private setCamera(){
    this.cameras.main.setSize(this.canvas_width,this.canvas_height);
    this.cameras.main.startFollow(this.stage.santa);
    this.cameras.main.setBounds(0, -this.stage.totalHeight, this.canvas_width, this.canvas_height+this.stage.totalHeight);
  }


  update(): void{
    this.stage.santa.update();
    this.checkOffTheScreen();
    this.checkGameState();
  }

  public checkOffTheScreen(){
    if(!this.stage.santa.getDeading() && this.isOffTheScreen()){
      this.stage.santa.setDead(true);
    }

  }
  private isOffTheScreen(): boolean {
    return (this.stage.santa.y > this.canvas_height + this.stage.santa.height);
  }
  private timeoutFlag : number;

  gameover(){
    this.game.sound.stopAll();
    this.time.addEvent({
      delay:1000,
      callback: ()=>{
        this.scene.stop("MainScene");  
        this.scene.stop("UIScene");  
        this.scene.stop("BackGroundScene");
        this.scene.stop("PauseScene");  
        this.scene.start("DeadScene");  
      }
    })
  }

  public rebirth(){
        //this.scene.pause('MainScene');
        this.ui.pauseBgm();
        this.time.addEvent({
          delay:1000,
          callback: () => {
            this.stage.santa.showRebirth();
            this.resetSanta();
            this.resetPanel();
            this.physics.resume();
            //this.game.sound.resumeAll();
            if(this.ui != null){
              this.ui.rewindBgm();
            }
          }
        });
  }

  public checkGameState(){
    if(this.stage.santa.getDead()){
      this.stage.santa.setDead(false);
      // timer popup
      this.life.reduceLife();
      this.stage.santa.showDead();
      this.physics.pause();
      
      if(this.life.noLife()){
        this.gameover();
      }else{
        this.rebirth();
      }
    }
  }

  public resetSanta(){
    this.stage.placeSantaLastLanded();
    this.stage.santa.startMutekiTimer();
    this.stage.santa.setDead(false);
  }

  public resetPanel(){
    for(let panelobject of this.stage.panels.getChildren()){
      let panel = <Panel> panelobject;
      panel.setActive(true);
      panel.setVisible(true);
    }
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

  hitEnermy (player : 	Phaser.GameObjects.GameObject, enermy : 	Phaser.GameObjects.GameObject)
  {
      this.physics.pause();
      if(this.stage.santa.isMuteki){
        this.physics.resume();
      }else{
        enermy.destroy(true);
        this.stage.santa.setDead(true);
      }
  }

  hitPresent (player : 	Phaser.GameObjects.GameObject, hukuro : 	Phaser.GameObjects.GameObject)
  {
      this.physics.pause();
      this.stage.santa.setDeading(true);
      this.stage.santa.anims.play("turn");
      this.game.registry.set(Keys.TOTAL_SECOND.toString() , 1 + this.totalSecond);
      this.time.addEvent({
        delay:1000,
        callback: () => {
          this.scene.stop("MainScene");  
          this.scene.stop("PauseScene");  
          this.scene.stop("DeadScene");  
          this.scene.stop("UIScene");  
          this.scene.stop("BackGroundScene");  
          this.scene.start("EndingScene");  
        }
      });
  }

  hitPanelLanding(player : 	Phaser.GameObjects.GameObject, panel :	Phaser.GameObjects.GameObject)
  {
    let p = <Panel> panel;
    if(!p.landed){
      let santa =  <Santa> player;
      if(p.y >= (santa.y + santa.height / 2)){
        p.landed = true;
        santa.lastLandedPanelPos.x = p.x;
        santa.lastLandedPanelPos.y = p.y;
        this.ui.updateScore(p.floor);
      }
    }
  }

  ////
  initEventListener(){
    var eventEmitter = this.events;
    eventEmitter.on('jump', this.checkOutOfBound, this);
  }

  checkOutOfBound ()
  {
      let removeList : Panel[] = null;
      for(let panelobject of this.stage.panels.getChildren()){
          let panel = <Panel> panelobject;
          if( panel.y > this.stage.santa.y + this.canvas_height){
            
            if(removeList == null){
              removeList = [];
            }
            removeList.push(panel);
          }
      }

      if(removeList != null){
        for(let p of removeList){
          //console.log(p.floor);
          p.destroy();
        }
      }

  }

  setTimer(){
    //this.timer = this.time.delayedCall(200,this.updateTimeAttack,[],this);
    this.timer = this.time.addEvent({
      delay: 1000,
      callback: this.updateTimeAttack,
      loop:true,
      callbackScope: this
    });
  }

  updateTimeAttack(){
    if(this.timer != null){
      this.totalSecond++;
      this.ui.setSecond(this.totalSecond);
      //console.log( this.timer.getRepeatCount() );
    }
  }
}
