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
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {
    // Load game assets here
    this.load.setBaseURL('https://labs.phaser.io');
    this.load.image('sky', 'assets/skies/space3.png');
    this.load.image('logo', 'assets/sprites/phaser-logo.png');
}

function create() {
    // Add background
    this.add.image(400, 300, 'sky');

    // Add logo
    const logo = this.add.image(400, 150, 'logo');
    logo.setScale(0.5);

    // Add player
    this.player = this.add.rectangle(400, 500, 50, 50, 0x00ff00);
    this.physics.add.existing(this.player);
    this.player.body.setCollideWorldBounds(true);

    // Add platforms
    const platforms = this.physics.add.staticGroup();
    platforms.create(400, 580, 'sky').setScale(800, 40).refreshBody();
    platforms.create(600, 400, 'sky').setScale(200, 20).refreshBody();
    platforms.create(50, 250, 'sky').setScale(200, 20).refreshBody();
    platforms.create(750, 220, 'sky').setScale(200, 20).refreshBody();

    // Add collision between player and platforms
    this.physics.add.collider(this.player, platforms);

    // Setup touch controls
    this.input.on('pointerdown', (pointer) => {
        if (pointer.x < this.player.x) {
            this.player.body.setVelocityX(-160);
        } else {
            this.player.body.setVelocityX(160);
        }
    });

    this.input.on('pointerup', () => {
        this.player.body.setVelocityX(0);
    });
}

function update() {
    // Game loop logic here
    if (this.input.activePointer.isDown) {
        if (this.input.activePointer.x < this.player.x) {
            this.player.body.setVelocityX(-160);
        } else {
            this.player.body.setVelocityX(160);
        }
    } else {
        this.player.body.setVelocityX(0);
    }
} 