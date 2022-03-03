import Sprite from './Sprite';

class Score extends Sprite {
  constructor(x, y) {
    super(x, y);
    this.x = x;
    this.y = y;
    this.score = 0;
    this.font = '19px Arial';
    this.color = '#000';
  }

  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`Score: ${this.score}`, this.x, this.y);
  }

  update(points) {
    this.score += points;
  }

  reset() {
    this.score = 0;
  }
}

export default Score;
