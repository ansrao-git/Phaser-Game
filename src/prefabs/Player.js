//player prefab
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        this.local_scene_variable = scene; //makes the scene shareable between methods

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true); //makes the player collide with the sides of the viewport

        //enabling collision and overlap events for player character, but I may have just accidentallymade new variables instead
        this.onCollide = true;
        this.onOverlap = true;

        //variable to track which form the player is in; alt is short for alternate
        this.inAltForm = false;

        this.JUMP_VELOCITY = -600;
        this.MOVE_VELOCITY = 250;

        this.floorLevel = 900;


        //check for mouse down, this is where attacks go
        this.local_scene_variable.input.on("pointerdown", (pointer, currentlyOver) => {
            if (!this.scene.player.inAltForm) {
                console.log("attack 1");
                this.scene.player.play('attack'); //animation

                this.local_scene_variable.sound.play('bomb_throw');
            }
            else {
                console.log("attack 2");
                this.scene.player.play('samurai_attack'); //animation

                this.local_scene_variable.sound.play('sword_whoosh');
            }
        });

        //checks for key up and down events for animations
        scene.input.keyboard.on("keydown_A", function (event) {
            if (!this.scene.player.inAltForm) {
                this.scene.player.play('run'); // animation here
            }
            else {
                this.scene.player.play('samurai_run'); // animation here
            }

            this.scene.player.flipX = true;
        });
        scene.input.keyboard.on("keydown_LEFT", function (event) {
            if (!this.scene.player.inAltForm) {
                this.scene.player.play('run'); // animation here
            }
            else {
                this.scene.player.play('samurai_run'); // animation here
            }

            this.scene.player.flipX = true;
        });
        scene.input.keyboard.on("keydown_D", function (event) {
            if (!this.scene.player.inAltForm) {
                this.scene.player.play('run'); // animation here
            }
            else {
                this.scene.player.play('samurai_run'); // animation here
            }

            this.scene.player.flipX = false;
        });
        scene.input.keyboard.on("keydown_RIGHT", function (event) {
            if (!this.scene.player.inAltForm) {
                this.scene.player.play('run'); // animation here
            }
            else {
                this.scene.player.play('samurai_run'); // animation here
            }

            this.scene.player.flipX = false;
        });
        scene.input.keyboard.on("keyup_A", function (event) {
            if (!this.scene.player.inAltForm) {
                this.scene.player.play('idle'); // animation here
            }
            else {
                this.scene.player.play('samurai_idle'); // animation here
            }
        });
        scene.input.keyboard.on("keyup_LEFT", function (event) {
            if (!this.scene.player.inAltForm) {
                this.scene.player.play('idle'); // animation here
            }
            else {
                this.scene.player.play('samurai_idle'); // animation here
            }
        });
        scene.input.keyboard.on("keyup_D", function (event) {
            if (!this.scene.player.inAltForm) {
                this.scene.player.play('idle'); // animation here
            }
            else {
                this.scene.player.play('samurai_idle'); // animation here
            }
        });
        scene.input.keyboard.on("keyup_RIGHT", function (event) {
            if (!this.scene.player.inAltForm) {
                this.scene.player.play('idle'); // animation here
            }
            else {
                this.scene.player.play('samurai_idle'); // animation here
            }
        });

    }

    update() {
        //switches between forms when space is pressed
        this.body.setSize(this.scene.player.width, this.scene.player.height, true);
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            if (!this.inAltForm) {
                this.inAltForm = true;

                this.play("samurai_idle");

                console.log("in alt form!");
            }
            else {
                this.inAltForm = false;
                this.play("idle");

                console.log("in not alt form!");
            }
        }

        //check for jump key and jump
        if (Phaser.Input.Keyboard.JustDown(keyUP) || Phaser.Input.Keyboard.JustDown(keyW)) {
            if (this.body.blocked.down || this.body.touching.down)
            {
                this.body.setVelocityY(this.JUMP_VELOCITY);
                this.local_scene_variable.sound.play("jump"); //play jump sound
                if (!this.inAltForm)
                {
                    this.scene.player.play('jump'); //animation 
                }
                else
                {
                    this.scene.player.play('samurai_jump'); //animation 
                }
            }
        }

        //left and right movement
        if (keyLEFT.isDown || keyA.isDown) {
            this.body.setVelocityX(-1 * this.MOVE_VELOCITY);
        }
        else if (keyRIGHT.isDown || keyD.isDown) {
            this.body.setVelocityX(this.MOVE_VELOCITY);
        }
        else {
            this.body.setVelocityX(0);  //this will set velocity to 0 EVERY FRAME the player isn't moving left or right, not ideal
        }


    }
}