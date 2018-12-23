/**
 * 
 * 
 * 
 */

export class PauseScene extends Phaser.Scene {
  private bitmapTexts: Phaser.GameObjects.BitmapText[] = [];

  constructor() {
    super({
      key: "PauseScene"
    });
  }

  init(): void {
  }

  create(): void {
    this.bitmapTexts.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2,
        this.sys.canvas.height / 2,
        "Helvetica",
        "Pause",
        40
      )
    );
    
  }

}
