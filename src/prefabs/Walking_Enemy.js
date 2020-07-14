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

        this.floorLevel = 900;
    }

    update()
    {
        //check for jump key and jump
        if(this.body.blocked.left || this.body.touching.left || this.body.blocked.right || this.body.touching.right)
        {
                if (this.body.blocked.down || this.body.touching.down)
                {
                    this.body.setVelocityY(this.JUMP_VELOCITY);
                }
        }

        //left and right movement
        if(this.local_scene_variable.player.x + this.ATTACK_RANGE < this.x)
        {
            this.setTexture("enemy_sprite_placeholder");
            this.body.setVelocityX(-1 * this.MOVE_VELOCITY);
        }
        else if(this.local_scene_variable.player.x - this.ATTACK_RANGE > this.x)
        {
            this.setTexture("enemy_sprite_placeholder");
            this.body.setVelocityX(this.MOVE_VELOCITY);
        }
        else
        {
            //stop moving toward the player and attack
            this.body.setVelocityX(0);  //this will set velocity to 0 EVERY FRAME the enemy isn't moving left or right, not ideal

            if ( (this.y <= this.local_scene_variable.player.y + this.ATTACK_RANGE) && (this.y >= this.local_scene_variable.player.y - this.ATTACK_RANGE) )
            {
                //this is where attacks go!!
                this.setTexture("enemy_sprite_placeholder_alt");
            }
        }

    }
}