// JavaScript source code
class Animals {
    constructor(scene,){
        this.scene = scene;
        this.shadow = this.scene.add.sprite();
        this.shadow.setDepth(1);
    }
    update(){

    }   
    
}

class Fox extends Animals {
    constructor(){
        super();
    }
}

class Critter extends Animals {
    constructor(){
        super();
        
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

            }
        );
        this.damageMax = 3;
    }
    
}
