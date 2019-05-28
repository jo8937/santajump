/**
 * 
 * 
 * 
 */
//import axios from 'axios';
import { Keys } from '../component/keys';

export class EndingScene extends Phaser.Scene {
  private infoText: Phaser.GameObjects.Text[];
  
    // Back Ground
  //private bg: Phaser.GameObjects.Image;
  private scg: Phaser.GameObjects.Sprite;
  //private scg_timeline: Phaser.Tweens.Timeline;
  //private scg_tween: Phaser.Tweens.Tween;
  private XOR_KEY : number = 99181225;
  
  constructor() {
    super({
      key: "EndingScene"
    });
  }

  init(): void {
    
  }

  create(): void {
    this.scene.launch("BackGroundScene");
    this.scene.sendToBack("BackGroundScene");
    this.scg = this.add.sprite(-this.sys.canvas.width,this.sys.canvas.height / 2 + 15,"endcg");
    this.scg.setAlpha(0.6);
    //this.scg.setScale(0.95);
    this.setScgTimeline()
    //this.scg_tween.play();
  }

  private setText(){
    let startX = 190;
    let startY = 30;
    this.infoText = [
      this.add.text(
        startX,
        startY,
        "C L E A R",
        {
          fontSize: "34px",
          fill: "#fff"
        }
      ),
      this.add.text(
        startX,
        startY+35,
        "Time Attack : " + this.getTotalSecond() + "s",
        {
          fontSize: "12px",
          fill: "#fff"
        }
      ),
      this.add.text(
        startX,
        startY+55,
        "Merry Christmas and",
        {
          fontSize: "18px",
          fill: "#fff"
        }
      )
      ,
      this.add.text(
        startX,
        startY+75,
        "Happy New Year !!",
        {
          fontSize: "18px",
          fill: "#fff"
        }
      )
      ,
      this.add.text(
        startX,
        startY+95,
        "",
        {
          fontSize: "12px",
          fill: "#0ff",
          align: "left",
          wordWrap: { width: 200, useAdvancedWrap: true }
        }
      )
      ];
      
  }

  private getTotalSecond() : number{
    let total_second = 9999;
    let total_second_obj = this.game.registry.get(Keys.TOTAL_SECOND.toString());
    if(total_second_obj!= null){
      total_second = (<number> total_second_obj);
    }
    return total_second;
  }
  
  private setScgTimeline() {
    //this.scg_timeline =  this.tweens.createTimeline({});
    this.tweens.add({
      targets: this.scg,
      x: this.sys.canvas.width / 2 - 125,               // '+=100'
      y: this.sys.canvas.height / 2 + 15,               // '+=100'
      alpha: 1,
      ease: "Bounce", // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 1000,
      repeat: 0, // -1: infinity
      yoyo: false,
      // offset: '-=500',   // starts 500ms before previous tween ends
      onComplete: ((deadScene) => () => {
        deadScene.setText();
        deadScene.input.once('pointerdown', ()=>{
          let errorCallback = (err) => {
            this.infoText[this.infoText.length - 1].setText(err);
          }
          this.scene.stop("BackGroundScene");
          this.scene.stop("UIScene");
          this.scene.stop("DeadScene");
          this.scene.start("MainScene");
          //this.scene.start("MainScene");
          /*
          axios.post('/santaserver/regist', {
            tm: this.XOR_KEY ^ this.getTotalSecond()
          }).then(function (response) {
            console.log(response);
            location.href="/santaserver/ending";
          }).catch(function (error) {
            console.log(error);
            errorCallback(error);
          });
          */
        });
      })(this)
    });
  }

}
