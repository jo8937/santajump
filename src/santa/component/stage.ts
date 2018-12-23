import { MainScene } from "../scenes/mainScene";

import { Panel } from "../objects/panel";

export class Stage {
  
  private scene: MainScene;
  
  // Phaser.Physics.Arcade.StaticGroup;
  public panels: Phaser.GameObjects.Group;

  private soundToggleKey: Phaser.Input.Keyboard.Key;

  private stage : Object = [
      [
        ["a","b","c"],
        ["d","e","f"],
        ["h","i","j"],
      ]
  ];

  constructor(scene) {
    this.scene = scene;
    
  }
 
  public createStage(){
    this.panels = this.scene.add.group({ classType: Panel });
  }



  generatePanels(): void{
    
    let mintop = this.scene.sys.canvas.height / 4;
    // randomly pick a number between 1 and 5
    for(let i=0; i < 3; i++){
      let x = Math.floor(Math.random() * this.scene.sys.canvas.width);
      let y = mintop + Math.floor(Math.random() * (3 * this.scene.sys.canvas.height / 4));
  
      this.generateOnePanel(x,y, 0)  
    }
  }

  private generateOnePanel(x, y, frame): void {
    // create a pipe at the position x and y
    let panel = new Panel({
      scene: this.scene,
      x: x,
      y: y,
      frame: frame,
      key: "panel"
    });

    // add pipe to group
    this.panels.add(panel);
  }
  
}
  