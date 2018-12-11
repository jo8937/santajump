export class Panel extends Phaser.GameObjects.Sprite {
    constructor(params) {
      super(params.scene, params.x, params.y, params.key, params.frame);
  
      // image
      // this.setScale(3);
      this.setOrigin(0, 0);
  
      // physics
      params.scene.physics.world.enable(this);
    //   this.body.allowGravity = false;
    //   this.body.setVelocityX(-200);
    //   this.body.setSize(20, 20);
      this.setOrigin(0, 0);
      (<Phaser.Physics.Arcade.Body>this.body).setBounce(1, 1);
      (<Phaser.Physics.Arcade.Body>this.body).setCollideWorldBounds(true);
      (<Phaser.Physics.Arcade.Body>this.body).setAllowGravity(false);

      params.scene.add.existing(this);
    }
  }
  