export class Enermy extends Phaser.GameObjects.Sprite {
  key : string = "";
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    key: string,
    frame?: string | integer
  ) {
    super(scene, x, y,key, frame);
    this.key = key;
    this.setOrigin(0, 0);
    this.setScale(0.5);

    scene.physics.world.enable(this);
    let abody = <Phaser.Physics.Arcade.Body>this.body;
    abody.setCollideWorldBounds(false);
    abody.setAllowGravity(true);
    //abody.setImmovable(true);
    abody.setBounce(0,0);
    abody.setSize(abody.width/2, abody.height);
    scene.add.existing(this);
    this.initAnimation();
  }

  initAnimation() : void {
    this.anims.animationManager.create({
        key: "nurunuru",
        frames: this.anims.animationManager.generateFrameNumbers(this.key, {
          start: 0,
          end: 2
        }),
        frameRate: 5,
        repeat: -1
      });
    this.anims.play("nurunuru", true);
  }

}
