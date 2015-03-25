var AbstractCell = require('./AbstractCell.js');

class WallCell extends AbstractCell {
  constructor() {
    super();
    this.string = 'w';
    this.obstacle = true;
  }
}

export default WallCell