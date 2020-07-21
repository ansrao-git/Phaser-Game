//Julian Cady, Mark Kuang, Anish Rao

let config =
{
    type: Phaser.CANVAS,
    width: 640, //1280
    height: 400, //800
    scene: [ Menu, Level_One, Game_Over ],
    pixelArt: true,

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
let keyLEFT, keyA, keyRIGHT, keyD, keyUP, keyW, keySPACE, keyF;