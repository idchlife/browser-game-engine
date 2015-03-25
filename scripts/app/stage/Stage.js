import EventEmitter2 from 'eventemitter2'
import Position from '../position/Position.js'

class Stage {
  constructor() {
    this.map = undefined;
    this.events = new EventEmitter2();

    this.players = [];
  }

  setMap(map) {
    this.map = map;
  }

  getMap() {
    return this.map;
  }

  addPlayer(player) {
    if (typeof this.map === 'undefined') {
      throw new Error('Cannot add player to stage without map!');
    }

    this.players.push(player);
    player.setPosition(this.map.getRandomPlayerSpawnPosition());
    this.map.putCreatureInPosition(player, player.position);

    this.registerPlayerEventListeners(player);
  }

  registerPlayerEventListeners(player) {
    player.events.on('move', positions => {
      this.tryToMovePlayerToNewPosition(
        player, positions.oldPosition, positions.newPosition
      );
    });
  }

  tryToMovePlayerToNewPosition(player, oldPosition, newPosition) {
    if (this.map.isPositionOutOfBounds(newPosition)) {
      return;
    }
    if (this.map.isThereAnObstacleInPosition(newPosition)) {
      return;
    }

    this.map.putCreatureInPosition(player, newPosition);
    this.map.removeCreatureFromPosition(oldPosition);
    player.setPosition(newPosition);
    this.triggerSomethingHasChanged();
  }

  triggerSomethingHasChanged() {
    this.events.emit('changed');
  }
}

export default Stage