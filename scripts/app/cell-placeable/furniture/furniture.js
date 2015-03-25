import AbstractFurniture from './AbstractFurniture.js'

class Wardrobe extends AbstractFurniture {
  constructor() {
    super();
    this.string = 'w';
    this.objectName = 'wardrobe';
    this.color = '#f4a460';
  }
}

class Chair extends AbstractFurniture {
  constructor() {
    super();
    this.string = 'c';
    this.objectName = 'chair';
  }
}

class Table extends AbstractFurniture {
  constructor() {
    super();
    this.string = 't';
    this.objectName = 'table';
  }
}

export default {
  'Wardrobe': Wardrobe,
  'Chair': Chair,
  'Table': Table
}