import CellFactory from '../map/cell/CellFactory.js'
import furniture from '../cell-placeable/furniture/furniture.js'
import item from '../cell-placeable/item/item.js'
import common from '../cell-placeable/common/common.js'
import Map from '../map/Map.js'
import { PlayerSpawn } from '../cell-placeable/common/common.js'
import Position from '../position/Position.js'

class MapProcessor {
  constructor() {
    this.placeables = {
      furniture: furniture,
      item: item,
      common: common
    };
  }

  /**
   * Uses this.placeables map for creating new placeable object
   * by objectType (like furniture) and objectName (like wardrobe)
   *
   * @param objectType
   * @param objectName
   */
  createPlaceableFromTypeAndName(objectType, objectName) {
    return new this.placeables[objectType][objectName]();
  }

  getMapFromMapObject(object) {
    this.validateMapObject(object);

    let map = new Map();

    let mapArray = [];

    let cellFactory = new CellFactory();

    let mapDataArray = object.map;

    for (let y = 0, sizeY = mapDataArray.length; y < sizeY; y++) {
      mapArray.push([]);
      for (let x = 0, sizeX = mapDataArray[y].length; x < sizeX; x++) {
        mapArray[y].push(
          cellFactory.getCellForString(mapDataArray[y][x])
        );
      }
    }

    let placeables = object.placeables;

    placeables.forEach(placeable => {
      let placeableInstance = this.createPlaceableFromTypeAndName(
        placeable.objectType,
        placeable.objectName
      );

      if (placeableInstance instanceof PlayerSpawn) {
        map.addPlayerSpawnPosition(
          new Position()
          .setY(placeable.y)
          .setX(placeable.x)
        );
      }

      mapArray[placeable.y][placeable.x].contain(placeableInstance);
    });

    map.setMap(mapArray);

    return map;
  }

  validateMapObject(object) {
    if (!object.hasOwnProperty('map')) {
      throw new Error('Map object should have map property defined.');
    }
    if (!(object.map instanceof Array)) {
      throw new Error("Map property should be an array");
    }
  }
}

export default MapProcessor