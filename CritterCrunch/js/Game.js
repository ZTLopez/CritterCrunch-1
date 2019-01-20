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
    var foreground = this.map.createStaticLayer("foreground", [landscape, home], 0, 0);
    var foreground2 = this.map.createStaticLayer("foreground2", landscape, 0, 0);
    var collisionLayer = foreground, foreground2;


    var destructLayer = this.map.createDynamicLayer("walls", landscape, 0, 0);
    destructLayer.setCollisionByProperty({collision: true});

    var playerSpawn = this.map.findObject("playerSpawn", function (object) {
        if (object.name === "playerSpawn") {
            return object;
        }
    });

    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    //createPlayer.call(this.playerSpawn);
    player = new Critter (this, playerSpawn);
    player.enableCollision(destructLayer);

    collisionLayer.setCollisionBetween(1, 1000);
    this.physics.add.collider(player.critter, foreground);
    this.physics.add.collider(player.critter, foreground2);


    this.cameras.main.startFollow(player.critter, true, 0.5, 0.5);
    this.cameras.main.zoom = 2.5;

    bullets = this.physics.add.group({
      defaultKey: "heartAttack",
      maxSize: -1
    });


    //this.anims.create({
    //    key: "shine",
    //    frames: this.anims.generateFrameNumbers("heartAttack", { start : 0, end : 3}),
    //    repeat: -1,
    //    frameRate: 6
    //});
    if (this.game.config.physics.arcade.debug == true) {
            var debugGraphics = this.add.graphics().setAlpha(0.55);
            collisionLayer.renderDebug(debugGraphics, {
                tileColor: null, // Color of non-colliding tiles
                collidingTileColor: new Phaser.Display.Color(255, 255, 0, 200)
            });
        }

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

  function tryShoot() {
      console.log("try shoot");
      var bullet = bullets.get(player.critter.x, player.critter.y);
      if (bullet) {
          fireBullet.call(this, bullet, player.direction);
      }
  }

  function fireBullet(heartAttack, direction) {
      heartAttack.body.collideWorldBounds = true;
      heartAttack.body.onWorldBounds = true;
      console.log("fire heartAttack");
      heartAttack.enableBody(false);
      heartAttack.setActive(true);
      heartAttack.setVisible(true);
      //heartAttack.angle = 90 * direction;
      //this.heartAttack.anims.play("shine",true);
      this.physics.velocityFromRotation(90 * direction, 500, heartAttack.body.velocity);

      var destructLayer = this.map.getLayer("walls").tilemapLayer;
      this.physics.add.collider(heartAttack, destructLayer, damageWall, null, this);
   }

  function killheartAttack(heartAttack) {
      heartAttack.disableBody(true, true);
      heartAttack.setActive(false);
      heartAttack.setVisible(false);
  }

  function damageWall(heartAttack, tile) {
      var destructLayer = this.map.getLayer("walls").tilemapLayer;
      killheartAttack(heartAttack);
      var index = tile.index + 1;
      var tileProperties = destructLayer.tileset[0].tileProperties[index-1];

      var checkCollision = false;

      if (tileProperties) {
          if (tileProperties.collides) {
              checkCollision = true;
          }
      }
      const newTile = destructLayer.putTileAt(index, tile.x, tile.y);

      if (checkCollision) {
          newTile.setCollision(true);
      }
  }
