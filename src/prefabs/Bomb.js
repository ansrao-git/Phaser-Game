class Bomb extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, isLeft, texture)
    {
        super(scene, x, y, texture);

        this.local_scene_variable = scene; //makes the scene shareable between methods

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true); //makes the bomb collide with the sides of the viewport

        //enabling collision and overlap events for the bomb (maybe)
        this.onCollide = true;
        this.onOverlap = true;

        //this variable says whether the bomb is being thrown left or right
        this.isLeft = isLeft;

        //constant velocity of thrown bomb
        this.X_VELOCITY = 50;
        this.Y_VELOCITY = -50;
        this.DAMAGE_RADIUS = 25;

        if (isLeft == true)
        {
            this.body.setVelocityY(this.Y_VELOCITY);
            this.body.setVelocityX(-1 * this.X_VELOCITY);
        }
        else
        {
            this.body.setVelocityY(this.Y_VELOCITY);
            this.body.setVelocityX(this.X_VELOCITY);
        }
    }

    update()
    {

    }
}