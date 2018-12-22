import { MainScene } from "../scenes/mainScene";

export class Stage {
  
  private scene: MainScene;
  
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

}
  