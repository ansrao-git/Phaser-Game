class Menu extends Phaser.Scene
{
    constructor() {
        super("menuScene");
    }

    preload()
    {
        //load audio here
    }

    create()
    {
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        this.add.text(20, 20, "Game Menu");
        this.add.text(20, 70, "Press F to switch scenes.");

        game.settings =
        {
            gameTimer: 60000,
        }
    }

    update()
    {
        if ( Phaser.Input.Keyboard.JustDown(keyF) )
        {
            this.scene.start("level_One_Scene");
        }
    }
}