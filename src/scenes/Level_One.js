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

        this.load.audio("jump", "./assets/metal_jump.wav");

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

        //create the player
        this.player = new Player(this, game.config.width/2, game.config.height/2,"player_sprite_placeholder", "player_sprite_placeholder_alt");
        
        //creating map objects
        let map = this.add.tilemap("map");
        let background = map.addTilesetImage("Background" , "background"); // first arg- name in Tiled, second arg - key
        let tiles = map.addTilesetImage("Tileset","tiles");
        
        //adding layers from 'Tiled'
        let botLayer = map.createStaticLayer("background", [background],0,0).setDepth(-1);
        let topLayer = map.createStaticLayer("foreground", [tiles],0,0);

        //collisions
        this.physics.add.collider(this.player, topLayer);
        topLayer.setCollisionByProperty({collides:true});
 


        
       
    }

    update()
    {
        this.player.update();
        
    }

    
}