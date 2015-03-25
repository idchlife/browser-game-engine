import AbstractPlaceable from '../AbstractPlaceable.js'

class AbstractItem extends AbstractPlaceable {
  constructor() {
    super();

    this.objectType = 'takeable';
    this.renderable = true;
  }
}

export default AbstractItem