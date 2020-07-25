//hey the enemy squashes the player into the ground, help
class Walking_Enemy extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, texture)
    {
        super(scene, x, y, texture);

        this.local_scene_variable = scene; //makes the scene shareable between methods

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true); //makes the player collide with the sides of the viewport

        //enabling collision and overlap events for player character, but I may have just accidentallymade new variables instead
        this.onCollide = true;
        this.onOverlap = true;

        //constants
        this.JUMP_VELOCITY = -600;
        this.MOVE_VELOCITY = 80 + Math.floor(Math.random() * 81);  //somewhat randomized enemy speed
        this.ATTACK_RANGE = 20;
        //defines physics bounding box values
        this.BODY_X = 36;
        this.BODY_Y = 30;
        this.BODY_X_OFFSET = 7;
        this.BODY_Y_OFFSET = 15;

        //customized physics body bounding box
        this.body.setSize(this.BODY_X, this.BODY_Y, true);
        this.body.setOffset(this.BODY_X_OFFSET, this.BODY_Y_OFFSET);

        //enemy spawns
        this.spawnOneX = 100
        this.spawnOneY = game.config.height - 100;

        this.spawnTwoX =  1030
        this.spawnTwoY = 175
         
        this.spawnThreeX = 1100;
        this.spawnThreeY = 751 

        

        // if the enemy is touching the floor, refers to previous frame
        this.touchingFloorPrevFrame = this.body.blocked.down || this.body.touching.down;

        //1 for right, -1 for left
        if(this.local_scene_variable.player.x + this.ATTACK_RANGE < this.x) //player is left of enemy
        {
            this.moveDirection = -1;
            this.flipX = false;
        }
        else //player is right of or on enemy
        {
            this.moveDirection = 1;
            this.flipX = true;
        }

        this.floorLevel = 900;

        //start the game walking
        this.play('enemy_walk');

        //attack handling
        this.attackCounter = 0;
        this.ATTACK_FREQUENCY = 50;
    }

    update()
    {
        //this.body.setSize(this.width,this.height,true); //fixes bounding box size

        //jump logic
        //check for wall or walking off platfrom and jump
        if(this.body.blocked.left || this.body.touching.left || this.body.blocked.right || this.body.touching.right)
        {
                if (this.body.blocked.down || this.body.touching.down)
                {
                    this.body.setVelocityY(this.JUMP_VELOCITY);

                    //set this to false so that the enemy wont jump next frame
                    this.touchingFloorPrevFrame = false;
                }
        }
        else if (this.touchingFloorPrevFrame //check whether enemy was touching the floor the previous frame
                && !(this.body.blocked.down || this.body.touching.down) //check whether enemy is colliding with the floor this frame
                && (this.local_scene_variable.player.y < this.y) ) //check whether player is above enemy
        {
            //being here means the enemy has walked off something
            this.body.setVelocityY(this.JUMP_VELOCITY);

            //set this to false so that the enemy wont jump next frame
            this.touchingFloorPrevFrame = false;
        }
        else
        {
            //update whether the enemy is touching the floor
            this.touchingFloorPrevFrame = this.body.blocked.down || this.body.touching.down;
        }


        //left and right movement and attacking
        if(this.local_scene_variable.player.x + this.ATTACK_RANGE < this.x) //player is left of enemy
        {
            //this.setTexture("enemy_walk");
            this.body.setVelocityX(-1 * this.MOVE_VELOCITY);

            //check if the enemy is walking in the opposite direction of the player
            if (this.moveDirection == 1)
            {
                this.moveDirection = -1;
                this.flipX = false;
                this.play('enemy_walk');
            }
        }
        else if(this.local_scene_variable.player.x - this.ATTACK_RANGE > this.x) //player is right of enemy
        {
           // this.setTexture("enemy_walk");
           this.body.setVelocityX(this.MOVE_VELOCITY);

           //check if the enemy is walking in the opposite direction of the player
           if (this.moveDirection == -1)
           {
                this.moveDirection = 1;
                this.flipX = true;
                this.play('enemy_walk');
           }
        }
        else
        {
            //stop moving toward the player
            this.body.setVelocityX(0);  //this will set velocity to 0 EVERY FRAME the enemy isn't moving left or right, not ideal
            this.play('enemy_idle');
        }

    }

    die()
    {
        //temporarily hide enemy
        this.alpha = 0;
        //create explosion at the enemy's location
        let enemy_dead = this.local_scene_variable.add.sprite(this.x, this.y, "enemy");
        enemy_dead.anims.play("enemy_death"); //play death animation
        enemy_dead.on("animationcomplete", () => //callback after animation completes
        {
            this.respawn(); //reset enemy position
            this.alpha = 1; //make enemy visible again
            enemy_dead.destroy(); //remove death sprite
        });
        

        console.log("enemy do a die DX");

        //add 1 to player score
        this.scene.score += 1;
        this.scene.scoreDisplay.text = this.scene.score;
    }

    respawn()
    {
        console.log("i respawn now O_o");
        let spawnIndex  = Math.floor(Math.random() * 3);

        console.log(spawnIndex)
        if(spawnIndex == 0){ // spawn 1
            this.x = this.spawnOneX
            this.y = this.spawnOneY
        }
        else if(spawnIndex == 1){ // spawn 2
            this.x = this.spawnTwoX;
            this.y = this.spawnTwoY;
        }
        else if(spawnIndex == 2){ // spawn 3
            this.x = this.spawnThreeX;
            this.x = this.spawnThreeY;
        }

    }
    
}