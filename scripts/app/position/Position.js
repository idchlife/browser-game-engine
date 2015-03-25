class Position {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
  }

  setX(x) {
    this.x = x;

    return this;
  }

  setY(y) {
    this.y = y;

    return this;
  }
}

export default Position