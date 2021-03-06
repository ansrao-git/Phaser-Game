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
        this.health = 10;

        this.P1_JUMP_VELOCITY = -600;
        this.P2_JUMP_VELOCITY = -450;
        this.MOVE_VELOCITY = 250;

        this.P1_BODY_X = 20;
        this.P1_BODY_Y = 30;
        this.P1_BODY_X_OFFSET = 15;
        this.P1_BODY_Y_OFFSET = 6;

        this.P2_BODY_X = 28;
        this.P2_BODY_Y = 52;
        this.P2_BODY_X_OFFSET = 85;
        this.P2_BODY_Y_OFFSET = 70;

        this.ATTACK_RANGE_X = 120; // samurai horizontal attack range
        this.ATTACK_RANGE_Y = 60; // samurai vertical attack range

        //customized physics body bounding box
        this.body.setSize(this.P1_BODY_X, this.P1_BODY_Y, true);
        this.body.setOffset(this.P1_BODY_X_OFFSET, this.P1_BODY_Y_OFFSET);

        this.floorLevel = 900;


        //check for mouse down or x key, this is where attacks go
        this.local_scene_variable.input.on("pointerdown", (pointer, currentlyOver) => {
            this.scene.player.attack();
        });
        scene.input.keyboard.on("keydown_X", function (event) {
            this.scene.player.attack();
        });


        //checks for key up and down events for animations
        scene.input.keyboard.on("keydown_A", function (event) {
            this.scene.player.goLeftAnim();
        });
        scene.input.keyboard.on("keydown_LEFT", function (event) {
            this.scene.player.goLeftAnim();
        });
        scene.input.keyboard.on("keydown_D", function (event) {
            this.scene.player.goRightAnim();
        });
        scene.input.keyboard.on("keydown_RIGHT", function (event) {
            this.scene.player.goRightAnim();
        });
        scene.input.keyboard.on("keyup_A", function (event) {
            this.scene.player.stopAnim();
        });
        scene.input.keyboard.on("keyup_LEFT", function (event) {
            this.scene.player.stopAnim();
        });
        scene.input.keyboard.on("keyup_D", function (event) {
            this.scene.player.stopAnim();
        });
        scene.input.keyboard.on("keyup_RIGHT", function (event) {
            this.scene.player.stopAnim();
        });

        //switch player back to idle animation after playing an animation
        this.on("animationcomplete", () => //callback after animation completes
        {
            this.scene.player.stopAnim();
        });

    }

    update() {
        
        //switches between forms when space is pressed
        if (Phaser.Input.Keyboard.JustDown(keySPACE) || Phaser.Input.Keyboard.JustDown(keyS) || Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            this.switchForm();
        }

        //check for jump key and jump
        if (Phaser.Input.Keyboard.JustDown(keyUP) || Phaser.Input.Keyboard.JustDown(keyW)) {
            this.jump();
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

    attack() {
        if (!this.scene.player.inAltForm) {
            console.log("this form cannot attack");
        }
        else {
            console.log("attack");
            this.scene.player.play('samurai_attack'); //animation
            this.local_scene_variable.sound.play('sword_whoosh');

            this.local_scene_variable.walking_enemies.forEach(function (item) {
                if (!item.scene.player.flipX) // if facing right
                {
                    if (item.scene.player.x < item.x && item.scene.player.x > item.x - item.scene.player.ATTACK_RANGE_X) { // if enemy is in X range
                        if (item.y > item.scene.player.y - item.scene.player.ATTACK_RANGE_Y && item.y < item.scene.player.y + item.scene.player.ATTACK_RANGE_Y) { // if enemy is in Y range
                            console.log('enemy hit-right');
                            item.die();
                            // destroy enemy
                            // enemy death animation goes here
                        }

                    }
                    else {
                        console.log('miss right');
                    }
                }
                else // if facing left
                {
                    if (item.scene.player.x > item.x && item.scene.player.x < item.x + item.scene.player.ATTACK_RANGE_X) { // if enemy is in X attack range
                        if (item.y > item.scene.player.y - item.scene.player.ATTACK_RANGE_Y && item.y < item.scene.player.y + item.scene.player.ATTACK_RANGE_Y) { // if enemy is in Y range
                            console.log('enemy hit-left')
                            item.die();
                            // destroy enemy
                            // enemy death animation goes here
                        }
                    }
                    else {
                        console.log('miss left');
                    }

                }
            });

        }
    }

    //sets animation for moving left
    goLeftAnim() {
        if (!this.scene.player.inAltForm) {
            this.scene.player.play('run'); // animation here
        }
        else {
            this.scene.player.play('samurai_run'); // animation here
        }

        this.scene.player.flipX = true;
    }

    //sets animation for moving right
    goRightAnim() {
        if (!this.scene.player.inAltForm) {
            this.scene.player.play('run'); // animation here
        }
        else {
            this.scene.player.play('samurai_run'); // animation here
        }

        this.scene.player.flipX = false;
    }

    //switches player back to idle animation
    stopAnim() {
        if (!this.scene.player.inAltForm) {
            this.scene.player.play('idle'); // animation here
        }
        else {
            this.scene.player.play('samurai_idle'); // animation here
        }
    }

    //switches player between the 2 forms
    switchForm() {
        if (!this.inAltForm) {
            this.inAltForm = true;
            this.play("samurai_idle");

            //customized physics body bounding box
            this.body.setSize(this.P2_BODY_X, this.P2_BODY_Y, true);
            this.body.setOffset(this.P2_BODY_X_OFFSET, this.P2_BODY_Y_OFFSET);
        }
        else {
            this.inAltForm = false;

            this.play("idle");

            //customized physics body bounding box
            this.body.setSize(this.P1_BODY_X, this.P1_BODY_Y, true);
            this.body.setOffset(this.P1_BODY_X_OFFSET, this.P1_BODY_Y_OFFSET);
        }
    }

    //makes the player do a jump
    jump() {
        if (this.body.blocked.down || this.body.touching.down) {
            this.local_scene_variable.sound.play("jump"); //play jump sound
            if (!this.inAltForm) {
                this.body.setVelocityY(this.P1_JUMP_VELOCITY);
                this.scene.player.play('jump'); //animation 
            }
            else {
                this.body.setVelocityY(this.P2_JUMP_VELOCITY);
                this.scene.player.play('samurai_jump'); //animation 
            }
        }
        else if ((this.body.blocked.left || this.body.touching.left || this.body.blocked.right || this.body.touching.right) && !this.scene.player.inAltForm) {
            this.local_scene_variable.sound.play("climb");
            this.body.setVelocityY(this.P1_JUMP_VELOCITY / 2);
            this.scene.player.play('jump'); //animation 
        }
    }
}