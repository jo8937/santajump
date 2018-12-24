/**
 * 
 * 
 * 
 */

export class DeadScene extends Phaser.Scene {
  private infoText: Phaser.GameObjects.Text[];

  constructor() {
    super({
      key: "DeadScene"
    });
  }

  init(): void {
    
  }

  create(): void {
    this.infoText = [
      this.add.text(
        this.sys.canvas.width / 2,
        this.sys.canvas.height / 3,
        "Game Over",
        {
          fontSize: "32px",
          fill: "#000"
        }
      ),
      this.add.text(
        this.sys.canvas.width / 2,
        60 + this.sys.canvas.height / 3,
        "Click to restart game",
        {
          fontSize: "14px",
          fill: "#000"
        }
      )
      ];

    this.input.once('pointerdown', ()=>{
      console.log("pwn");
      this.scene.stop("DeadScene");
      this.scene.start("MainScene");
    });
  }



}
