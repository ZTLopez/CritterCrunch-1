// JavaScript source code
// config
var config = {
  type: Phaser.AUTO,
  width: 720,
  height: 720,
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
    this.load.spritesheet("Critter", "assets/critter/critterSpriteSheet.png", { frameWidth: 48, frameHeight: 64 });
    this.load.spritesheet("Fox","assets/critter/foxSpriteSheet.png", { frameWidth: 48, frameHeight: 64 });
    this.load.spritesheet("heartAttack","assets/critter/heartsheet.png", {frameWidth:38, frameHeight: 30});
    //this.load.image("shadow","assets/critter/shadow.png");
    this.load.image("house", "assets/critter/house.png");
    this.load.image("landscape", "assets/critter/tilesheet.png");
    this.load.tilemapTiledJSON("level1", "assets/critter/level1.json");
}

function create(){
    this.cameras.main.setBounds(0, 0, 800, 600);
    this.physics.world.setBounds(0, 0, 800, 600);

    this.map = this.make.tilemap({ key: "level1" });
    var landscape = this.map.addTilesetImage("world", "landscape");
    var home = this.map.addTilesetImage("house","house");

    this.map.createStaticLayer("background", landscape, 0, 0);
    this.map.createStaticLayer("foreground", [landscape, home], 0, 0);
    this.map.createStaticLayer("foreground2", landscape, 0, 0);

    var destructLayer = this.map.createDynamicLayer("walls", landscape, 0, 0);
    destructLayer.setCollisionByProperty({collides: true});

    var playerSpawn = this.map.findObject("playerSpawn", function (object) {
        if (object.name === "playerSpawn") {
            return object;
        }
    });

    //createPlayer.call(this.playerSpawn);

    player = new Critter (this, playerSpawn);

    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    this.cameras.main.startFollow(player.critter, true, 0.5, 0.5);
    this.cameras.main.zoom = 3.5;

    createPlayerAnimations.call(this);


}

function update(){
    player.update();

}

function createPlayerAnimations() {
    this.anims.create({
        key: 'walkDown',
        frames: this.anims.generateFrameNumbers('Critter', {start: 7, end: 11}),
        frameRate: 10,
        repeat: 0
    });
    this.anims.create({
        key: 'walkUp',
        frames: this.anims.generateFrameNumbers('Critter', {start: 13, end: 17}),
        frameRate: 10,
        repeat: 0
    });
    this.anims.create({
        key: 'walkSide',
        frames: this.anims.generateFrameNumbers('Critter', {start: 18, end: 22}),
        frameRate: 10,
        repeat: 0
    });
    this.anims.create({
        key: 'sideIdle',
        frames: this.anims.generateFrameNumbers('Critter', {start: 2, end: 3}),
        frameRate: 2,
        repeat: -1
    });
  }
