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


  public checkGameState(){
    if(this.santa.getDead()){
      // timer popup
      this.life.reduceLife();
      this.scene.pause('MainScene');

      if(this.life.noLife()){
        this.scene.start("DeadScene");
      }else{
        this.resetSanta();
        this.scene.resume('MainScene');
      }
    }
  }

  public resetSanta(){
    this.santa.setDead(false);
    this.santa.x = 100; 
    this.santa.y = 100;
  }




}
