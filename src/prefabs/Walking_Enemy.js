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

        this.JUMP_VELOCITY = -600;
        this.MOVE_VELOCITY = 100;
        this.ATTACK_RANGE = 48;

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
    }


    

    update()
    {
        this.body.setSize(this.width,this.height,true); //fixes bounding box size
        //check for wall and jump
        if(this.body.blocked.left || this.body.touching.left || this.body.blocked.right || this.body.touching.right)
        {
                if (this.body.blocked.down || this.body.touching.down)
                {
                    this.body.setVelocityY(this.JUMP_VELOCITY);
                }
        }

        //left and right movement
        if(this.local_scene_variable.player.x + this.ATTACK_RANGE < this.x) //player is left of enemy
        {
            //this.setTexture("enemy_walk");
            this.body.setVelocityX(-1 * this.MOVE_VELOCITY);

            //check if the enemy is walking in the opposite direction of the player
            if (this.moveDirection == 1)
            {
                this.moveDirection = -1;
                this.scene.walking_enemy.flipX = false;
                this.scene.walking_enemy.play('enemy_walk');
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
                this.scene.walking_enemy.flipX = true;
                this.scene.walking_enemy.play('enemy_walk');
           }
        }
        else
        {
            //stop moving toward the player and attack
            this.body.setVelocityX(0);  //this will set velocity to 0 EVERY FRAME the enemy isn't moving left or right, not ideal
            this.scene.walking_enemy.play('enemy_idle');

            if ( (this.y <= this.local_scene_variable.player.y + this.ATTACK_RANGE) && (this.y >= this.local_scene_variable.player.y - this.ATTACK_RANGE) )
            {
                //this is where attacks go!!
                //this.setTexture("enemy_sprite_placeholder_alt");
            }
        }

    }
}