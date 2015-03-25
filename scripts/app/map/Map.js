export default class Map {
  constructor() {
    this.map = undefined;

    this.playerSpawnPositions = [];
  }

  setMap(map) {
    this.map = map;
  }

  getAsArray() {
    return this.map;
  }

  getCellFromPosition(position) {
    if (typeof this.map[position.y] === 'undefined') {
      return undefined;
    } else {
      return this.map[position.y][position.x];
    }
  }

  isPositionOutOfBounds(position) {
    if (typeof this.map[position.y] === 'undefined') {
      return true;
    } else if (typeof this.map[position.y][position.x] === 'undefined') {
      return true;
    } else {
      return false;
    }
  }

  putCreatureInPosition(creature, position) {
    this.map[position.y][position.x].putCreature(creature);
  }

  removeCreatureFromPosition(position) {
    this.map[position.y][position.x].removeCreature();
  }

  isThereAnObstacleInPosition(position) {
    return this.map[position.y][position.x].isObstacle();
  }

  addPlayerSpawnPosition(position) {
    this.playerSpawnPositions.push(position);
  }

  getRandomPlayerSpawnPosition() {
    if (this.playerSpawnPositions.length !== 0) {
      return this.playerSpawnPositions[
        Math.floor(
          Math.random() * this.playerSpawnPositions.length
        )
      ]
    } else {
      throw new Error('There are no player spawn positions in this map!');
    }
  }
}