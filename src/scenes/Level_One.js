class Level_One extends Phaser.Scene
{
    constructor()
    {
        super("level_One_Scene");
    }

    preload()
    {
        //spritesheets
        this.load.spritesheet('adventurer','./assets/adventurer-Sheet.png',{frameWidth: 50, frameHeight: 37}); // player texture 1
        this.load.spritesheet('samurai','./assets/samurai-Sheet.png',{frameWidth: 200, frameHeight: 200}); // player texture 2
        this.load.spritesheet('enemy','./assets/enemy-Sheet.png',{frameWidth: 48, frameHeight: 48}); // enemy texture

        //audio
        this.load.audio("jump", "./assets/sounds/swoosh_jump.wav");
        this.load.audio("sword_whoosh", "./assets/sounds/sword_whoosh.wav");
        this.load.audio("bomb_throw", "./assets/sounds/bomb_throw.wav");

        //tiles
        this.load.image("tiles", "./assets/tilesets/tiles/tileset.png");
        this.load.image("background", "./assets/tilesets/background/Background.png");

        this.load.tilemapTiledJSON("map", "./assets/maps/map.json");
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
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        //create the player
        this.player = new Player(this, game.config.width/2, game.config.height/2,"adventurer", "samurai_idle");
        
        //player animations (form 1)

        this.anims.create({
            key: 'run',
            repeat: -1,
            frameRate: 8,
            frames: this.anims.generateFrameNames('adventurer',{start: 8, end: 13})
        });
        this.anims.create({
            key: 'idle',
            repeat: -1,
            frameRate: 8,
            frames: this.anims.generateFrameNames('adventurer',{start: 0, end: 3})
        });
        this.anims.create({
            key: 'attack',
            frameRate: 15,
            frames: this.anims.generateFrameNames('adventurer',{start: 53, end: 57})
        });
        this.anims.create({
            key: 'jump',
            frameRate: 15,
            frames: this.anims.generateFrameNames('adventurer',{start: 16, end: 25})
        });

        //player animations (form 2)
        this.anims.create({
            key: 'samurai_run',
            repeat: -1,
            frameRate: 8,
            frames: this.anims.generateFrameNames('samurai',{start: 8, end: 15})
        });
        this.anims.create({
            key: 'samurai_idle',
            repeat: -1,
            frameRate: 8,
            frames: this.anims.generateFrameNames('samurai',{start: 0, end: 7})
        });
        this.anims.create({
            key: 'samurai_jump',
            frameRate: 4,
            frames: this.anims.generateFrameNames('samurai',{start: 44, end: 47})
        });
        this.anims.create({
            key: 'samurai_attack',
            frameRate: 20,
            frames: this.anims.generateFrameNames('samurai',{start: 16, end: 21})
        });

        // enemy animations

        this.anims.create({
            key: 'enemy_idle',
            repeat: -1,
            frameRate: 8,
            frames: this.anims.generateFrameNames('enemy',{start: 0, end: 3})
        })
        this.anims.create({
            key: 'enemy_walk',
            repeat: -1,
            frameRate: 8,
            frames: this.anims.generateFrameNames('enemy',{start: 4, end: 9})
        })

        //create enemies
        this.walking_enemy = new Walking_Enemy(this, 100, game.config.height-100, "enemy_idle");
        
        
        //creating map objects
        let map = this.add.tilemap("map");
        let background = map.addTilesetImage("Background" , "background"); // first arg- name in Tiled, second arg - key
        let tiles = map.addTilesetImage("Tileset","tiles");
        
        //adding layers from 'Tiled'
        let botLayer = map.createStaticLayer("background", [background],0,0).setDepth(-1);
        let topLayer = map.createStaticLayer("foreground", [tiles],0,0);

        //collisions
        this.physics.add.collider(this.player, topLayer);
        this.physics.add.collider(this.walking_enemy, topLayer);
        topLayer.setCollisionByProperty({collides:true});
 
        //set timer
        this.clock = this.time.delayedCall(game.settings.gameTimer, () =>
        {
            this.scene.start("gameOverScene");
        },null, this);
        
        //set up timer display
        let timerConfig =
        {
            fontFamily: "Courier",
            fontSize: "28px",
            backgroundColor: "#000000",
            color: "#FFFFFF",
            align: "center",
            padding:
            {
                top: 5,
                bottom: 5
            },
            fixedWidth: 50
        }

        //create timer and health displays
        this.timeDisplay = this.add.text(20, 60, game.settings.gameTimer / 1000, timerConfig);

        timerConfig.backgroundColor = "#4f0505";
        this.healthDisplay = this.add.text(20, 100, this.player.health, timerConfig);
    }

    update()
    {
        //update timer display
        this.elapsedTime = this.clock.getElapsedSeconds();
        this.timeDisplay.text = (game.settings.gameTimer / 1000) - Math.round(this.elapsedTime);

        //end game if player health reaches 0 or below
        if (this.player.health <= 0)
        {
            this.scene.start("gameOverScene");
        }

        if ( Phaser.Input.Keyboard.JustDown(keyF) )
        {
            this.scene.start("gameOverScene");
        }

        //checks if enemy is attacking
        if (this.walking_enemy.attackCounter == this.walking_enemy.ATTACK_FREQUENCY)
        {
            this.player.health -= 1;
            //update health display
            this.healthDisplay.text = this.player.health;
        }

        this.player.update();
        this.walking_enemy.update();
    }

    
}