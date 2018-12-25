import { MainScene } from "../scenes/mainScene";

import { Panel } from "../objects/panel";

import { Keys } from "./keys";
import { Hukuro } from "../objects/hukuro";
import { Santa } from "../objects/santa";
import { Enermy } from "../objects/enermy";

enum StageObject{
  BLANK = 0,
  PANEL = 1,
  ICE = 2,
  SANTA = 8,
  HUKURO = 9,
}

export class Stage {
  
  private scene: MainScene;
  
  // Phaser.Physics.Arcade.StaticGroup;
  // Chara
  public santa: Santa;

  public panels: Phaser.GameObjects.Group;

  public objects: Phaser.GameObjects.Group;

  public enermies: Phaser.GameObjects.Group;

  private soundToggleKey: Phaser.Input.Keyboard.Key;

  // private floorHeight : number = 200;
  // private floorWidth : number = 400;
  private floorTileWidth : number = 25;
  private floorTileHeight : number = 50;
  private totalPanelFloor : number = 0;

  private santaStart : Vector2Like;

  public getFloorHeight(){
    return this.floorTileHeight;
  }

  public getFloorTotalHeight(){
    return this.floorTileHeight * this.stage.length;
  }

  public totalHeight : number = 0;

  private stage : StageObject[][] = [
        [0,0,0,0,  0,9,0,0,  0,0,0,0, 0,0,0,0],
        [0,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],
        [0,0,0,0,  1,0,0,0,  0,0,0,0, 0,0,0,0],

        [0,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],
        [0,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],
        [0,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],

        [1,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],
        [0,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],
        [0,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],

        [0,0,0,0,  0,0,2,0,  0,0,0,0, 0,1,0,0],
        [0,0,0,0,  1,0,0,0,  0,0,0,0, 0,0,0,0],
        [0,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],

        [0,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],
        [0,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],
        [0,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],


        [0,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],
        [0,0,2,0,  0,0,0,0,  0,0,0,0, 0,0,1,0],
        [0,0,1,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],

        [0,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],
        [0,0,0,2,  0,0,0,0,  0,0,0,0, 0,0,0,0],
        [1,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],

        [0,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],
        [0,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,1,0],
        [0,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],

        [0,0,0,0,  1,0,0,0,  0,0,0,0, 0,0,0,0],
        [0,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],
        [0,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],

        [0,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],
        [0,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],
        [0,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],

        [0,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],
        [0,0,0,0,  1,0,0,0,  1,0,0,0, 0,0,0,0],
        [0,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],

        [0,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],
        [0,0,0,0,  0,0,0,2,  0,0,0,2, 0,0,0,0],
        [0,0,0,0,  1,0,0,0,  1,0,0,0, 1,0,0,0],

        [0,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],
        [0,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],
        [2,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],
              

        [0,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],
        [1,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],
        [0,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],
              

        [0,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],
        [0,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],
        [0,0,0,0,  0,0,1,0,  0,0,0,0, 0,0,0,0],

        [0,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],
        [0,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],
        
        [0,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],
        [0,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],

        [0,0,0,0,  0,0,0,0,  0,1,0,0, 0,0,0,0],
        [0,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],

        [0,0,0,0,  0,1,0,0,  0,0,0,0, 0,0,0,0],
        [0,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],

        [2,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],
        [0,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],

        [1,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],
        [0,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],

        [0,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],
        [0,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],

        [0,0,0,0,  0,2,0,0,  0,0,0,0, 0,0,0,0],
        [0,0,0,0,  1,0,0,0,  0,0,0,0, 0,0,1,0],

        [0,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],
        [0,8,0,0,  0,0,0,0,  0,1,0,0, 0,0,0,0],

        [0,0,0,0,  0,0,0,0,  0,0,0,0, 0,0,0,0],
        [1,0,0,0,  1,0,0,0,  0,0,0,0, 0,0,0,0],
  ];

  constructor(scene) {
    this.scene = scene;
    this.santa = null;
  }
 
  public getTotalFloor(){
    return this.totalPanelFloor;
  }

  public createStage(){
    this.enermies = this.scene.add.group({ classType: Enermy });
    this.objects = this.scene.add.group({ classType: Phaser.GameObjects.Sprite });
    this.panels = this.scene.add.group({ classType: Panel });

    // start point
    let panelHeight = 20;
    //let firstPanel = this.generateOnePanel(0,this.scene.sys.canvas.height, 0);
    //firstPanel.setPosition(0, firstPanel.y - firstPanel.height)
    
    this.scene.game.registry.set(Keys.PANEL_HEIGHT.toString(),panelHeight);

    let mintop = this.scene.sys.canvas.height / 4;
    // randomly pick a number between 1 and 5
    // for(let i=0; i < 11; i++){
    //   let x = Math.floor(Math.random() * this.scene.sys.canvas.width);
    //   let y = mintop + Math.floor(Math.random() * (3 * this.scene.sys.canvas.height / 4));
  
    //   this.generateOnePanel(x,y, 0)  
    // }
    this.totalHeight = this.stage.length * this.floorTileHeight + this.scene.sys.canvas.height / 2;
    let panelYClount = 1
    let startY = this.scene.sys.canvas.height - panelHeight;
    for(let y = 0; y < this.stage.length; y++){
      let floor = y+1;
      let line = this.stage[this.stage.length - y - 1];
      let panelY = startY - (this.floorTileHeight * y);
      let hasPanel = false;
      for(let x = 0; x < line.length; x++){
        let panelX = this.floorTileWidth * x;
        let objectNumber = line[x];
        if( objectNumber == StageObject.PANEL){
          this.placePanel(panelX, panelY, 0, panelYClount);
          hasPanel = true;
        }else if( objectNumber == StageObject.SANTA){
          this.placeSanta(panelX, panelY);
        }else if( objectNumber == StageObject.ICE){
          this.placeIce(panelX, panelY);          
        }else if( objectNumber == StageObject.HUKURO){
          this.placeHukuro(panelX, panelY);
        }
      }
      if(hasPanel){
        panelYClount++;
      }
    }
    this.totalPanelFloor = panelYClount - 1;
  }

  
  public placeIce(x :number, y:number){
    let enermy = new Enermy(this.scene,x,y,"icespear");
    this.enermies.add(enermy);
  }

  public placeHukuro(x :number, y:number){
    let hukuro = new Hukuro(this.scene,x,y);
    this.objects.add(hukuro);
  }

  public placeSanta(x :number, y:number){
    this.santa = new Santa(this.scene,x,y,"santa");
    this.santaStart = {x : x, y: y};
  }

  public placeStartLine(){
    let panelHeight = <number> this.scene.game.registry.get(Keys.PANEL_HEIGHT.toString());
    //this.santa.setPosition(this.santa.width, this.scene.sys.canvas.height - this.santa.height - (panelHeight * 2));
    this.santa.setPosition(this.santaStart.x, this.santaStart.y);
  }
  
  private placePanel(x, y, frame, floor): Panel {
    // create a pipe at the position x and y
    let panel = new Panel(this.scene, x, y,"panel", frame);
    panel.floor = floor;
    // add pipe to group
    this.panels.add(panel);
    return panel;
  }


  
}
  