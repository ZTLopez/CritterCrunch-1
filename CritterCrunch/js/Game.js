// JavaScript source code
// config
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: {
        y: 0
      } // Top down game, so no gravity
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};
var game = new Phaser.Game(config);
var player, enemy = [], maxEnemies= 5;

function preload() {
    this.load.spritesheet("Critter", "assets/critter/critterSpriteSheet.png", { frameWidth: 49, frameHeight: 66 });
    this.load.spritesheet("Fox","assets/critter/foxSpriteSheet.png", { frameWidth: 49, frameHeight: 66 });
    this.load.spritesheet("heartAttack","assets/critter/heartsheet.png", {frameWidth:38, frameHeight: 30});
    this.load.image("shadow","assets/critter/shadow.png");
    this.load.image("house", "assets/critter/house.png");
    this.load.image("landscape", "assets/critter/tileseet.png");
    this.load.tilemapTiledJSON("level1", "assets/critter/level1.json");
}

function create(){
    this.cameras.main.setBounds(0, 0, 800, 600);
    this.physics.world.setBounds(0, 0, 800, 600);

    this.map = this.make.tilemap({ key: "level1" });
    var landscape = this.map.addTilesetImage("world", "landscape");
    var home = this.map.addTileSetImage("house","house");
    this.map.createStaticLayer("foreground2", landscape, 0, 0);
    this.map.createStaticLayer("foreground", landscape, 0, 0);
    this.map.createStaticLayer("background", landscape, 0, 0);
    var destructLayer = this.map.createDynamicLayer("walls", landscape, 0, 0);
    destructLayer.setCollisionByProperty({collides: true});

    var playerSpawn = map.findObject("playerSpawn", function (object) {
        if (object.name === "playerSpawn") {
            return object;
        }
    });
    
    createPlayer.call(this.playerSpawn);

    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    
}

function update(){

}
