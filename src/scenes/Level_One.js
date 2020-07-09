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

        this.load.audio("jump", "./assets/jump.wav");
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
        
        //adding floor
        var floor = this.add.rectangle(0, 850, 1200, 50, 0xFF0000); // red floor
        this.physics.add.existing(floor); // adding physics to rectangle
        
        floor.body.velocity.x = 0;       // so floor doesnt fall down
        floor.body.velocity.y = 0;
        floor.body.collideWorldBounds = true;
       
        this.physics.add.collider(floor, this.player); // so player doesnt fall through floor
       
    }

    update()
    {
        this.player.update();
    }

    
}