// JavaScript source code
class Animals {
    constructor(scene,){
        this.scene = scene;
        //this.shadow = this.scene.add.sprite();
        //this.shadow.setDepth(1);
    }
    update(){

    }

}

class Fox extends Animals {
    constructor(scene){
        super(scene);
        this.enemy = this.scene.physics.add.sprite(playerSpawn.x, playerSpawn.y, 'Fox', 4);
        this.enemy.setCollideWorldBounds(true);

        createEnemyAnimations.call(this);
    }
}

class Critter extends Animals {
    constructor(scene, playerSpawn){
        super(scene);

        this.direction = 0;
        this.critter = this.scene.physics.add.sprite(playerSpawn.x, playerSpawn.y, 'Critter', 4).setScale(0.5).setOrigin(0.5,0.625);
        this.critter.setCollideWorldBounds(true);
        this.critter.setSize(48,48);
        this.critter.setOffset(0,16);
        this.targetX = this.critter.x;
        this.dirX;
        this.dirY;
        this.targetY = this.critter.y;

        //createPlayerAnimations.call(this);
        this.keys = this.scene.input.keyboard.addKeys(
            {

                left: Phaser.Input.Keyboard.KeyCodes.LEFT,
                right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
                up: Phaser.Input.Keyboard.KeyCodes.UP,
                down: Phaser.Input.Keyboard.KeyCodes.DOWN,
                w: Phaser.Input.Keyboard.KeyCodes.W,
                a: Phaser.Input.Keyboard.KeyCodes.A,
                s: Phaser.Input.Keyboard.KeyCodes.S,
                d: Phaser.Input.Keyboard.KeyCodes.D,
                q: Phaser.Input.Keyboard.KeyCodes.Q,
                e: Phaser.Input.Keyboard.KeyCodes.E,
                space: Phaser.Input.Keyboard.KeyCodes.SPACE,

            }
        );
        this.damageMax = 3;
    }
    
    update(){
      this.checkPlayerMovement();
      if (this.keys.space.isDown && Phaser.Input.Keyboard.JustDown(this.keys.right) && this.direction == 1){
        tryShoot();
      } else if (this.keys.space.isDown && Phaser.Input.Keyboard.JustDown(this.keys.left) && this.direction == 2){
        tryShoot();
      } else if(this.keys.space.isDown && Phaser.Input.Keyboard.JustDown(this.keys.down) && this.direction == 0){
        tryShoot();
      } else if(this.keys.space.isDown && Phaser.Input.Keyboard.JustDown(this.keys.up) && this.direction == 3){
        tryShoot();
      }
    }

    checkPlayerMovement(){
      console.log(this.critter.x + ", " + this.targetX);
      if (this.keys.right.isDown && this.critter.x == this.targetX) {
        this.direction = 1;
        this.dirX = 1;
          this.critter.body.velocity.x = 100;
          this.targetX = this.critter.x + 24;
          this.critter.anims.play('walkSide', true);
          this.critter.flipX = false;
        } else if (this.critter.x > this.targetX && this.dirX == 1) {
          this.critter.body.velocity.x = 0;
          this.critter.x = this.targetX;
        } else if (this.dirX == 1 && this.keys.left.isDown && ((this.critter.x-12)%24)==0) {
          this.targetX = this.critter.x;
        }

        if (this.keys.left.isDown && this.critter.x == this.targetX) {
          this.direction = 2;
          this.dirX = 0;
            this.critter.body.velocity.x = -100;
            this.targetX = this.critter.x - 24;
            this.critter.anims.play('walkSide', true);
            this.critter.flipX = true;
          } else if (this.critter.x < this.targetX && this.dirX == 0) {
            this.critter.body.velocity.x = 0;
            this.critter.x = this.targetX;
          }else if (this.dirX == 0 && this.keys.right.isDown && ((this.critter.x-12)%24)==0) {

            this.targetX = this.critter.x;
          }

//UP DOWN
          if (this.keys.down.isDown && this.critter.y == this.targetY) {
            this.direction = 0;
            this.dirY = 1;
              this.critter.body.velocity.y = 100;
              this.targetY = this.critter.y + 24;
              this.critter.anims.play('walkDown', true);
            } else if (this.critter.y > this.targetY && this.dirY == 1) {
              this.critter.body.velocity.y = 0;
              this.critter.y = this.targetY;
            } else if (this.dirY == 1 && this.keys.up.isDown && ((this.critter.y-12)%24)==0) {
              this.targetY = this.critter.y;
            }

            if (this.keys.up.isDown && this.critter.y == this.targetY) {
              this.direction = 3;
              this.dirY = 0;
                this.critter.body.velocity.y = -100;
                this.targetY = this.critter.y - 24;
                this.critter.anims.play('walkUp', true);
              } else if (this.critter.y < this.targetY && this.dirY == 0) {
                this.critter.body.velocity.y = 0;
                this.critter.y = this.targetY;
              }else if (this.dirY == 0 && this.keys.down.isDown && ((this.critter.y-12)%24)==0) {

                this.targetY = this.critter.y;
              }

    }
    enableCollision(destructLayer) {
      console.log("meow")
        this.scene.physics.add.collider(this.critter, destructLayer);
    }

}
