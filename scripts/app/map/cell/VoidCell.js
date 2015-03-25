import AbstractCell from './AbstractCell.js'

/**
 * Cell that used primarily for filling those cell that out of bounds,
 * in ViewPort
 */
class VoidCell extends AbstractCell {
  constructor() {
    super();
    this.obstacle = true;
    this.string = '#';
  }
}

export default VoidCell