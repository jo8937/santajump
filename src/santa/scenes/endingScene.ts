/**
 * 
 * 
 * 
 */

export class EndingScene extends Phaser.Scene {
  private infoText: Phaser.GameObjects.Text[];
  
    // Back Ground
  //private bg: Phaser.GameObjects.Image;
  private scg: Phaser.GameObjects.Sprite;
  //private scg_timeline: Phaser.Tweens.Timeline;
  //private scg_tween: Phaser.Tweens.Tween;


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
    this.scg = this.add.sprite(-this.sys.canvas.width,this.sys.canvas.height / 2,"endcg");
    this.scg.setAlpha(0.6);
    //this.scg.setScale(0.95);
    this.setScgTimeline()
    //this.scg_tween.play();
  }

  private setText(){
    this.infoText = [
      this.add.text(
        200,
        30,
        "C L E A R",
        {
          fontSize: "34px",
          fill: "#fff"
        }
      ),
      this.add.text(
        200,
        60,
        "Merry Christmas !!",
        {
          fontSize: "18px",
          fill: "#fff"
        }
      )
      ];
  }

  private setScgTimeline() {
    //this.scg_timeline =  this.tweens.createTimeline({});
    this.tweens.add({
      targets: this.scg,
      x: this.sys.canvas.width / 2 - 120,               // '+=100'
      y: this.sys.canvas.height / 2,               // '+=100'
      alpha: 1,
      ease: "Bounce", // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 1000,
      repeat: 0, // -1: infinity
      yoyo: false,
      // offset: '-=500',   // starts 500ms before previous tween ends
      onComplete: ((deadScene) => () => {
        deadScene.setText();
        deadScene.input.once('pointerdown', ()=>{
          location.href="/";
          //this.scene.start("MainScene");
        });
      })(this)
    });
  }

}
