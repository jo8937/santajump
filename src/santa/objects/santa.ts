declare var gyro: any;

export class Santa extends Phaser.GameObjects.Sprite {
  private anim: Phaser.Tweens.Tween[];
  private isDead: boolean = false;
  //private cursors: Phaser.Input.Keyboard.CursorKeys;
  private pointers: Phaser.Input.Pointer;
  private jumpKey: Phaser.Input.Keyboard.Key;
  private leftKey: Phaser.Input.Keyboard.Key;
  private rightKey: Phaser.Input.Keyboard.Key;

  private isJumping: boolean = false;
  private isPointerDown: boolean = false;

  private velDefault = 500;
  private velDur = 200;
  private velMinLimit = 1000;
  private vec: Vector2Like = { x: 0, y: 100 };
  private g: number = 0;

  private aBody: Phaser.Physics.Arcade.Body = null;

  public getDead(): boolean {
    return this.isDead;
  }

  public setDead(dead): void {
    this.isDead = dead;
  }

  initAnimation() : void {
    this.anims.animationManager.create({
        key: "left",
        frames: this.anims.animationManager.generateFrameNumbers("santa", {
          start: 0,
          end: 3
        }),
        frameRate: 10,
        repeat: -1
      });
  
      this.anims.animationManager.create({
        key: "turn",
        frames: [{ key: "santa", frame: 4 }],
        frameRate: 20
      });
  
      this.anims.animationManager.create({
        key: "right",
        frames: this.anims.animationManager.generateFrameNumbers("santa", {
          start: 5,
          end: 8
        }),
        frameRate: 10,
        repeat: -1
      });
  }

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    this.initAnimation()

    // physics
    params.scene.physics.world.enable(this);
    this.aBody = <Phaser.Physics.Arcade.Body> this.body;
    this.setOrigin(0, 0);
    this.setScale(0.5);
    this.aBody.setBounce(0, 0);
    this.aBody.setCollideWorldBounds(true);
    this.aBody.setAllowGravity(true);

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
    this.leftKey = params.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.LEFT
    );
    this.rightKey = params.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT
    );
    this.jumpKey.duration = 10

    //this.cursors = params.scene.input.keyboard.createCursorKeys();
    this.pointers = params.scene.input.activePointer;
    //params.scene.input.keyboard.addKeyCapture([ Phaser.Input.Keyboard. .LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR ]);

    this.addGyro();
    params.scene.input.on("pointerdown", pointer => {
      this.isPointerDown = true;
    });
    params.scene.input.on("pointerup", pointer => {
      this.isPointerDown = false;
    });
    params.scene.add.existing(this);
  }

  public addGyro(): void {
    if (gyro) {
      gyro.frequency = 10;
      // start gyroscope detection
      gyro.startTracking(
        (function(parent) {
          // updating player velocity
          return function(o) {
            if (o && o.gamma) {
              parent.g = o.gamma;
            }
          };
          //player.body.velocity.y += o.beta/20;
        })(this)
      );
    }
  }

  private inputLeft(){
    return this.leftKey.isDown || this.g < 0;
  }
  
  private inputRight(){
    return this.rightKey.isDown || this.g > 0;
  }

  private inputJump(){
    return (this.isPointerDown || this.jumpKey.isDown);
  }

  private jump(){
    if(!this.isJumping){
      this.isJumping = true;
      this.aBody.setVelocityY(-this.velDefault);
    }
  }

  private neutral(jumpingInput: boolean){
    if(jumpingInput){
      this.vec.y = this.vec.y + this.velDur;
      if(this.vec.y <= this.velMinLimit){
        this.aBody.setVelocityY(-this.vec.y);
      }
    }else{
      if(this.isJumping){
        if(this.aBody.velocity.y < 0){
          this.aBody.setVelocityY(this.aBody.velocity.y + this.velDur);
        }
      }

      if(this.aBody.blocked.down || this.aBody.velocity.y == 0){
        this.isJumping = false;
        this.vec.y = this.velDur;
      }
    }
  }

  private goLeft(){
    this.aBody.setVelocityX(-300);
    this.anims.play("left", true);
  }

  private goRight(){
    this.aBody.setVelocityX(300);
    this.anims.play("right", true);
  }

  public checkInput(): void {
    let fire_jump =  this.inputJump()
    if (fire_jump) { 
      this.jump();
    }
    this.neutral(fire_jump);
    
    if (this.inputRight()) {
      this.goRight();    
    }else if (this.inputLeft()) {
      this.goLeft();
    }
  }

  public checkState(){
    
  }

  update(): void {
    this.checkInput();
    this.checkState();
  }



  private isOffTheScreen(): void {
    if (this.y + this.height > this.scene.sys.canvas.height) {
      this.isDead = true;
    }
  }
}
