class Level_One extends Phaser.Scene {
    constructor() {
        super("level_One_Scene");
    }

    preload() {
        //spritesheets
        this.load.spritesheet('adventurer', './assets/player/adventurer-Sheet.png', { frameWidth: 50, frameHeight: 37 }); // player texture 1
        this.load.spritesheet('adventurer-attack', './assets/player/adventurer-attack-Sheet.png', { frameWidth: 50, frameHeight: 37 }); // player texture 2 attack
        this.load.spritesheet('samurai', './assets/player/samurai-Sheet.png', { frameWidth: 200, frameHeight: 200 }); // player texture 2
        this.load.spritesheet('enemy', './assets/player/enemy-Sheet.png', { frameWidth: 48, frameHeight: 48 }); // enemy texture

        //audio
        this.load.audio("music", "./assets/sounds/music.wav");
        this.load.audio("jump", "./assets/sounds/jump.wav");
        this.load.audio("sword_whoosh", "./assets/sounds/sword_whoosh.wav");
        this.load.audio("climb", "./assets/sounds/climb.wav");
        this.load.audio("player_hurt", "./assets/sounds/player_hurt.wav");

        //tiles
        this.load.image("tiles", "./assets/background/tileset.png");
        this.load.image("background", "./assets/background/Background.png");

        this.load.tilemapTiledJSON("map", "./assets/maps/map.json");

        //health
        this.load.image("heart_1", "./assets/health/heart_1.png");
        this.load.image("heart_2", "./assets/health/heart_2.png");
        this.load.image("heart_3", "./assets/health/heart_3.png");
        this.load.image("heart_4", "./assets/health/heart_4.png");
        this.load.image("heart_5", "./assets/health/heart_5.png");
        this.load.image("heart_6", "./assets/health/heart_6.png");
    }

