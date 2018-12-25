/**
 *
 *
 *
 */

export class DeadScene extends Phaser.Scene {
  private infoText: Phaser.GameObjects.Text[];
  private scg: Phaser.GameObjects.Sprite;
  private scg_timeline: Phaser.Tweens.Timeline;

  constructor() {
    super({
      key: "DeadScene"
    });
  }

  init(): void {}

  private setText() {
    this.infoText = [
      this.add.text(
        this.sys.canvas.width / 2 - 80,
        this.sys.canvas.height / 3,
        "Game Over",
        {
          fontSize: "32px",
          fill: "#000"
        }
      ),
      this.add.text(
        this.sys.canvas.width / 2 - 80,
        60 + this.sys.canvas.height / 3,
        "Click to restart game",
        {
          fontSize: "14px",
          fill: "#000"
        }
      )
    ];
  }
  jumpSound : Phaser.Sound.BaseSound;
  create(): void {
    this.jumpSound = this.sound.add('jump');
    this.scg = this.add.sprite(
      this.sys.canvas.width / 2,
      this.sys.canvas.height / 2,
      "scg",
      0
    );
    this.setFailFace();
    this.setText();
    this.setScgTimeline();

    this.input.once("pointerdown", () => {
      //let deadFrameIdx = 2 + Math.floor(Math.random() * 4);
      // warai
      this.setWarai();
      this.scg_timeline.play();
    });
  }

  private setScgTimeline() {
    this.scg_timeline = this.tweens.createTimeline({});
    this.scg_timeline.add({
      targets: this.scg,
      //x: 400,               // '+=100'
      y: this.scg.y + 50,
      ease: "Cubic", // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 600,
      repeat: 0, // -1: infinity
      yoyo: false,
      // offset: '-=500',   // starts 500ms before previous tween ends
      onComplete: ((deadScene) => () => deadScene.setRebirthFace())(this)
    });
    this.scg_timeline.add({
      targets: this.scg,
      //x: 400,               // '+=100'
      y: -800,
      scaleX: 0.5,
      scaleY: 0.5,
      ease: "Bounce", // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 1200,
      repeat: 0, // -1: infinity
      yoyo: false,
      // offset: '-=500',   // starts 500ms before previous tween ends
      onComplete: ((deadScene) => () => deadScene.backToGame())(this)
    });
  }

  public setFailFace() {
    let idx = 2 + Math.floor(Math.random() * 4);
    this.scg.setFrame(idx);
  }
  public setRebirthFace() {
    let idx = Math.floor(Math.random()  * 2);
    this.scg.setFrame(idx);
    this.jumpSound.play();
    //this.scg_timeline.play();
  }
  public setWarai() {
    this.scg.setFrame(6);
  }
  public backToGame() {
    this.scene.stop("BackGroundScene");
    this.scene.stop("UIScene");
    this.scene.stop("DeadScene");
    this.scene.start("MainScene");
  }
}
