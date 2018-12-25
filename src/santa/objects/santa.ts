declare var gyro: any;
import { MainScene } from "../scenes/mainScene";
import { Keys } from "../component/keys";

export class Santa extends Phaser.GameObjects.Sprite {
  private anim: Phaser.Tweens.Tween[];
  private isDead: boolean = false;
  private isDeading: boolean = false;
  //private cursors: Phaser.Input.Keyboard.CursorKeys;
  private pointers: Phaser.Input.Pointer;
  private jumpKey: Phaser.Input.Keyboard.Key;
  private leftKey: Phaser.Input.Keyboard.Key;
  private rightKey: Phaser.Input.Keyboard.Key;

  public isMuteki: boolean = false;

  private isJumping: boolean = false;
  private isPointerDown: boolean = false;

  private velMove = 150;
  private velDefault = 150;
  private velDur = 200;
  private velMinLimit = 1000;
  private vec: Vector2Like = { x: 0, y: 100 };
  private gyroX: number = 0;

  private aBody: Phaser.Physics.Arcade.Body = null;
  private aScene: MainScene = null;

  private jumpSound : Phaser.Sound.BaseSound;

  public lastLandedPanelPos: Vector2Like = { x: 0, y: 0 };

  private movable : boolean = true;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | integer
  ) {
    super(scene, x, y, texture, frame);
    this.aScene = <MainScene> scene;

    this.initAnimation()

    // physics
    scene.physics.world.enable(this);
    this.aBody = <Phaser.Physics.Arcade.Body> this.body;
    this.setOrigin(0, 0);
    this.setScale(0.6);
    this.aBody.setBounce(1, 0);
    this.aBody.setCollideWorldBounds(true);
    this.aBody.world.checkCollision.up = false;
    this.aBody.world.checkCollision.down = false;
    this.aBody.setAllowGravity(true);

    this.scene.game.registry.set(Keys.SANTA_HEIGHT.toString(),this.height);
    // animations & tweens
    this.anim = [];
    //   this.anim.push(
    //     params.scene.tweens.add({
    //       targets: this,
    //       duration: 100,
    //       angle: 1
    //     })
    //   );
    this.registInput(scene);
    
    //params.scene.aud

    scene.add.existing(this);
    
    this.jumpSound = this.scene.sound.add('jump');

    
  }

  private registInput(scene){

    // input

    this.jumpKey = scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.leftKey = scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.LEFT
    );
    this.rightKey = scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT
    );
    this.jumpKey.duration = 10

    //this.cursors = params.scene.input.keyboard.createCursorKeys();
    this.pointers = scene.input.activePointer;
    //params.scene.input.keyboard.addKeyCapture([ Phaser.Input.Keyboard. .LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR ]);

    this.addGyro();
    scene.input.on("pointerdown", pointer => {
      this.isPointerDown = true;
    });
    scene.input.on("pointerup", pointer => {
      this.isPointerDown = false;
    });
  }

  public getDead(): boolean {
    return this.isDead;
  }

  public setDead(dead): void {
    this.isDead = dead;
  }

  public showDead(){
    this.isDeading = true;
    this.setTint(0xFF0000);
    this.anims.play("turn");
  }
  public showRebirth(){
    this.isDeading = false;
    this.setLeft();
    this.setTint(0xFFFFFF);
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
        frameRate: 10
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


  public addGyro(): void {
    if (gyro) {
      gyro.frequency = 10;
      // start gyroscope detection
      gyro.startTracking(
        (function(parent) {
          // updating player velocity
          return function(o) {
            if (o && o.gamma) {
              parent.gyroX = o.gamma;
            }
          };
          //player.body.velocity.y += o.beta/20;
        })(this)
      );
    }
  }

  private inputLeft(){
    return this.leftKey.isDown || this.gyroX < 0;
  }
  
  private inputRight(){
    return this.rightKey.isDown || this.gyroX > 0;
    
  }

  private inputJump(){
    return (this.isPointerDown || this.jumpKey.isDown);
  }

  private jump(){
    if(!this.isJumping){
      this.isJumping = true;
      this.aBody.setVelocityY(-this.velDefault);
      this.jumpSound.play();
      this.scene.events.emit("jump");
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
    this.aBody.setVelocityX(-this.velMove);
    this.setLeft();
  }

  private goRight(){
    this.aBody.setVelocityX(this.velMove);
    this.setRight();
  }

  private setLeft(){
    this.anims.play("left", true);
  }

  private setRight(){
    this.anims.play("right", true);
  }

  public checkInput(): void {
    let fire_jump =  this.inputJump()
    if (fire_jump) { 
      this.jump();
    }
    this.neutral(fire_jump);
    
    // if (this.inputRight()) {
    //   this.goRight();    
    // }else if (this.inputLeft()) {
    //   this.goLeft();
    // }
  }
  
  public setDeading(d : boolean){
    this.isDeading = d
  }
  public getDeading(){
    return this.isDeading;
  }

  public checkState(){
    if(!this.isDeading)
    {
      if(this.aBody.velocity.x > 0){
        this.setRight();
      }else if(this.aBody.velocity.x < 0){
        this.setLeft();
      }else{
        this.goRight();
      }
    }

    // if(this.aBody.y < this.aScene.scrollBorderLineY){
    //   //this.aScene.
    //   this.aScene.scrollBackground(this.aBody.y);
    // }

  }


  public startMutekiTimer(){
    this.isMuteki = true;
    let oncomp = ()=>{
      this.isMuteki = false;
      this.setAlpha(1);
    };
    this.scene.tweens.add({
      targets: this,
      alpha: 0.1,
      yoyo:false,
      repeat:3,
      duration: 500,
      onComplete: oncomp
    });
  }

  update(): void {
    this.checkInput();
    this.checkState();
  }

}
