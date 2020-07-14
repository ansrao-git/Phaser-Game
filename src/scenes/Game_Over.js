class Game_Over extends Phaser.Scene
{
    constructor() {
        super("gameOverScene");
    }

    preload()
    {
        //load audio here
    }

    create()
    {
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