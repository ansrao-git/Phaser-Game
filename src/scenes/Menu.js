class Menu extends Phaser.Scene
{
    constructor() {
        super("menuScene");
    }

    preload()
    {
        this.load.image("menu_background", "./assets/background/menu.png");
    }

    create()
    {
        //create background
        this.background = this.add.sprite(0, 0, "menu_background");
        this.background.setOrigin(0,0)

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        let menuTextConfig =
        {
            fontFamily: "Courier",
            fontSize: "14px",
            color: "#FFFFFF",
            align: "center",
            padding:
            {
                top: 5,
                bottom: 5
            },
        }

        this.add.text(game.config.width/2, game.config.height/2, "Press SPACE to start game.", menuTextConfig).setOrigin(0.5, 0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 40, "Press H to see controls in-game.", menuTextConfig).setOrigin(0.5, 0.5);

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
        if ( Phaser.Input.Keyboard.JustDown(keySPACE) )
        {
            this.scene.start("level_One_Scene");
        }
    }
}