//Julian Cady, Mark Kuang, Anish Rao
//we made sure all the art/sound assets we got from other places were free and required neither license nor attribution

let config =
{
    type: Phaser.CANVAS,
    width: 640, //1280
    height: 400, //800
    scene: [ Menu, Level_One, Pause, Game_Over ],
    pixelArt: true,

    //set physics world properties
    physics:
    {
        default: 'arcade',
        arcade:
        {
            debug: false,
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
let keyLEFT, keyA, keyRIGHT, keyD, keyUP, keyW, keySPACE, keyS, keyDOWN, keyF;