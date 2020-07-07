class Level_One extends Phaser.Scene {
    constructor() {
        super("level_One_Scene");
    }

    create() {
        this.add.text(20, 20, "Level 1");
      }
}