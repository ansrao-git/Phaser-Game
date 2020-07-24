class Game_Over extends Phaser.Scene
{
    constructor() {
        super("gameOverScene");
    }

    init(data)
    {
        this.score = data.score;
    }

    preload()
    {
        this.load.image("game_over_background", "./assets/background/game_over.png");
        this.load.audio("outro", "./assets/sounds/outro.wav");
    }

    create()
    {
        //play outro music
        this.outro = this.sound.add("outro");
        this.outro.setVolume(0.5);
        this.outro.play();

        //create background
        this.background = this.add.sprite(0, 0, "game_over_background");
        this.background.setOrigin(0,0)

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.add.text(game.config.width/2, game.config.height - 100, "Press SPACE to restart.").setOrigin(0.5, 0.5);
        this.add.text(game.config.width/2 + 70, game.config.height/2 - 75, this.score);
        console.log(this.score);
    }

    update()
    {
        if ( Phaser.Input.Keyboard.JustDown(keyF) || Phaser.Input.Keyboard.JustDown(keySPACE) )
        {
            this.scene.start("menuScene");
        }
    }
}