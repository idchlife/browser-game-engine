import AbstractPlaceable from '../AbstractPlaceable.js'

export class PlayerSpawn extends AbstractPlaceable {
  constructor() {
    this.objectName = 'PlayerSpawn';

    this.renderable = false;
  }
}

export default {
  'PlayerSpawn': PlayerSpawn
}