import CellFactory from './cell/CellFactory.js'

class SimpleMap {
  constructor() {
    this.arrayTemplate = [
      '0000000000000000000',
      '0000w00000000000000',
      '0000w00000000w00w00',
      '0000000000000w00w00'
    ];

    this.map = undefined;
    this.cellFactory = new CellFactory();

    this.processArrayTemplateToMap();
  }

  processArrayTemplateToMap() {
    this.map = [];

    for (var i = 0, size = this.arrayTemplate.length; i < size; i++) {
      this.map.push([]);
      for (var k = 0, kSize = this.arrayTemplate[i].length; k < kSize; k++) {
        this.map[i].push(
          this.cellFactory.getCellForString(this.arrayTemplate[i][k])
        );
      }
    }
  }


}

export default SimpleMap