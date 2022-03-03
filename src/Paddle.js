import Sprite from './Sprite';

class Paddle extends Sprite {
  constructor(x, y, width, height, speed, color = '#2aaeed') {
    super(x, y, width, height, color);
    this.color = color;
    this.speed = speed;
    this.width = width;
    this.height = height;
  }
}

export default Paddle;
