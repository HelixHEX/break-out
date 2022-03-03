import Sprite from './Sprite';

class Lives extends Sprite {
  constructor(x, y, initialLives) {
    super(x, y, initialLives);
    this.x = x;
    this.y = y;
    this.initialLives = initialLives;
    this.lives = initialLives;
    this.font = '19px Arial';
    this.color = '#000';
  }

  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`Lives: ${this.lives}`, this.x, this.y);
  }

  loseLife() {
    this.lives -= 1;
  }

  reset() {
    this.lives = this.initialLives;
  }
}

export default Lives;
