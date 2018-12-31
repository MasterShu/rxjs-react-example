import React from 'react'
import {
  Page,
  Button,
  Link
} from 'framework7-react'
import { interval } from 'rxjs';

const WIDTH = 375
const HEIGHT = 600
const PADDLE_HEIGHT = 0
const PADDLE_WIDTH = 100
const BALL_RADIUS = 10
const BRICK_ROWS = 5
const BRICK_COLUMNS = 7
const BRICK_HEIGHT = 20
const BRICK_GAP = 3
const TICKER_INTERVAL = Math.ceil(1000/60)
let stage, context

export default class BreakoutRx extends React.Component{
  constructor() {
    super(...arguments)
    this.stage = React.createRef()
    stage = this.stage.current
    context = stage.getContext('2d')
    context.fillStyle = 'green'
    this.drawIntro = this.drawIntro.bind(this)
  }

  drawIntro() {
    context.createRect(0, 0, WIDTH, HEIGHT)
    context.textAlign = 'center'
    context.font = '24px Courier New'
    context.fillText('Press [<] and [>]', WIDTH/2, HEIGHT/2)
  }

  drawGameOver(text) {
    context.clearRect(WIDTH/4, HEIGHT/3, WIDTH/2, HEIGHT/3)
    context.textAlign = 'center'
    context.font = '24px Courier New'
    context.fillText(text, WIDTH/2, HEIGHT/2)
  }

  drawScore(score) {
      context.textAlign = 'left'
      context.font = '16px Courier New'
      context.fillText(score, BRICK_GAP, 16)
  }

  drawPaddle(position) {
      context.beginPath()
      context.rect(
          position - PADDLE_WIDTH/2,
          HEIGHT - PADDLE_HEIGHT,
          PADDLE_WIDTH,
          PADDLE_HEIGHT
      )
      context.fill()
      context.closePath()
  }

  drawBall(ball) {
      context.beginPath()
      context.arc(ball.position.x, ball.position.y, BALL_RADIUS, 0, Math.PI * 2)
      context.fill()
      context.closePath()
  }

  drawBrick(brick) {
      context.beginPath()
      context.rect(
          brick.x - brick.width / 2,
          brick.y - brick.height / 2,
          brick.width,
          brick.height
      )
      context.fill()
      context.closePath()
  }

  drawBricks(bricks) {
      bricks.forEach(brick => {
          drawBrick(brick)
      });
  }

  render() {
    return (
      <Page>
        <canvas ref={this.stage}></canvas>
      </Page>
    )
  }
}
