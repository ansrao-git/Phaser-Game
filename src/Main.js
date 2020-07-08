let config =
{
    type: Phaser.CANVAS,
    width: 1200,
    height: 900,
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