    create() {
        //create background
        this.background = this.add.sprite(0, 0, "background");
        this.background.setOrigin(0, 0)
        this.background.setScrollFactor(0.5);

        this.add.text(20, 20, "Level 1");

        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        //set up and play background noise/music
        this.music = this.sound.add("music", { loop: true });
        this.music.setVolume(0.5);
        this.music.play();

        //create the player
        this.player = new Player(this, game.config.width / 2, game.config.height / 2 - 40, "adventurer");

        //player animations (form 1)
        this.anims.create({
            key: 'run',
            repeat: -1,
            frameRate: 8,
            frames: this.anims.generateFrameNames('adventurer', { start: 8, end: 13 })
        });
        this.anims.create({
            key: 'idle',
            repeat: -1,
            frameRate: 8,
            frames: this.anims.generateFrameNames('adventurer', { start: 0, end: 3 })
        });
        this.anims.create({
            key: 'attack',
            frameRate: 20,
            frames: this.anims.generateFrameNames('adventurer-attack', { start: 0, end: 6 })
        });
        this.anims.create({
            key: 'jump',
            frameRate: 15,
            frames: this.anims.generateFrameNames('adventurer', { start: 16, end: 25 })
        });
        this.anims.create({
            key: 'hit',
            frameRate: 15,
            frames: this.anims.generateFrameNames('adventurer', { start: 72, end: 74 })
        });

        //player animations (form 2)
        this.anims.create({
            key: 'samurai_run',
            repeat: -1,
            frameRate: 8,
            frames: this.anims.generateFrameNames('samurai', { start: 8, end: 15 })
        });
        this.anims.create({
            key: 'samurai_idle',
            repeat: -1,
            frameRate: 8,
            frames: this.anims.generateFrameNames('samurai', { start: 0, end: 7 })
        });
        this.anims.create({
            key: 'samurai_jump',
            frameRate: 4,
            frames: this.anims.generateFrameNames('samurai', { start: 44, end: 47 })
        });
        this.anims.create({
            key: 'samurai_attack',
            frameRate: 20,
            frames: this.anims.generateFrameNames('samurai', { start: 16, end: 21 })
        });
        this.anims.create({
            key: 'samurai_hit',
            frameRate: 20,
            frames: this.anims.generateFrameNames('samurai', { start: 40, end: 42 })
        });

        // enemy animations
        this.anims.create({
            key: 'enemy_idle',
            repeat: -1,
            frameRate: 8,
            frames: this.anims.generateFrameNames('enemy', { start: 0, end: 3 })
        });
        this.anims.create({
            key: 'enemy_walk',
            repeat: -1,
            frameRate: 8,
            frames: this.anims.generateFrameNames('enemy', { start: 4, end: 9 })
        });
        this.anims.create({
            key: 'enemy_death',
            frameRate: 8,
            frames: this.anims.generateFrameNames('enemy', { start: 10, end: 11 })
        });

        //create enemies
        this.walking_enemies = new Array();
        for (let i = 0; i < 4; i++) {
            this.walking_enemies.push(new Walking_Enemy(this, 100, game.config.height - 100, "enemy_idle"));
        }

        //creating map objects
        let map = this.add.tilemap("map");
        let tiles = map.addTilesetImage("Tileset", "tiles");

        //adding layers from 'Tiled'
        let topLayer = map.createStaticLayer("foreground", [tiles], 0, 0);

        //create score variable
        this.score = 0;

        //collisions
        this.physics.add.collider(this.player, topLayer);

        this.walking_enemies.forEach(function (item) {
            item.scene.physics.add.collider(item, topLayer);
        });

        topLayer.setCollisionByProperty({ collides: true });

        //check if enemy overlaps with player for attacking purposes, I can't make this work within Walking_Enemy.js, unfortunately
        this.walking_enemies.forEach(function (item) {
            item.scene.physics.add.overlap(item, item.scene.player, () => {
                if (item.attackCounter == item.ATTACK_FREQUENCY + 1) {
                    item.attackCounter = 0;

                    item.scene.player.health -= 1;
                    item.scene.sound.play("player_hurt");

                    //update health display
                    item.scene.updateHealth();

                    if (!item.scene.player.inAltForm) {
                        item.scene.player.play('hit');
                    }
                    else {
                        item.scene.player.play('samurai_hit');
                    }
                }
                else {
                    item.attackCounter += 1;
                }

            }, null, this);
        });


        //set up camera
        this.physics.world.setBounds(0, 0, 1280, 800);
        this.cameras.main.setBounds(0, 0, 1280, 800);
        this.cameras.main.setRoundPixels(true);
        this.cameras.main.startFollow(this.player);

        //set timer
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.music.stop();
            this.scene.start("gameOverScene", { score: this.score });
        }, null, this);

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

        //create timer, score, and health displays
        this.timeDisplay = this.add.text(20, 20, game.settings.gameTimer / 1000, timerConfig);
        this.timeDisplay.setScrollFactor(0);

        timerConfig.backgroundColor = "#111f45";
        this.scoreDisplay = this.add.text(20, 60, this.score, timerConfig);
        this.scoreDisplay.setScrollFactor(0)

        timerConfig.backgroundColor = "#4f0505";
        this.healthDisplay = this.add.sprite(20, 100, "heart_1");
        this.healthDisplay.depth = 0;
        this.healthDisplay.setOrigin(0, 0);
        this.healthDisplay.setScale(3);
        this.healthDisplay.setScrollFactor(0);

        //set up pause menu
        this.input.keyboard.on("keydown_H", function (event) {
            game.scene.pause("level_One_Scene");
            game.scene.run("pause_Scene");
        });
    }

    update() {
        //update timer display
        this.elapsedTime = this.clock.getElapsedSeconds();
        this.timeDisplay.text = (game.settings.gameTimer / 1000) - Math.round(this.elapsedTime);

        //end game if player health reaches 0 or below
        if (this.player.health <= 0) {
            this.music.stop();
            this.scene.start("gameOverScene", { score: this.score });
        }

        if (Phaser.Input.Keyboard.JustDown(keyF)) {
            this.music.stop();
            this.scene.start("gameOverScene", { score: this.score });
        }

        this.player.update();
        this.walking_enemies.forEach(function (item) {
            item.update();
        });
    }

    updateHealth() {
        if (this.player.health >= 16) {
            this.healthDisplay.setTexture("heart_1");
        }
        else if (this.player.health >= 12) {
            this.healthDisplay.setTexture("heart_2");
        }
        else if (this.player.health >= 8) {
            this.healthDisplay.setTexture("heart_3");
        }
        else if (this.player.health >= 4) {
            this.healthDisplay.setTexture("heart_4");
        }
        else if (this.player.health > 0) {
            this.healthDisplay.setTexture("heart_5");
        }
        else {
            this.healthDisplay.setTexture("heart_6");
        }
    }
}