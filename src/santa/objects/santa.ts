export class Santa extends Phaser.GameObjects.Sprite {
    private jumpKey: Phaser.Input.Keyboard.Key;
    private anim: Phaser.Tweens.Tween[];
    private isDead: boolean = false;
    private cursors : Phaser.Input.Keyboard.CursorKeys;

    private vec : Vector2Like = {x:0,y:100};
    private g : number = 0;
    
    public getDead(): boolean {
      return this.isDead;
    }
  
    public setDead(dead): void {
      this.isDead = dead;
    }
  
    constructor(params) {
      super(params.scene, params.x, params.y, params.key, params.frame);

      this.anims.animationManager.create({
        key: 'left',
        frames: this.anims.animationManager.generateFrameNumbers('santa', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.animationManager.create({
        key: 'turn',
        frames: [ { key: 'santa', frame: 4 } ],
        frameRate: 20
    });
    
    this.anims.animationManager.create({
        key: 'right',
        frames: this.anims.animationManager.generateFrameNumbers('santa', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

      // image
      //this.setScale(3);
      this.setOrigin(0, 0);
      // physics
      params.scene.physics.world.enable(this);
      (<Phaser.Physics.Arcade.Body> this.body).setBounce(0,0);
      (<Phaser.Physics.Arcade.Body> this.body).setCollideWorldBounds(true);
          
      // animations & tweens
      this.anim = [];
    //   this.anim.push(
    //     params.scene.tweens.add({
    //       targets: this,
    //       duration: 100,
    //       angle: 1
    //     })
    //   );
  

      // input
      this.jumpKey = params.scene.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.SPACE
      );
  
      this.cursors = params.scene.input.keyboard.createCursorKeys();

      params.scene.add.existing(this);
      window.addEventListener("devicemotion", (ev) =>{
            this.g = (<any>ev).gamma;
      }, true);

    }


  public handleInput(): void {
    if (this.cursors.right.isDown || this.g < 0) {
        (<Phaser.Physics.Arcade.Body> this.body).setVelocityX(300);
        this.anims.play('right',true);
    } else if (this.cursors.left.isDown || this.g > 0) {
        (<Phaser.Physics.Arcade.Body> this.body).setVelocityX(-300);
        this.anims.play('left',true);
    }else if(this.cursors.up.isDown) {
        (<Phaser.Physics.Arcade.Body> this.body).setVelocityY(-this.vec.y);
        this.vec.y+=10;
    }else if(this.cursors.down.isDown) {
        (<Phaser.Physics.Arcade.Body> this.body).setVelocityY(this.vec.y);
        this.vec.y = 100;
    }

    // if (this.jumpKey.isDown) {
    //     this.flap();
    //   }
  }

    update(): void {
      //this.handleInput();
      //this.isOffTheScreen();
    }
  
    private isOffTheScreen(): void {
      if (this.y + this.height > this.scene.sys.canvas.height) {
        this.isDead = true;
      }
    }
  }