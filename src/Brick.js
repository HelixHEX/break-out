import Sprite from './Sprite';

class Brick extends Sprite {
  constructor(x, y, width = 75, height = 20, color = '#2aaaad') {
    super(x, y, width, height, color);
    this.status = 1;
  }
}
export default Brick;
