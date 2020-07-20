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

        //spritesheets
        this.load.spritesheet('adventurer','./assets/adventurer-Sheet.png',{frameWidth: 50, frameHeight: 37}); // player texture
        this.load.spritesheet('enemy_idle','./assets/enemies/enemy_idle.png',{frameWidth: 48, frameHeight: 48});// enemy idle 
        this.load.spritesheet('enemy_walk','./assets/enemies/enemy_walk.png',{frameWidth: 57, frameHeight: 42});// enemy walk 
        this.load.spritesheet('samurai_idle','./assets/samurai/Idle.png',{frameWidth: 37, frameHeight: 52});
        this.load.spritesheet('samurai_run','./assets/samurai/Run.png',{frameWidth: 46, frameHeight: 48});
        this.load.spritesheet('samurai_jump','./assets/samurai/Jump.png',{frameWidth: 48, frameHeight: 53});
        this.load.spritesheet('samurai_attack','./assets/samurai/Attack1.png',{frameWidth: 120, frameHeight: 69});

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
            frames: this.anims.generateFrameNames('samurai_run',{start: 0, end: 7})
        });
        this.anims.create({
            key: 'samurai_idle',
            repeat: -1,
            frameRate: 8,
            frames: this.anims.generateFrameNames('samurai_idle',{start: 0, end: 7})
        });
        this.anims.create({
            key: 'samurai_jump',
            frameRate: 4,
            frames: this.anims.generateFrameNames('samurai_jump',{start: 0, end: 3})
        });
        this.anims.create({
            key: 'samurai_attack',
            frameRate: 20,
            frames: this.anims.generateFrameNames('samurai_attack',{start: 0, end: 5})
        });

        // enemy animations

        this.anims.create({
            key: 'enemy_idle',
            repeat: -1,
            frameRate: 8,
            frames: this.anims.generateFrameNames('enemy_idle',{start: 0, end: 3})
        })
        this.anims.create({
            key: 'enemy_walk',
            repeat: -1,
            frameRate: 8,
            frames: this.anims.generateFrameNames('enemy_walk',{start: 0, end: 5})
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
            this.player.play('idle');
        }
        */

        // this wasnt working so i added the animation to player.js        
        //can add more conditionals for other animations

        this.player.update();
        this.walking_enemy.update();

    }

    
}