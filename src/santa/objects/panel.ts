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

      let abody = <Phaser.Physics.Arcade.Body>this.body;
      abody.setBounce(0, 0);
      abody.setCollideWorldBounds(true);
      abody.setAllowGravity(false);
      abody.setImmovable(true);

      params.scene.add.existing(this);
    }
  }
  