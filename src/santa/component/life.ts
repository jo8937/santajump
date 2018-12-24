import { MainScene } from "../scenes/mainScene";

export class Life {
  
  private scene: MainScene;
  private life : number = 3;
  private maxLife : number = 3;
  private lifeChanged : boolean = false;
  private lifeImage : Phaser.GameObjects.Sprite[];

  private icon : Phaser.GameObjects.Sprite;
  
  constructor(scene) {
    this.scene = scene;
  }

  createStatus(){
    let iconSrc = this.scene.game.textures.get("icon").getSourceImage(0);
    let hatSrc = this.scene.game.textures.get("hat").getSourceImage(0);
    let iconWidth = iconSrc.height;
    let iconX  = this.scene.sys.canvas.width - iconWidth / 2;
    let iconY = iconSrc.height / 2;
    this.icon = this.scene.add.sprite(iconX, iconY, "icon",0);

    this.lifeImage = [];
    let lifeX = this.scene.sys.canvas.width - iconWidth + hatSrc.width / 2;
    let lifeY = iconSrc.height + hatSrc.height / 2;
    for(let i=0; i < this.maxLife; i++){
        let hat = this.scene.add.sprite(lifeX + hatSrc.width * i, lifeY, "hat",0)
        if(this.life <= i){
          hat.setAlpha(0);
        }

        this.lifeImage.push(hat );
    }
    this.registIconAction();
  }


  public update(){
    this.checkAndDrawLife();
  }
  
  private registIconAction(){
    this.icon.setInteractive().on("pointerdown",((parents) => {
      return (pointer, localX, localY, event) => {
        let frameIndex = (parseInt(parents.icon.frame.name)) + 1;
        if ( frameIndex >= parents.icon.frame.texture.frameTotal - 1){
          frameIndex = 0;
        }
        parents.icon.setFrame(frameIndex);
        parents.scene.togglePause();
        //parents.icon.anims.currentFrame.index
      }
    })(this));
  }

  public noLife() : boolean{
    return this.life <= 0;
  }

  public checkAndDrawLife(){
    if(this.lifeChanged){
      for(let i=0; i < this.maxLife; i++){
        if(this.life < i+1){
          this.lifeImage[i].setAlpha(0);
        }
      }
      this.lifeChanged = false;
      let idx = this.maxLife - this.life;
      if(idx < 0){
        idx = 0;
      }
      this.icon.setFrame(idx);
    }
  }

  public reduceLife(){
    this.icon.setFrame(4);
    this.life--;
    this.lifeChanged = true;
    if(this.life < 0){
      this.life = 0;
    }
  }

}
  