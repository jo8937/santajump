import { MainScene } from "../scenes/mainScene";

export class Life {
  
  private scene: MainScene;
  private life : number = 3;
  private maxLife : number = 3;

  private lifeImage : Phaser.GameObjects.Sprite[];

  constructor(scene) {
    this.scene = scene;
  }

  createStatus(){
    let iconSrc = this.scene.game.textures.get("icon").getSourceImage(0);
    let hatSrc = this.scene.game.textures.get("hat").getSourceImage(0);
    let iconWidth = iconSrc.height;
    let iconX  = this.scene.sys.canvas.width - iconWidth / 2;
    let iconY = iconSrc.height / 2;
    this.scene.add.sprite(iconX, iconY, "icon",1);

    this.lifeImage = [];
    let lifeX = this.scene.sys.canvas.width - iconWidth + hatSrc.width / 2;
    let lifeY = iconSrc.height + hatSrc.height / 2;
    for(let i=0; i < this.maxLife; i++){
        this.lifeImage.push(
          this.scene.add.sprite(lifeX + hatSrc.width * i, lifeY, "hat",0)
        );
    }
        
  }

  public isDead() : boolean{
    return this.life <= 0;
  }

  public checkLife(){

  }

}
  