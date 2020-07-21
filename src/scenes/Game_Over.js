class Game_Over extends Phaser.Scene
{
    constructor() {
        super("gameOverScene");
    }

    preload()
    {
        this.load.image("game_over_background", "./assets/background/game_over.png");
    }

    create()
    {
        //create background
        this.background = this.add.sprite(0, 0, "game_over_background");
        this.background.setOrigin(0,0)

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        this.add.text(20, 20, "Game Over");
        this.add.text(20, 70, "Press F to switch scenes.");
    }

    update()
    {
        if ( Phaser.Input.Keyboard.JustDown(keyF) )
        {
            this.scene.start("menuScene");
        }
    }
}