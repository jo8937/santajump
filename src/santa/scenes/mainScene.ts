import { Santa } from "../objects/santa";
import { Panel } from "../objects/panel";
import { Score } from "../component/score";
import { Life } from "../component/life";
import { Stage } from "../component/stage";
import { Environments } from "../component/environments";

export class MainScene extends Phaser.Scene {
  private phaserSprite: Phaser.GameObjects.Sprite;

  public scrollBorderLineY : integer = 200;
  // variables
  private timer: Phaser.Time.TimerEvent;

  // Chara
  private santa: Santa;

  private life : Life;

  private score: Score;

  private stage: Stage;
 
  private envs : Environments;

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

    this.score = null;

    this.envs = null;


  }

  create(): void {
    //let data = this.cache.json.get('preload');


    this.envs = new Environments(this);
    this.score = new Score(this);
    this.life = new Life(this);
    this.stage = new Stage(this);
    
    this.envs.createBackground();
    this.envs.createSettings();
    this.envs.createSnows();
    this.envs.createBgm();

    this.score.createScore();
    this.score.updateScore();

    this.life.createStatus();
    
    this.stage.createStage();
    this.stage.generatePanels();
    this.createSanta();

    this.physics.add.collider(this.santa, this.stage.panels);
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
    this.envs.update();
    this.life.update();
    this.score.update();
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
            this.scene.stop("MainScene");
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
          this.envs.playBgm();
          this.scene.resume('MainScene');
        },1000);
      }
    }
  }

  public resetSanta(){
    this.santa.setDead(false);
    this.santa.x = 100; 
    this.santa.y = 100;
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
