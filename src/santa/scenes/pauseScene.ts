import { MainScene } from "./mainScene";

/**
 * 
 * 
 * 
 */

export class PauseScene extends Phaser.Scene {
  private infoText: Phaser.GameObjects.Text[];

  constructor() {
    super({
      key: "PauseScene"
    });
  }

  init(): void {
  }

  create(): void {
    let x = this.sys.canvas.width / 2 - 80;
    this.infoText = [
      this.add.text(
        x,
        this.sys.canvas.height / 4,
        "Pause",
        {
          fontSize: "32px",
          fill: "#fff"
        }
      ),
      this.add.text(
        x,
        30 + this.sys.canvas.height / 4,
        "Click to resume game",
        {
          fontSize: "14px",
          fill: "#fff"
        }
      )
      ];

    this.input.once('pointerdown', ()=>{
      console.log("pwn");
      this.scene.stop("PauseScene");
      this.scene.resume("MainScene");
    });
  }

}
