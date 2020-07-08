//player prefab
class Player extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, texture)
    {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true); //makes the player collide with the sides of the viewport

        //enabling collision and overlap events for player character, but I may have just accidentallymade new variables instead
        this.onCollide = true;
        this.onOverlap = true;

        //variable to track which form the player is in; alt is short for alternate
        this.inAltForm = false;

        this.JUMP_VELOCITY = -600;
        this.MOVE_VELOCITY = 500;
    }

    update()
    {
        //check for jump key and jump
        if( Phaser.Input.Keyboard.JustDown(keyUP) || Phaser.Input.Keyboard.JustDown(keyW) )
        {
            this.body.setVelocityY(this.JUMP_VELOCITY);  //doesn't check if player is touching ground, not ideal
        }

        //left and right movement
        if( keyLEFT.isDown || keyA.isDown )
        {
            this.body.setVelocityX(-1 * this.MOVE_VELOCITY);
        }
        else if( keyRIGHT.isDown || keyD.isDown )
        {
            this.body.setVelocityX(this.MOVE_VELOCITY);
        }
        else
        {
            this.body.setVelocityX(0);  //this will set velocity to 0 EVERY FRAME the player isn't moving left or right, also not ideal
        }

        //switches between forms when space is pressed
        if ( Phaser.Input.Keyboard.JustDown(keySPACE) )
        {
            if (!this.inAltForm)
            {
                this.inAltForm = true;
                this.setTexture("player_sprite_placeholder_alt");

                console.log("in alt form!");
            }
            else
            {
                this.inAltForm = false;
                this.setTexture("player_sprite_placeholder");

                console.log("in not alt form!");
            }
        }
    }
}