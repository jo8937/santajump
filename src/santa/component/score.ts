import { MainScene } from "../scenes/mainScene";

export class Score {
  private score: number = -1;
  private scoreMax: number = 11;

  private scoreText: Phaser.GameObjects.Text;
  private scoreMaxText: Phaser.GameObjects.Text
  private heightText: Phaser.GameObjects.Text;

  // private debugText: Phaser.GameObjects.Text;

  private scene: MainScene;

  constructor(scene) {
    this.scene = scene;
    this.createScore();
  }

    createScore() : void{
      const top : number = 20;
      this.heightText = this.scene.add.text(10, 60, "test version", {
          fontSize: "12px",
          fill: "#efefef"
        }
      );
  
      this.scoreText = 
        this.scene.add.text(this.scene.sys.canvas.width / 2 - 40, top, "x", {
          fontSize: "28px",
          fill: "#efefef"
        });

      this.scoreMaxText = 
        this.scene.add.text(this.scene.sys.canvas.width / 2 - 20, top, "x", {
          fontSize: "28px",
          fill: "#aaaaff"
        }
      );
    }
    updateScore(){
      this.score += 1;
      this.scoreText.setText("" + this.score);
      this.scoreMaxText.setText("/" + this.scoreMax);
    }
    update(){
        
    }
}
  