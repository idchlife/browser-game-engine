import AbstractPlaceable from './AbstractPlaceable.js'

class AbstractObstacle extends AbstractPlaceable {
  constructor() {
    super();

    this.obstacle = true;
  }
}

export default AbstractObstacle