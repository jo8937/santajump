/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @license      Digitsensitive
 */

export class MainScene extends Phaser.Scene {
  private phaserSprite: Phaser.GameObjects.Sprite;

  constructor() {
    super({
      key: "MainScene"
    });
  }

  preload(): void {
    //this.load.image("logo", "./assets/santa-sd-720.png");
    this.load.image("logo", "./assets/dummy.png");
  }

  create(): void {
    this.phaserSprite = this.add.sprite(<number> this.game.config.width,<number> this.game.config.height, "logo");
  }
}
