/**
 * 
 * 
 * 
 */

export class EndingScene extends Phaser.Scene {
  private infoText: Phaser.GameObjects.Text[];
  
    // Back Ground
  private bg: Phaser.GameObjects.Image;

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
    this.bg = this.add.image(this.sys.canvas.width / 2,this.sys.canvas.height / 2,"endcg");
    
    this.infoText = [
      this.add.text(
        20,
        20,
        "C L E A R",
        {
          fontSize: "32px",
          fill: "#000"
        }
      ),
      this.add.text(
        20,
        60,
        "Merry Christmas !!",
        {
          fontSize: "14px",
          fill: "#000"
        }
      )
      ];

    this.input.once('pointerdown', ()=>{
      location.href="/";
      //this.scene.start("MainScene");
    });
  }



}
