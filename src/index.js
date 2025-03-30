import Phaser from 'phaser';

const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        min: {
            width: 400,
            height: 300
        },
        max: {
            width: 800,
            height: 600
        }
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    scene: {
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function create() {
    // Add background
    this.add.rectangle(400, 300, 800, 600, 0x000033);

    // Add player
    this.player = this.add.rectangle(400, 500, 50, 50, 0x00ff00);
    this.physics.add.existing(this.player, false);
    this.player.body.setCollideWorldBounds(true);
    this.player.body.setBounce(0.2);

    // Add platforms
    const platforms = this.physics.add.staticGroup();
    
    // Ground
    const ground = this.add.rectangle(400, 580, 800, 40, 0x444444);
    this.physics.add.existing(ground, true);
    
    // Platforms
    const platform1 = this.add.rectangle(600, 400, 200, 20, 0x444444);
    this.physics.add.existing(platform1, true);
    
    const platform2 = this.add.rectangle(50, 250, 200, 20, 0x444444);
    this.physics.add.existing(platform2, true);
    
    const platform3 = this.add.rectangle(750, 220, 200, 20, 0x444444);
    this.physics.add.existing(platform3, true);

    // Add collision between player and platforms
    this.physics.add.collider(this.player, [ground, platform1, platform2, platform3]);

    // Setup keyboard controls
    this.cursors = this.input.keyboard.createCursorKeys();

    // Setup touch controls
    this.input.on('pointerdown', (pointer) => {
        // Check if tap is in top half of screen for jumping
        if (pointer.y < 300) { // 300 is half of canvas height
            if (this.player.body.touching.down) {
                this.player.body.setVelocityY(-330);
            }
        } else {
            // Left/right movement
            if (pointer.x < this.player.x) {
                this.player.body.setVelocityX(-160);
            } else {
                this.player.body.setVelocityX(160);
            }
        }
    });

    this.input.on('pointerup', () => {
        this.player.body.setVelocityX(0);
    });
}

function update() {
    // Keyboard controls
    if (this.cursors.left.isDown) {
        this.player.body.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
        this.player.body.setVelocityX(160);
    } else {
        this.player.body.setVelocityX(0);
    }

    // Jumping
    if (this.cursors.up.isDown && this.player.body.touching.down) {
        this.player.body.setVelocityY(-330);
    }

    // Touch controls
    if (this.input.activePointer.isDown) {
        if (this.input.activePointer.y >= 300) { // Only move if not jumping
            if (this.input.activePointer.x < this.player.x) {
                this.player.body.setVelocityX(-160);
            } else {
                this.player.body.setVelocityX(160);
            }
        }
    } else {
        this.player.body.setVelocityX(0);
    }
} 