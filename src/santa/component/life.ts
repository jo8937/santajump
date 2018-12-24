import { Keys } from "./keys";

export class Life {
  
  //private scene: MainScene;
  public life : number = 3;
  public maxLife : number = 3;
  public lifeChanged : boolean = false;
  private registry : Phaser.Data.DataManager;
  constructor(registry : Phaser.Data.DataManager ){
    this.registry = registry;
    this.registry.set(Keys.LIFE.toString(), this.life);
    this.registry.set(Keys.MAX_LIFE.toString(), this.maxLife);
  }

  public reduceLife(){
    this.life--;
    this.lifeChanged = true;
    if(this.life < 0){
      this.life = 0;
    }
    this.registry.set(Keys.LIFE.toString(), this.life);
  }

  
  public noLife() : boolean{
    return this.life <= 0;
  }
}
  