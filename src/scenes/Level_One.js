class Level_One extends Phaser.Scene
{
    constructor()
    {
        super("level_One_Scene");
    }

    preload()
    {
        this.load.image("player_sprite_placeholder", "./assets/player_sprite_placeholder.png");
        this.load.image("player_sprite_placeholder_alt", "./assets/player_sprite_placeholder_alt.png");
    }

    create()
    {
        this.add.text(20, 20, "Level 1");

        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //create the player
        this.player = new Player(this, game.config.width/2, game.config.height/2,"player_sprite_placeholder", "player_sprite_placeholder_alt");
    }

    update()
    {
        this.player.update();
    }
}