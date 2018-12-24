import { MainScene } from "./mainScene";
import { Life } from "../component/life";
import { Keys } from "../component/keys";

/**
 *
 *
 *
 */

export class UIScene extends Phaser.Scene {
  private lifeImage: Phaser.GameObjects.Sprite[];

  private icon: Phaser.GameObjects.Sprite;
  private main: MainScene;

  private score: number = -1;
  private scoreMax: number = 11;

  private scoreText: Phaser.GameObjects.Text;
  private scoreMaxText: Phaser.GameObjects.Text;
  private heightText: Phaser.GameObjects.Text;

  // private debugText: Phaser.GameObjects.Text;
  private bgm: Phaser.Sound.BaseSound;
  private bgmbtn: Phaser.GameObjects.Sprite;

  private soundToggleKey: Phaser.Input.Keyboard.Key;

  constructor() {
    super({
      key: "UIScene"
    });
  }

  init(): void {
    this.main = null;
    this.icon = null;
    this.lifeImage = [];
  }

  create(): void {
    this.createStatus();
    this.registEvents();
  }

  public update() {
    this.lietenSettingKey();
    //this.checkAndDrawLife();
  }

  registEvents(){
    this.registry.events.on('changedata', this.updateData, this);
  }

  updateData(){
    
    this.redrawLife(
      (<number> this.game.registry.get(Keys.LIFE.toString())),
      (<number> this.game.registry.get(Keys.MAX_LIFE.toString()))
    );
  }


  createStatus() {
    this.main = <MainScene> this.scene.get("MainScene");

    let iconxy = this.initIcon();
    this.initLifeGage(this.main.life, iconxy);

    this.registIconAction();

    this.createBgm();
    this.createScore();
    this.updateScore();
  }

  public initIcon(): Vector2Like {
    let iconSrc = this.game.textures.get("icon").getSourceImage(0);
    let iconWidth = iconSrc.height;
    let iconY = iconSrc.height / 2;
    let iconX = this.sys.canvas.width - iconWidth / 2;
    this.icon = this.add.sprite(iconX, iconY, "icon", 0);
    return { x: iconWidth, y: iconSrc.height };
  }

  public initLifeGage(life: Life, iconSrc: Vector2Like) {
    let hatSrc = this.game.textures.get("hat").getSourceImage(0);
    this.lifeImage = [];
    let lifeX = this.sys.canvas.width - iconSrc.x + hatSrc.width / 2;
    let lifeY = iconSrc.y + hatSrc.height / 2;

    for (let i = 0; i < life.maxLife; i++) {
      let hat = this.add.sprite(lifeX + hatSrc.width * i, lifeY, "hat", 0);
      if (life.life <= i) {
        hat.setAlpha(0);
      }
      this.lifeImage.push(hat);
    }
  }

  private registIconAction() {
    this.icon.setInteractive().on(
      "pointerdown",
      (parents => {
        return (pointer, localX, localY, event) => {
          let frameIndex = parseInt(parents.icon.frame.name) + 1;
          if (frameIndex >= parents.icon.frame.texture.frameTotal - 1) {
            frameIndex = 0;
          }
          parents.icon.setFrame(frameIndex);
          if(parents.main!=null){
            parents.main.togglePause();
          }
          //parents.icon.anims.currentFrame.index
        };
      })(this)
    );
  }

  public redrawLife(life : number, maxLife: number) {
    for (let i = 0; i < maxLife; i++) {
      if (life < i + 1) {
        this.lifeImage[i].setAlpha(0);
      }
    }
   
    let idx = maxLife - life;
    if (idx < 0) {
      idx = 0;
    }
    this.icon.setFrame(idx);
  
  }

  public createBgm() {
    this.bgm = this.sound.add("bgm");

    this.soundToggleKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ESC
    );

    this.bgmbtn = this.add.sprite(30, 30, "bgmbtn");
    this.bgmbtn.setInteractive().on(
      "pointerdown",
      (envs => {
        return (pointer, localX, localY, event) => {
          envs.toggleBgm();
        };
      })(this)
    );

    this.playBgm();
  }

  public rewindBgm(){
    if( this.bgm.isPlaying ){
      this.playBgm();
    }else if( this.bgm.isPaused ){
      this.playBgm();
    }
  }
  public pauseBgm(){
    this.bgm.pause();
  }

  public playBgm() {
    //this.scene.sound.play('bgm',  { loop : true } );
    this.bgm.play("", { loop: true });
    this.bgmbtn.setFrame(0);
  }

  createScore(): void {
    const top: number = 20;
    this.heightText = this.add.text(10, 60, "test version", {
      fontSize: "12px",
      fill: "#efefef"
    });

    this.scoreText = this.add.text(
      this.sys.canvas.width / 2 - 40,
      top,
      "x",
      {
        fontSize: "28px",
        fill: "#efefef"
      }
    );

    this.scoreMaxText = this.add.text(
      this.sys.canvas.width / 2 - 20,
      top,
      "x",
      {
        fontSize: "28px",
        fill: "#aaaaff"
      }
    );
  }

  updateScore() {
    this.score += 1;
    this.scoreText.setText("" + this.score);
    this.scoreMaxText.setText("/" + this.scoreMax);
  }

  public lietenSettingKey() {
    //console.log(this.soundToggleKey.isDown);
    if(this.soundToggleKey != null){
      if (Phaser.Input.Keyboard.JustDown(this.soundToggleKey)) {
        this.toggleBgm();
      }
    }
  }

  public toggleBgm() {
    if (this.bgm == null) {
      return;
    }
    if (this.bgm.isPlaying) {
      this.bgm.stop();
      this.bgmbtn.setFrame(1);
      //this.scene.sound.stopAll();
    } else {
      this.bgm.play();
      this.bgmbtn.setFrame(0);
    }
  }
}
