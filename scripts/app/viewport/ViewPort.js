import VoidCell from '../map/cell/VoidCell.js'
import Position from '../position/Position.js'

class ViewPort {
  constructor(stage, player) {
    /**
     * Number of cells to show in each side of the player
     * @type {number}
     */
    this.sizeX = 6;
    this.sizeY = 4;

    this.stage = stage;
    this.player = player;

    this.viewPort = [];
  }

  getCellsArrayForView() {
    this.viewPort = [];
    var cellsArraySizeY = this.sizeY * 2 + 1;
    var cellsArraySizeX = this.sizeX * 2 + 1;
    for (var y = 0; y < cellsArraySizeY; y++) {
      this.viewPort.push([]);
      for (var x = 0; x < cellsArraySizeX; x++) {
        var cellFromMap = this.stage.getMap().getCellFromPosition(
          new Position()
            .setY(this.player.position.y - (this.sizeY - y))
            .setX(this.player.position.x - (this.sizeX - x))
        );
        this.viewPort[y].push(
          typeof cellFromMap === 'undefined' ? new VoidCell() : cellFromMap
        );
      }
    }

    return this.viewPort;
  }
}

export default ViewPort