/**
 * 
 * 
 * 
 */

export class DeadScene extends Phaser.Scene {
  private infoText: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: "DeadScene"
    });
  }

  init(): void {
    
  }

  create(): void {
    this.infoText = 
      this.add.text(
        this.sys.canvas.width / 2,
        this.sys.canvas.height / 2,
        "Dead",
        {
          fontSize: "28px",
          fill: "#000"
        }
      );

    this.input.once('pointerdown', function (deads) {
        return () =>{ 
          deads.scene.stop('DeadScene');
          deads.scene.start("MainScene");
        };
    }(this));
  }

}
