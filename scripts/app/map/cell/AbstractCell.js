class AbstractCell {
  constructor() {
    this.string = undefined;
    this.obstacle = false;
    this.creature = undefined;
    this.color = '#000000';
    this.contains = [];

    this.containsString = undefined;
  }

  toString() {
    if (this.isCreatureInside()) {
      return this.creature.toString();
    }

    if (typeof this.containsString !== 'undefined') {
      return this.containsString;
    }

    if (this.contains.length !== 0) {
      let i = 0;

      while (i < this.contains.length) {
        if (this.contains[i].isRenderable()) {
          return this.contains[i].toString();
        }
        i++;
      }
    }

    return this.string;
  }

  getColor() {
    if (this.isCreatureInside()) {
      return this.creature.getColor();
    }
    return this.color;
  }

  isObstacle() {
    return this.obstacle;
  }

  putCreature(creature) {
    this.creature = creature;
  }

  removeCreature() {
    this.creature = undefined;
  }

  isCreatureInside() {
    return typeof this.creature !== 'undefined';
  }

  contain(object) {
    if (object.isObstacle()) {
      this.obstacle = true;
    }

    if (typeof object.getColor() !== 'undefined') {
      this.color = object.getColor();
    }

    if (object.isRenderable()) {
      this.containsString = object.string;
    }
    this.contains.push(object);
  }
}

export default AbstractCell