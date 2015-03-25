import Player from '../creature/player/SimplePlayer.js'
import Stage from '../stage/Stage.js'
import Renderer from '../renderer/Renderer.js'
import EventEmitter2 from 'eventemitter2'
import WASDControls from '../controls/WASDControls.js'
import SimpleMap from '../map/SimpleMap.js'
import ViewPort from '../viewport/ViewPort.js'
import MapProcessor from '../map/MapProcessor.js'
import mapObject from 'json!../maps/simple.json'

class GameManager {
  constructor() {
    this.stage = undefined;
    this.renderer = undefined;
    this.eventEmitter = undefined;

    this.mapProcessor = new MapProcessor();
  }

  initTest() {
    this.initWithDefaultSettings();
    this.tick();
  }

  initWithDefaultSettings() {
    var player = new Player();
    var controls = new WASDControls(player);

    var map = this.mapProcessor.getMapFromMapObject(mapObject);
    this.stage = new Stage();
    this.stage.setMap(map);

    this.renderer = new Renderer();
    this.renderer.setElementForRender(
      document.querySelector('.game-screen')
    );

    this.viewPort = new ViewPort(this.stage, player);

    this.stage.addPlayer(player);

    this.initStageChangedListener();
  }

  initStageChangedListener() {
    this.stage.events.on('changed', f => this.tick());
  }

  tick() {
    this.renderer.renderCellsArray(
      this.viewPort.getCellsArrayForView()
    );
  }
}

export default GameManager