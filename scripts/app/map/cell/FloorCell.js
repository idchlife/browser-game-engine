import AbstractCell from './AbstractCell.js'

class FloorCell extends AbstractCell {
  constructor() {
    super();
    this.string = '0';
    this.color = '#d3d3d3';
  }
}

export default FloorCell