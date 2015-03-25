class AbstractPlaceable {
  constructor() {
    this.string = undefined;
    this.color = '#000000';
    this.obstacle = false;

    this.renderable = false;
  }

  toString() {
    return this.string;
  }

  isRenderable() {
    return this.renderable;
  }

  isObstacle() {
    return this.obstacle;
  }

  getColor() {
    return this.color;
  }
}

export default AbstractPlaceable