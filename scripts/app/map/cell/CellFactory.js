import FloorCell from '../cell/FloorCell.js'
import WallCell from '../cell/WallCell.js'
import VoidCell from '../cell/VoidCell.js'

class CellFactory {
  constructor() {
    this.availableCells = [
      new FloorCell(),
      new WallCell(),
      new VoidCell()
    ];

    this.cachedCellsStrings = {};
  }

  getCellForString(string) {
    let cachedCell = this.getCachedCellForString(string);
    if (cachedCell) {
      return new cachedCell.constructor();
    }

    for (var i = 0, size = this.availableCells.length; i < size; i++) {
      var cell = this.availableCells[i];
      if (string === cell.toString()) {
        this.setCachedCellForString(string, cell);
        return new cell.constructor();
      }
    }

    throw new Error('Cell for string \'' + string + '\' not found.');
  }

  getCachedCellForString(string) {
    return typeof this.cachedCellsStrings[string] === 'undefined'
      ? undefined
      : Object.create(this.cachedCellsStrings[string]);
  }

  setCachedCellForString(string, cell) {
    this.cachedCellsStrings[string] = cell;
  }
}

export default CellFactory