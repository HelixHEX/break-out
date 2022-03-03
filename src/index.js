import Ball from './Ball';
import Paddle from './Paddle';
import Bricks from './Bricks';
import Background from './Background';
import Score from './Score';
import Lives from './Lives';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const { width, height } = canvas;

const paddleWidth = 75;
const paddleHeight = 10;

const ball = new Ball(width / 2, height - 30);
const paddle = new Paddle(
  (width - paddleWidth) / 2,
  height - paddleHeight,
  paddleWidth,
  paddleHeight,
);
const background = new Background(width, height, '#eee');
const bricks = new Bricks();

let rightPressed = false;
let leftPressed = false;

const score = new Score(8, 20);
const lives = new Lives(width - 65, 20, 3);

const ballMovement = () => {
  if (
    ball.x + ball.dx > width - ball.radius
    || ball.x + ball.dx < ball.radius
  ) {
    ball.dx = -ball.dx;
  }
  if (ball.y + ball.dy < ball.radius) {
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > height - ball.radius) {
    if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
      ball.dy = -ball.dy;
    } else {
      lives.loseLife();
      if (!lives.lives) {
        // eslint-disable-next-line no-alert
        alert('GAME OVER');
        document.location.reload();
      } else {
        ball.x = width / 2;
        ball.y = height - 30;
        ball.dx = 2;
        ball.dy = -2;
        paddle.x = (width - paddle.width) / 2;
      }
    }
  }
};

const collisionDetection = () => {
  for (let c = 0; c < bricks.cols; c += 1) {
    for (let r = 0; r < bricks.rows; r += 1) {
      const b = bricks.getBrick(c, r);
      if (b.status === 1) {
        if (
          ball.x > b.x
          && ball.x < b.x + b.width
          && ball.y > b.y
          && ball.y < b.y + b.height
        ) {
          ball.dy = -ball.dy;
          b.status = 0;
          score.update(1);
          if (score.score === bricks.rows * bricks.cols) {
            // eslint-disable-next-line no-alert
            alert('YOU WIN, CONGRATS!');
            score.score = 0;
            document.location.reload();
          }
        }
      }
    }
  }
};

const draw = () => {
  ctx.clearRect(0, 0, width, height);
  background.render(ctx);
  paddle.render(ctx);
  bricks.render(ctx);
  ball.render(ctx);
  score.render(ctx);
  lives.render(ctx);
  collisionDetection();
  ballMovement();
  ball.move();

  if (rightPressed && paddle.x < width - paddle.width) {
    paddle.x += 7;
  } else if (leftPressed && paddle.x > 0) {
    paddle.x -= 7;
  }

  requestAnimationFrame(draw);
};

const keyDownHandler = (e) => {
  if (e.keyCode === 39) {
    rightPressed = true;
  } else if (e.keyCode === 37) {
    leftPressed = true;
  }
};

const keyUpHandler = (e) => {
  if (e.keyCode === 39) {
    rightPressed = false;
  } else if (e.keyCode === 37) {
    leftPressed = false;
  }
};

const mouseMoveHandler = (e) => {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < width) {
    paddle.x = relativeX - paddle.width / 2;
  }
};

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

draw();
