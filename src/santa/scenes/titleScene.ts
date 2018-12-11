/**
 * 
 * 
 * 
 */

export class TitleScene extends Phaser.Scene {
  private startKey: Phaser.Input.Keyboard.Key;
  private bitmapTexts: Phaser.GameObjects.BitmapText[] = [];

  constructor() {
    super({
      key: "TitleScene"
    });
  }

  init(): void {
    this.startKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S
    );
    this.startKey.isDown = false;
  }

  create(): void {
    this.bitmapTexts.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 135,
        this.sys.canvas.height / 2 - 80,
        "Helvetica",
        "FLAPPY BIRD",
        40
      )
    );

    this.bitmapTexts.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 50,
        this.sys.canvas.height / 2 - 10,
        "Helvetica",
        "S: PLAY",
        30
      )
    );
    
    //this.phaserSprite = this.add.sprite(<number> this.game.config.width,<number> this.game.config.height, "logo");
    
  }

  update(): void {
    if (this.startKey.isDown) {
      this.scene.start("GameScene");
    }
  }
}
