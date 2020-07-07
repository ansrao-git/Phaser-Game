let config = {
    type: Phaser.CANVAS,
    width: 1200,
    height: 900,
    scene: [ Menu, Level_One ]
}

console.log("HelloWorld");

let game = new Phaser.Game(config);