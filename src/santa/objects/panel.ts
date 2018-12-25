import { Santa } from "./santa";

export class Panel extends Phaser.GameObjects.Sprite {
  public floor: number = 0;
  public landed : boolean = false;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | integer
  ) {
    super(scene, x, y, texture, frame);

    // image
    // this.setScale(3);
    this.setOrigin(0, 0);

    // physics
    scene.physics.world.enable(this);
    //   this.body.allowGravity = false;
    //   this.body.setVelocityX(-200);
    //   this.body.setSize(20, 20);
    this.setOrigin(0, 0);

    let abody = <Phaser.Physics.Arcade.Body>this.body;
    abody.setBounce(1, 1);
    abody.setCollideWorldBounds(false);
    abody.setAllowGravity(false);
    abody.setImmovable(true);

    scene.add.existing(this);
  }

  update(santa: Santa) {
    if (this.y >= santa.y + this.scene.sys.canvas.height) {
      this.destroy(true);
    }
  }

}
