class Pause extends Phaser.Scene
{
    constructor() {
        super("pause_Scene");
    }

    preload()
    {
        this.load.image("pause_background", "./assets/background/pause.png");
    }

    create()
    {
        //create background
        this.background = this.add.sprite(0, 0, "pause_background");
        this.background.setOrigin(0,0);

        console.log("paused");

        //resume game
        this.input.keyboard.on("keydown_H", function (event)
        {
            game.scene.stop("pause_Scene");
            game.scene.run("level_One_Scene");
            
            console.log("here");
        });
    }

    update()
    {
        //nothing here
    }
}