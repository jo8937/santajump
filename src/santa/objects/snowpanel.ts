declare var gyro: any;

export class Snowpanel extends Phaser.GameObjects.Sprite {
    private anim: Phaser.Tweens.Tween[];
  
    constructor(params) {
      super(params.scene, params.x, params.y, params.key, params.frame);
    }


  }