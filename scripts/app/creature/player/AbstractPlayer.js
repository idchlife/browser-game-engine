import Position from '../../position/Position.js'
import EventEmitter2 from 'eventemitter2';

class AbstractPlayer {
  constructor() {
    this.position = new Position();

    this.string = 'P';
    this.color = '#000000';
    this.events = new EventEmitter2();
  }

  move(direction) {
    var newPosition = new Position();
    newPosition.x = this.position.x;
    newPosition.y = this.position.y;

    switch(direction) {
      case(AbstractPlayer.MOVE_UP): {
        newPosition.y -= 1;
        break;
      }
      case(AbstractPlayer.MOVE_DOWN): {
        newPosition.y += 1;
        break;
      }
      case(AbstractPlayer.MOVE_LEFT): {
        newPosition.x -= 1;
        break;
      }
      case(AbstractPlayer.MOVE_RIGHT): {
        newPosition.x += 1;
        break;
      }
    }

    this.events.emit('move', {oldPosition: this.position, newPosition});
  }

  setPosition(position) {
    this.position = position;
  }

  toString() {
    return this.string;
  }

  getColor() {
    return this.color;
  }
}

AbstractPlayer.MOVE_UP = 0;
AbstractPlayer.MOVE_DOWN = 1;
AbstractPlayer.MOVE_LEFT = 2;
AbstractPlayer.MOVE_RIGHT = 3;

export default AbstractPlayer