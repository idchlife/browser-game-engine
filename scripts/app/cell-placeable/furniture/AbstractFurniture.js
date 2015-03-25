import AbstractObstacle from '../AbstractObstacle.js'

class AbstractFurniture extends AbstractObstacle {
  constructor() {
    super();
    this.color = '#9f622f';
    this.name = 'Wardrobe';
    this.objectType = 'furniture';
    this.objectName = undefined;

    this.renderable = true;
  }
}

export default AbstractFurniture