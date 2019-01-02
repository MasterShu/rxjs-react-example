import Phaser from 'phaser'
import { Page, Link } from 'framework7-react'
import React from 'react'

var config = {
    type: Phaser.WEBGL,
    width: 375,
    height: 600,
    parent: 'phaser-example',
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'arcade'
    }
};


let ball, paddle, bricks

function preload() {
    this.load.setBaseURL('https://raw.githubusercontent.com/photonstorm/phaser3-examples/master/public/');
    this.load.atlas('assets', 'assets/games/breakout/breakout.png', 'assets/games/breakout/breakout.json');

}

function create() {
    this.physics.world.setBoundsCollision(true, true, true, false);

    //  Create the bricks in a 10x6 grid
    bricks = this.physics.add.staticGroup({
        key: 'assets', frame: ['blue1', 'red1', 'green1', 'yellow1', 'silver1', 'purple1'],
        frameQuantity: 7,
        setScale: { x: 0.8, y: 0.8},
        gridAlign: { width: 7, height: 6, cellWidth: 50, cellHeight: 25, x: 30, y: 80 }
    });

    ball = this.physics.add.image(375/2, 500, 'assets', 'ball1').setCollideWorldBounds(true).setBounce(1);
    ball.setData('onPaddle', true);

    paddle = this.physics.add.image(375/2, 550, 'assets', 'paddle1').setImmovable();

    //  Our colliders
    this.physics.add.collider(ball, bricks, hitBrick, null, this);
    this.physics.add.collider(ball, paddle, hitPaddle, null, this);

    //  Input events
    this.input.on('pointermove', function (pointer) {

        //  Keep the paddle within the game
        paddle.x = Phaser.Math.Clamp(pointer.x, 52, 748);

        if (ball.getData('onPaddle')) {
            ball.x = paddle.x;
        }

    }, this);

    this.input.on('pointerup', function (pointer) {

        if (ball.getData('onPaddle')) {
            ball.setVelocity(-75, -300);
            ball.setData('onPaddle', false);
        }

    }, this);
}

function hitBrick(ball, brick) {
    brick.disableBody(true, true);

    if (bricks.countActive() === 0) {
        resetLevel();
    }
}

function resetBall() {
    ball.setVelocity(0);
    ball.setPosition(paddle.x, 500);
    ball.setData('onPaddle', true);
}

function resetLevel() {
    resetBall();

    bricks.children.each(function (brick) {

        brick.enableBody(false, 0, 0, true, true);

    });
}

function hitPaddle(ball, paddle) {
    var diff = 0;

    if (ball.x < paddle.x) {
        //  Ball is on the left-hand side of the paddle
        diff = paddle.x - ball.x;
        ball.setVelocityX(-10 * diff);
    }
    else if (ball.x > paddle.x) {
        //  Ball is on the right-hand side of the paddle
        diff = ball.x - paddle.x;
        ball.setVelocityX(10 * diff);
    }
    else {
        //  Ball is perfectly in the middle
        //  Add a little random X to stop it bouncing straight up!
        ball.setVelocityX(2 + Math.random() * 8);
    }
}

function update() {
    if (ball.y > 600) {
        resetBall();
    }
}

export default class BreakOut extends React.Component {
    componentDidMount() {
        new Phaser.Game(config);
    }
    render() {
        return (
            <Page>
                <div id="phaser-example"></div>
                <Link back>Back</Link>
            </Page>
        )
    }
}
