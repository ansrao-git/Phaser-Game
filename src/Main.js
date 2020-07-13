//Julian Cady, Mark Kuang, Anish Rao

let config =
{
    type: Phaser.CANVAS,
    width: 1280,
    height: 800,
    scene: [ Menu, Level_One ],


    //set physics world properties
    physics:
    {
        default: 'arcade',
        arcade:
        {
            debug: true,
            gravity:
            {
                x: 0,
                y: 1000
            }
        }
    }
}

let game = new Phaser.Game(config);

//reserve movement keys
let keyLEFT, keyA, keyRIGHT, keyD, keyUP, keyW, keySPACE;