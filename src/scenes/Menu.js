class Menu extends Phaser.Scene
{
    constructor() {
        super("menuScene");
    }

    preload()
    {
        //load audio
    }

    create()
    {
        this.add.text(20, 20, "Game Menu");
    }

    update()
    {
        this.scene.start("level_One_Scene");
    }
}