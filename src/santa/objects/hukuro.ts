export class Hukuro extends Phaser.GameObjects.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    frame?: string | integer
  ) {
    super(scene, x, y,"hukuro", frame);
    this.setOrigin(0, 0);

    scene.physics.world.enable(this);
    let abody = <Phaser.Physics.Arcade.Body>this.body;
    abody.setCollideWorldBounds(true);
    abody.setAllowGravity(true);

    scene.add.existing(this);
  }
}
