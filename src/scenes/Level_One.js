class Level_One extends Phaser.Scene
{
    constructor()
    {
        super("level_One_Scene");
    }

    preload()
    {
        //sprites
        this.load.image("player_sprite_placeholder", "./assets/player/player_sprite_placeholder.png");
        this.load.image("player_sprite_placeholder_alt", "./assets/player/player_sprite_placeholder_alt.png");
        this.load.image("enemy_sprite_placeholder", "./assets/enemies/enemy_sprite_placeholder.png");
        this.load.image("enemy_sprite_placeholder_alt", "./assets/enemies/enemy_sprite_placeholder_alt.png");

        //spritesheet
        
        this.load.spritesheet('adventurer','./assets/adventurer-Sheet.png',{frameWidth: 50, frameHeight: 37});
      //  this.load.spritesheet('idle','./assets/samurai/Idle.png',{frameWidth: 200, frameHeight: 200});
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
        this.player = new Player(this, game.config.width/2, game.config.height/2,"adventurer", "player_sprite_placeholder_alt");

        //animations

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
        

        //create enemies
        this.walking_enemy = new Walking_Enemy(this, 100, game.config.height-100, "enemy_sprite_placeholder");
        
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
 


        
       
    }

    update()
    {
        if ( Phaser.Input.Keyboard.JustDown(keyF) )
        {
            this.scene.start("gameOverScene");
        }

        /* 
        if(this.player.body.velocity!=0){
            this.player.play('run');
        }
        else if(this.player.body.velocity=0){
            this.plaer.play('idle');
        }
        */

        // this wasnt working so i added the animation to player.js        
        //can add more conditionals for other animations

        this.player.update();
        this.walking_enemy.update();

    }

    
}