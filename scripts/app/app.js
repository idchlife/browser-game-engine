/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var GameManager = _interopRequire(__webpack_require__(1));

	var gameManager = new GameManager();

	gameManager.initTest();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var Player = _interopRequire(__webpack_require__(8));

	var Stage = _interopRequire(__webpack_require__(2));

	var Renderer = _interopRequire(__webpack_require__(3));

	var EventEmitter2 = _interopRequire(__webpack_require__(10));

	var WASDControls = _interopRequire(__webpack_require__(4));

	var SimpleMap = _interopRequire(__webpack_require__(5));

	var ViewPort = _interopRequire(__webpack_require__(6));

	var MapProcessor = _interopRequire(__webpack_require__(7));

	var mapObject = _interopRequire(__webpack_require__(9));

	var GameManager = (function () {
	  function GameManager() {
	    _classCallCheck(this, GameManager);

	    this.stage = undefined;
	    this.renderer = undefined;
	    this.eventEmitter = undefined;

	    this.mapProcessor = new MapProcessor();
	  }

	  _createClass(GameManager, {
	    initTest: {
	      value: function initTest() {
	        this.initWithDefaultSettings();
	        this.tick();
	      }
	    },
	    initWithDefaultSettings: {
	      value: function initWithDefaultSettings() {
	        var player = new Player();
	        var controls = new WASDControls(player);

	        var map = this.mapProcessor.getMapFromMapObject(mapObject);
	        this.stage = new Stage();
	        this.stage.setMap(map);

	        this.renderer = new Renderer();
	        this.renderer.setElementForRender(document.querySelector(".game-screen"));

	        this.viewPort = new ViewPort(this.stage, player);

	        this.stage.addPlayer(player);

	        this.initStageChangedListener();
	      }
	    },
	    initStageChangedListener: {
	      value: function initStageChangedListener() {
	        var _this = this;

	        this.stage.events.on("changed", function (f) {
	          return _this.tick();
	        });
	      }
	    },
	    tick: {
	      value: function tick() {
	        this.renderer.renderCellsArray(this.viewPort.getCellsArrayForView());
	      }
	    }
	  });

	  return GameManager;
	})();

	module.exports = GameManager;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var EventEmitter2 = _interopRequire(__webpack_require__(10));

	var Position = _interopRequire(__webpack_require__(11));

	var Stage = (function () {
	  function Stage() {
	    _classCallCheck(this, Stage);

	    this.map = undefined;
	    this.events = new EventEmitter2();

	    this.players = [];
	  }

	  _createClass(Stage, {
	    setMap: {
	      value: function setMap(map) {
	        this.map = map;
	      }
	    },
	    getMap: {
	      value: function getMap() {
	        return this.map;
	      }
	    },
	    addPlayer: {
	      value: function addPlayer(player) {
	        if (typeof this.map === "undefined") {
	          throw new Error("Cannot add player to stage without map!");
	        }

	        this.players.push(player);
	        player.setPosition(this.map.getRandomPlayerSpawnPosition());
	        this.map.putCreatureInPosition(player, player.position);

	        this.registerPlayerEventListeners(player);
	      }
	    },
	    registerPlayerEventListeners: {
	      value: function registerPlayerEventListeners(player) {
	        var _this = this;

	        player.events.on("move", function (positions) {
	          _this.tryToMovePlayerToNewPosition(player, positions.oldPosition, positions.newPosition);
	        });
	      }
	    },
	    tryToMovePlayerToNewPosition: {
	      value: function tryToMovePlayerToNewPosition(player, oldPosition, newPosition) {
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
	    },
	    triggerSomethingHasChanged: {
	      value: function triggerSomethingHasChanged() {
	        this.events.emit("changed");
	      }
	    }
	  });

	  return Stage;
	})();

	module.exports = Stage;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var DefaultRenderPack = _interopRequire(__webpack_require__(15));

	var Renderer = (function () {
	  function Renderer() {
	    _classCallCheck(this, Renderer);

	    this.elementForRender = undefined;
	    this.pack = undefined;
	  }

	  _createClass(Renderer, {
	    getCellSettings: {
	      value: function getCellSettings(cell, type) {
	        if (typeof this.pack === "undefined") {
	          if (type === "color") {
	            return cell.getColor();
	          } else if (type === "view") {
	            return cell.toString();
	          }
	        }

	        if (type === "color") {
	          if (this.pack.isThereSettingsForCell(cell)) {
	            return this.pack.getSettingsForCell(cell).color;
	          } else {
	            return cell.getColor();
	          }
	        }
	        if (type === "view") {
	          if (this.pack.isThereSettingsForCell(cell)) {
	            return this.pack.getSettingsForCell(cell).view;
	          } else {
	            return cell.toString();
	          }
	        }
	      }
	    },
	    setElementForRender: {
	      value: function setElementForRender(element) {
	        this.elementForRender = element;
	        return this;
	      }
	    },
	    renderCellsArray: {
	      value: function renderCellsArray(cellsArray) {
	        var html = "";
	        html += "<table>";
	        for (var y = 0; y < cellsArray.length; y++) {
	          html += "<tr>";
	          for (var x = 0; x < cellsArray[y].length; x++) {
	            html += "<td style=\"height: 15px; width: 15px; color: " + this.getCellSettings(cellsArray[y][x], "color") + "\">";
	            html += this.getCellSettings(cellsArray[y][x], "view");
	            html += "</td>";
	          }
	          html += "</tr>";
	        }
	        this.elementForRender.innerHTML = html;
	      }
	    }
	  });

	  return Renderer;
	})();

	module.exports = Renderer;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var AbstractPlayer = _interopRequire(__webpack_require__(16));

	var WASDControls = (function () {
	  function WASDControls(player) {
	    _classCallCheck(this, WASDControls);

	    this.player = player;

	    this.KEY_CODE_UP = 87;
	    this.KEY_CODE_DOWN = 83;
	    this.KEY_CODE_LEFT = 65;
	    this.KEY_CODE_RIGHT = 68;

	    this.initKeyListeners();
	  }

	  _createClass(WASDControls, {
	    initKeyListeners: {
	      value: function initKeyListeners() {
	        document.body.onkeydown = (function (event) {
	          switch (parseInt(event.keyCode)) {
	            case this.KEY_CODE_UP:
	              {
	                this.player.move(AbstractPlayer.MOVE_UP);
	                break;
	              }
	            case this.KEY_CODE_DOWN:
	              {
	                this.player.move(AbstractPlayer.MOVE_DOWN);
	                break;
	              }
	            case this.KEY_CODE_LEFT:
	              {
	                this.player.move(AbstractPlayer.MOVE_LEFT);
	                break;
	              }
	            case this.KEY_CODE_RIGHT:
	              {
	                this.player.move(AbstractPlayer.MOVE_RIGHT);
	                break;
	              }
	          }
	        }).bind(this);
	      }
	    }
	  });

	  return WASDControls;
	})();

	module.exports = WASDControls;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var CellFactory = _interopRequire(__webpack_require__(13));

	var SimpleMap = (function () {
	  function SimpleMap() {
	    _classCallCheck(this, SimpleMap);

	    this.arrayTemplate = ["0000000000000000000", "0000w00000000000000", "0000w00000000w00w00", "0000000000000w00w00"];

	    this.map = undefined;
	    this.cellFactory = new CellFactory();

	    this.processArrayTemplateToMap();
	  }

	  _createClass(SimpleMap, {
	    processArrayTemplateToMap: {
	      value: function processArrayTemplateToMap() {
	        this.map = [];

	        for (var i = 0, size = this.arrayTemplate.length; i < size; i++) {
	          this.map.push([]);
	          for (var k = 0, kSize = this.arrayTemplate[i].length; k < kSize; k++) {
	            this.map[i].push(this.cellFactory.getCellForString(this.arrayTemplate[i][k]));
	          }
	        }
	      }
	    }
	  });

	  return SimpleMap;
	})();

	module.exports = SimpleMap;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var VoidCell = _interopRequire(__webpack_require__(12));

	var Position = _interopRequire(__webpack_require__(11));

	var ViewPort = (function () {
	  function ViewPort(stage, player) {
	    _classCallCheck(this, ViewPort);

	    /**
	     * Number of cells to show in each side of the player
	     * @type {number}
	     */
	    this.sizeX = 6;
	    this.sizeY = 4;

	    this.stage = stage;
	    this.player = player;

	    this.viewPort = [];
	  }

	  _createClass(ViewPort, {
	    getCellsArrayForView: {
	      value: function getCellsArrayForView() {
	        this.viewPort = [];
	        var cellsArraySizeY = this.sizeY * 2 + 1;
	        var cellsArraySizeX = this.sizeX * 2 + 1;
	        for (var y = 0; y < cellsArraySizeY; y++) {
	          this.viewPort.push([]);
	          for (var x = 0; x < cellsArraySizeX; x++) {
	            var cellFromMap = this.stage.getMap().getCellFromPosition(new Position().setY(this.player.position.y - (this.sizeY - y)).setX(this.player.position.x - (this.sizeX - x)));
	            this.viewPort[y].push(typeof cellFromMap === "undefined" ? new VoidCell() : cellFromMap);
	          }
	        }

	        return this.viewPort;
	      }
	    }
	  });

	  return ViewPort;
	})();

	module.exports = ViewPort;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var CellFactory = _interopRequire(__webpack_require__(13));

	var furniture = _interopRequire(__webpack_require__(17));

	var item = _interopRequire(__webpack_require__(18));

	var _cellPlaceableCommonCommonJs = __webpack_require__(19);

	var common = _interopRequire(_cellPlaceableCommonCommonJs);

	var Map = _interopRequire(__webpack_require__(14));

	var PlayerSpawn = _cellPlaceableCommonCommonJs.PlayerSpawn;

	var Position = _interopRequire(__webpack_require__(11));

	var MapProcessor = (function () {
	  function MapProcessor() {
	    _classCallCheck(this, MapProcessor);

	    this.placeables = {
	      furniture: furniture,
	      item: item,
	      common: common
	    };
	  }

	  _createClass(MapProcessor, {
	    createPlaceableFromTypeAndName: {

	      /**
	       * Uses this.placeables map for creating new placeable object
	       * by objectType (like furniture) and objectName (like wardrobe)
	       *
	       * @param objectType
	       * @param objectName
	       */

	      value: function createPlaceableFromTypeAndName(objectType, objectName) {
	        return new this.placeables[objectType][objectName]();
	      }
	    },
	    getMapFromMapObject: {
	      value: function getMapFromMapObject(object) {
	        var _this = this;

	        this.validateMapObject(object);

	        var map = new Map();

	        var mapArray = [];

	        var cellFactory = new CellFactory();

	        var mapDataArray = object.map;

	        for (var y = 0, sizeY = mapDataArray.length; y < sizeY; y++) {
	          mapArray.push([]);
	          for (var x = 0, sizeX = mapDataArray[y].length; x < sizeX; x++) {
	            mapArray[y].push(cellFactory.getCellForString(mapDataArray[y][x]));
	          }
	        }

	        var placeables = object.placeables;

	        placeables.forEach(function (placeable) {
	          var placeableInstance = _this.createPlaceableFromTypeAndName(placeable.objectType, placeable.objectName);

	          if (placeableInstance instanceof PlayerSpawn) {
	            map.addPlayerSpawnPosition(new Position().setY(placeable.y).setX(placeable.x));
	          }

	          mapArray[placeable.y][placeable.x].contain(placeableInstance);
	        });

	        map.setMap(mapArray);

	        return map;
	      }
	    },
	    validateMapObject: {
	      value: function validateMapObject(object) {
	        if (!object.hasOwnProperty("map")) {
	          throw new Error("Map object should have map property defined.");
	        }
	        if (!(object.map instanceof Array)) {
	          throw new Error("Map property should be an array");
	        }
	      }
	    }
	  });

	  return MapProcessor;
	})();

	module.exports = MapProcessor;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var AbstractPlayer = _interopRequire(__webpack_require__(16));

	var SimplePlayer = (function (_AbstractPlayer) {
	  function SimplePlayer() {
	    _classCallCheck(this, SimplePlayer);

	    if (_AbstractPlayer != null) {
	      _AbstractPlayer.apply(this, arguments);
	    }
	  }

	  _inherits(SimplePlayer, _AbstractPlayer);

	  return SimplePlayer;
	})(AbstractPlayer);

	module.exports = SimplePlayer;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
		"map": [
			"00000000000000000",
			"00000000000000000",
			"00000000000000000",
			"00000000#########",
			"00000000#00000000",
			"00000000#00000000",
			"00000000#00000000",
			"00000000####0####",
			"00000000000000000"
		],
		"placeables": [
			{
				"y": 0,
				"x": 2,
				"objectType": "common",
				"objectName": "PlayerSpawn"
			},
			{
				"y": 8,
				"x": 5,
				"objectType": "furniture",
				"objectName": "Wardrobe"
			},
			{
				"y": 5,
				"x": 6,
				"objectType": "item",
				"objectName": "FirstAidSmall"
			}
		]
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * EventEmitter2
	 * https://github.com/hij1nx/EventEmitter2
	 *
	 * Copyright (c) 2013 hij1nx
	 * Licensed under the MIT license.
	 */
	;!function(undefined) {

	  var isArray = Array.isArray ? Array.isArray : function _isArray(obj) {
	    return Object.prototype.toString.call(obj) === "[object Array]";
	  };
	  var defaultMaxListeners = 10;

	  function init() {
	    this._events = {};
	    if (this._conf) {
	      configure.call(this, this._conf);
	    }
	  }

	  function configure(conf) {
	    if (conf) {

	      this._conf = conf;

	      conf.delimiter && (this.delimiter = conf.delimiter);
	      conf.maxListeners && (this._events.maxListeners = conf.maxListeners);
	      conf.wildcard && (this.wildcard = conf.wildcard);
	      conf.newListener && (this.newListener = conf.newListener);

	      if (this.wildcard) {
	        this.listenerTree = {};
	      }
	    }
	  }

	  function EventEmitter(conf) {
	    this._events = {};
	    this.newListener = false;
	    configure.call(this, conf);
	  }

	  //
	  // Attention, function return type now is array, always !
	  // It has zero elements if no any matches found and one or more
	  // elements (leafs) if there are matches
	  //
	  function searchListenerTree(handlers, type, tree, i) {
	    if (!tree) {
	      return [];
	    }
	    var listeners=[], leaf, len, branch, xTree, xxTree, isolatedBranch, endReached,
	        typeLength = type.length, currentType = type[i], nextType = type[i+1];
	    if (i === typeLength && tree._listeners) {
	      //
	      // If at the end of the event(s) list and the tree has listeners
	      // invoke those listeners.
	      //
	      if (typeof tree._listeners === 'function') {
	        handlers && handlers.push(tree._listeners);
	        return [tree];
	      } else {
	        for (leaf = 0, len = tree._listeners.length; leaf < len; leaf++) {
	          handlers && handlers.push(tree._listeners[leaf]);
	        }
	        return [tree];
	      }
	    }

	    if ((currentType === '*' || currentType === '**') || tree[currentType]) {
	      //
	      // If the event emitted is '*' at this part
	      // or there is a concrete match at this patch
	      //
	      if (currentType === '*') {
	        for (branch in tree) {
	          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
	            listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+1));
	          }
	        }
	        return listeners;
	      } else if(currentType === '**') {
	        endReached = (i+1 === typeLength || (i+2 === typeLength && nextType === '*'));
	        if(endReached && tree._listeners) {
	          // The next element has a _listeners, add it to the handlers.
	          listeners = listeners.concat(searchListenerTree(handlers, type, tree, typeLength));
	        }

	        for (branch in tree) {
	          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
	            if(branch === '*' || branch === '**') {
	              if(tree[branch]._listeners && !endReached) {
	                listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], typeLength));
	              }
	              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
	            } else if(branch === nextType) {
	              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+2));
	            } else {
	              // No match on this one, shift into the tree but not in the type array.
	              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
	            }
	          }
	        }
	        return listeners;
	      }

	      listeners = listeners.concat(searchListenerTree(handlers, type, tree[currentType], i+1));
	    }

	    xTree = tree['*'];
	    if (xTree) {
	      //
	      // If the listener tree will allow any match for this part,
	      // then recursively explore all branches of the tree
	      //
	      searchListenerTree(handlers, type, xTree, i+1);
	    }

	    xxTree = tree['**'];
	    if(xxTree) {
	      if(i < typeLength) {
	        if(xxTree._listeners) {
	          // If we have a listener on a '**', it will catch all, so add its handler.
	          searchListenerTree(handlers, type, xxTree, typeLength);
	        }

	        // Build arrays of matching next branches and others.
	        for(branch in xxTree) {
	          if(branch !== '_listeners' && xxTree.hasOwnProperty(branch)) {
	            if(branch === nextType) {
	              // We know the next element will match, so jump twice.
	              searchListenerTree(handlers, type, xxTree[branch], i+2);
	            } else if(branch === currentType) {
	              // Current node matches, move into the tree.
	              searchListenerTree(handlers, type, xxTree[branch], i+1);
	            } else {
	              isolatedBranch = {};
	              isolatedBranch[branch] = xxTree[branch];
	              searchListenerTree(handlers, type, { '**': isolatedBranch }, i+1);
	            }
	          }
	        }
	      } else if(xxTree._listeners) {
	        // We have reached the end and still on a '**'
	        searchListenerTree(handlers, type, xxTree, typeLength);
	      } else if(xxTree['*'] && xxTree['*']._listeners) {
	        searchListenerTree(handlers, type, xxTree['*'], typeLength);
	      }
	    }

	    return listeners;
	  }

	  function growListenerTree(type, listener) {

	    type = typeof type === 'string' ? type.split(this.delimiter) : type.slice();

	    //
	    // Looks for two consecutive '**', if so, don't add the event at all.
	    //
	    for(var i = 0, len = type.length; i+1 < len; i++) {
	      if(type[i] === '**' && type[i+1] === '**') {
	        return;
	      }
	    }

	    var tree = this.listenerTree;
	    var name = type.shift();

	    while (name) {

	      if (!tree[name]) {
	        tree[name] = {};
	      }

	      tree = tree[name];

	      if (type.length === 0) {

	        if (!tree._listeners) {
	          tree._listeners = listener;
	        }
	        else if(typeof tree._listeners === 'function') {
	          tree._listeners = [tree._listeners, listener];
	        }
	        else if (isArray(tree._listeners)) {

	          tree._listeners.push(listener);

	          if (!tree._listeners.warned) {

	            var m = defaultMaxListeners;

	            if (typeof this._events.maxListeners !== 'undefined') {
	              m = this._events.maxListeners;
	            }

	            if (m > 0 && tree._listeners.length > m) {

	              tree._listeners.warned = true;
	              console.error('(node) warning: possible EventEmitter memory ' +
	                            'leak detected. %d listeners added. ' +
	                            'Use emitter.setMaxListeners() to increase limit.',
	                            tree._listeners.length);
	              console.trace();
	            }
	          }
	        }
	        return true;
	      }
	      name = type.shift();
	    }
	    return true;
	  }

	  // By default EventEmitters will print a warning if more than
	  // 10 listeners are added to it. This is a useful default which
	  // helps finding memory leaks.
	  //
	  // Obviously not all Emitters should be limited to 10. This function allows
	  // that to be increased. Set to zero for unlimited.

	  EventEmitter.prototype.delimiter = '.';

	  EventEmitter.prototype.setMaxListeners = function(n) {
	    this._events || init.call(this);
	    this._events.maxListeners = n;
	    if (!this._conf) this._conf = {};
	    this._conf.maxListeners = n;
	  };

	  EventEmitter.prototype.event = '';

	  EventEmitter.prototype.once = function(event, fn) {
	    this.many(event, 1, fn);
	    return this;
	  };

	  EventEmitter.prototype.many = function(event, ttl, fn) {
	    var self = this;

	    if (typeof fn !== 'function') {
	      throw new Error('many only accepts instances of Function');
	    }

	    function listener() {
	      if (--ttl === 0) {
	        self.off(event, listener);
	      }
	      fn.apply(this, arguments);
	    }

	    listener._origin = fn;

	    this.on(event, listener);

	    return self;
	  };

	  EventEmitter.prototype.emit = function() {

	    this._events || init.call(this);

	    var type = arguments[0];

	    if (type === 'newListener' && !this.newListener) {
	      if (!this._events.newListener) { return false; }
	    }

	    // Loop through the *_all* functions and invoke them.
	    if (this._all) {
	      var l = arguments.length;
	      var args = new Array(l - 1);
	      for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
	      for (i = 0, l = this._all.length; i < l; i++) {
	        this.event = type;
	        this._all[i].apply(this, args);
	      }
	    }

	    // If there is no 'error' event listener then throw.
	    if (type === 'error') {

	      if (!this._all &&
	        !this._events.error &&
	        !(this.wildcard && this.listenerTree.error)) {

	        if (arguments[1] instanceof Error) {
	          throw arguments[1]; // Unhandled 'error' event
	        } else {
	          throw new Error("Uncaught, unspecified 'error' event.");
	        }
	        return false;
	      }
	    }

	    var handler;

	    if(this.wildcard) {
	      handler = [];
	      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
	      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
	    }
	    else {
	      handler = this._events[type];
	    }

	    if (typeof handler === 'function') {
	      this.event = type;
	      if (arguments.length === 1) {
	        handler.call(this);
	      }
	      else if (arguments.length > 1)
	        switch (arguments.length) {
	          case 2:
	            handler.call(this, arguments[1]);
	            break;
	          case 3:
	            handler.call(this, arguments[1], arguments[2]);
	            break;
	          // slower
	          default:
	            var l = arguments.length;
	            var args = new Array(l - 1);
	            for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
	            handler.apply(this, args);
	        }
	      return true;
	    }
	    else if (handler) {
	      var l = arguments.length;
	      var args = new Array(l - 1);
	      for (var i = 1; i < l; i++) args[i - 1] = arguments[i];

	      var listeners = handler.slice();
	      for (var i = 0, l = listeners.length; i < l; i++) {
	        this.event = type;
	        listeners[i].apply(this, args);
	      }
	      return (listeners.length > 0) || !!this._all;
	    }
	    else {
	      return !!this._all;
	    }

	  };

	  EventEmitter.prototype.on = function(type, listener) {

	    if (typeof type === 'function') {
	      this.onAny(type);
	      return this;
	    }

	    if (typeof listener !== 'function') {
	      throw new Error('on only accepts instances of Function');
	    }
	    this._events || init.call(this);

	    // To avoid recursion in the case that type == "newListeners"! Before
	    // adding it to the listeners, first emit "newListeners".
	    this.emit('newListener', type, listener);

	    if(this.wildcard) {
	      growListenerTree.call(this, type, listener);
	      return this;
	    }

	    if (!this._events[type]) {
	      // Optimize the case of one listener. Don't need the extra array object.
	      this._events[type] = listener;
	    }
	    else if(typeof this._events[type] === 'function') {
	      // Adding the second element, need to change to array.
	      this._events[type] = [this._events[type], listener];
	    }
	    else if (isArray(this._events[type])) {
	      // If we've already got an array, just append.
	      this._events[type].push(listener);

	      // Check for listener leak
	      if (!this._events[type].warned) {

	        var m = defaultMaxListeners;

	        if (typeof this._events.maxListeners !== 'undefined') {
	          m = this._events.maxListeners;
	        }

	        if (m > 0 && this._events[type].length > m) {

	          this._events[type].warned = true;
	          console.error('(node) warning: possible EventEmitter memory ' +
	                        'leak detected. %d listeners added. ' +
	                        'Use emitter.setMaxListeners() to increase limit.',
	                        this._events[type].length);
	          console.trace();
	        }
	      }
	    }
	    return this;
	  };

	  EventEmitter.prototype.onAny = function(fn) {

	    if (typeof fn !== 'function') {
	      throw new Error('onAny only accepts instances of Function');
	    }

	    if(!this._all) {
	      this._all = [];
	    }

	    // Add the function to the event listener collection.
	    this._all.push(fn);
	    return this;
	  };

	  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

	  EventEmitter.prototype.off = function(type, listener) {
	    if (typeof listener !== 'function') {
	      throw new Error('removeListener only takes instances of Function');
	    }

	    var handlers,leafs=[];

	    if(this.wildcard) {
	      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
	      leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);
	    }
	    else {
	      // does not use listeners(), so no side effect of creating _events[type]
	      if (!this._events[type]) return this;
	      handlers = this._events[type];
	      leafs.push({_listeners:handlers});
	    }

	    for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
	      var leaf = leafs[iLeaf];
	      handlers = leaf._listeners;
	      if (isArray(handlers)) {

	        var position = -1;

	        for (var i = 0, length = handlers.length; i < length; i++) {
	          if (handlers[i] === listener ||
	            (handlers[i].listener && handlers[i].listener === listener) ||
	            (handlers[i]._origin && handlers[i]._origin === listener)) {
	            position = i;
	            break;
	          }
	        }

	        if (position < 0) {
	          continue;
	        }

	        if(this.wildcard) {
	          leaf._listeners.splice(position, 1);
	        }
	        else {
	          this._events[type].splice(position, 1);
	        }

	        if (handlers.length === 0) {
	          if(this.wildcard) {
	            delete leaf._listeners;
	          }
	          else {
	            delete this._events[type];
	          }
	        }
	        return this;
	      }
	      else if (handlers === listener ||
	        (handlers.listener && handlers.listener === listener) ||
	        (handlers._origin && handlers._origin === listener)) {
	        if(this.wildcard) {
	          delete leaf._listeners;
	        }
	        else {
	          delete this._events[type];
	        }
	      }
	    }

	    return this;
	  };

	  EventEmitter.prototype.offAny = function(fn) {
	    var i = 0, l = 0, fns;
	    if (fn && this._all && this._all.length > 0) {
	      fns = this._all;
	      for(i = 0, l = fns.length; i < l; i++) {
	        if(fn === fns[i]) {
	          fns.splice(i, 1);
	          return this;
	        }
	      }
	    } else {
	      this._all = [];
	    }
	    return this;
	  };

	  EventEmitter.prototype.removeListener = EventEmitter.prototype.off;

	  EventEmitter.prototype.removeAllListeners = function(type) {
	    if (arguments.length === 0) {
	      !this._events || init.call(this);
	      return this;
	    }

	    if(this.wildcard) {
	      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
	      var leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);

	      for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
	        var leaf = leafs[iLeaf];
	        leaf._listeners = null;
	      }
	    }
	    else {
	      if (!this._events[type]) return this;
	      this._events[type] = null;
	    }
	    return this;
	  };

	  EventEmitter.prototype.listeners = function(type) {
	    if(this.wildcard) {
	      var handlers = [];
	      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
	      searchListenerTree.call(this, handlers, ns, this.listenerTree, 0);
	      return handlers;
	    }

	    this._events || init.call(this);

	    if (!this._events[type]) this._events[type] = [];
	    if (!isArray(this._events[type])) {
	      this._events[type] = [this._events[type]];
	    }
	    return this._events[type];
	  };

	  EventEmitter.prototype.listenersAny = function() {

	    if(this._all) {
	      return this._all;
	    }
	    else {
	      return [];
	    }

	  };

	  if (true) {
	     // AMD. Register as an anonymous module.
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return EventEmitter;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    // CommonJS
	    exports.EventEmitter2 = EventEmitter;
	  }
	  else {
	    // Browser global.
	    window.EventEmitter2 = EventEmitter;
	  }
	}();


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var Position = (function () {
	  function Position() {
	    _classCallCheck(this, Position);

	    this.x = 0;
	    this.y = 0;
	    this.z = 0;
	  }

	  _createClass(Position, {
	    setX: {
	      value: function setX(x) {
	        this.x = x;

	        return this;
	      }
	    },
	    setY: {
	      value: function setY(y) {
	        this.y = y;

	        return this;
	      }
	    }
	  });

	  return Position;
	})();

	module.exports = Position;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var AbstractCell = _interopRequire(__webpack_require__(20));

	/**
	 * Cell that used primarily for filling those cell that out of bounds,
	 * in ViewPort
	 */

	var VoidCell = (function (_AbstractCell) {
	  function VoidCell() {
	    _classCallCheck(this, VoidCell);

	    _get(Object.getPrototypeOf(VoidCell.prototype), "constructor", this).call(this);
	    this.obstacle = true;
	    this.string = "#";
	  }

	  _inherits(VoidCell, _AbstractCell);

	  return VoidCell;
	})(AbstractCell);

	module.exports = VoidCell;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var FloorCell = _interopRequire(__webpack_require__(21));

	var WallCell = _interopRequire(__webpack_require__(22));

	var VoidCell = _interopRequire(__webpack_require__(12));

	var CellFactory = (function () {
	  function CellFactory() {
	    _classCallCheck(this, CellFactory);

	    this.availableCells = [new FloorCell(), new WallCell(), new VoidCell()];

	    this.cachedCellsStrings = {};
	  }

	  _createClass(CellFactory, {
	    getCellForString: {
	      value: function getCellForString(string) {
	        var cachedCell = this.getCachedCellForString(string);
	        if (cachedCell) {
	          return new cachedCell.constructor();
	        }

	        for (var i = 0, size = this.availableCells.length; i < size; i++) {
	          var cell = this.availableCells[i];
	          if (string === cell.toString()) {
	            this.setCachedCellForString(string, cell);
	            return new cell.constructor();
	          }
	        }

	        throw new Error("Cell for string '" + string + "' not found.");
	      }
	    },
	    getCachedCellForString: {
	      value: function getCachedCellForString(string) {
	        return typeof this.cachedCellsStrings[string] === "undefined" ? undefined : Object.create(this.cachedCellsStrings[string]);
	      }
	    },
	    setCachedCellForString: {
	      value: function setCachedCellForString(string, cell) {
	        this.cachedCellsStrings[string] = cell;
	      }
	    }
	  });

	  return CellFactory;
	})();

	module.exports = CellFactory;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var Map = (function () {
	  function Map() {
	    _classCallCheck(this, Map);

	    this.map = undefined;

	    this.playerSpawnPositions = [];
	  }

	  _createClass(Map, {
	    setMap: {
	      value: function setMap(map) {
	        this.map = map;
	      }
	    },
	    getAsArray: {
	      value: function getAsArray() {
	        return this.map;
	      }
	    },
	    getCellFromPosition: {
	      value: function getCellFromPosition(position) {
	        if (typeof this.map[position.y] === "undefined") {
	          return undefined;
	        } else {
	          return this.map[position.y][position.x];
	        }
	      }
	    },
	    isPositionOutOfBounds: {
	      value: function isPositionOutOfBounds(position) {
	        if (typeof this.map[position.y] === "undefined") {
	          return true;
	        } else if (typeof this.map[position.y][position.x] === "undefined") {
	          return true;
	        } else {
	          return false;
	        }
	      }
	    },
	    putCreatureInPosition: {
	      value: function putCreatureInPosition(creature, position) {
	        this.map[position.y][position.x].putCreature(creature);
	      }
	    },
	    removeCreatureFromPosition: {
	      value: function removeCreatureFromPosition(position) {
	        this.map[position.y][position.x].removeCreature();
	      }
	    },
	    isThereAnObstacleInPosition: {
	      value: function isThereAnObstacleInPosition(position) {
	        return this.map[position.y][position.x].isObstacle();
	      }
	    },
	    addPlayerSpawnPosition: {
	      value: function addPlayerSpawnPosition(position) {
	        this.playerSpawnPositions.push(position);
	      }
	    },
	    getRandomPlayerSpawnPosition: {
	      value: function getRandomPlayerSpawnPosition() {
	        if (this.playerSpawnPositions.length !== 0) {
	          return this.playerSpawnPositions[Math.floor(Math.random() * this.playerSpawnPositions.length)];
	        } else {
	          throw new Error("There are no player spawn positions in this map!");
	        }
	      }
	    }
	  });

	  return Map;
	})();

	module.exports = Map;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var DefaultRenderPack = (function () {
	  function DefaultRenderPack() {
	    _classCallCheck(this, DefaultRenderPack);

	    this.settings = {
	      "0": {
	        view: "f",
	        color: "green"
	      },
	      w: {
	        view: "_",
	        color: "blue"
	      }
	    };
	  }

	  _createClass(DefaultRenderPack, {
	    isThereSettingsForCell: {
	      value: function isThereSettingsForCell(cell) {
	        return typeof this.settings[cell.toString()] !== "undefined";
	      }
	    },
	    getSettings: {
	      value: function getSettings() {
	        return this.settings;
	      }
	    },
	    getSettingsForCell: {
	      value: function getSettingsForCell(cell) {
	        return this.settings[cell.toString()];
	      }
	    }
	  });

	  return DefaultRenderPack;
	})();

	module.exports = DefaultRenderPack;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var Position = _interopRequire(__webpack_require__(11));

	var EventEmitter2 = _interopRequire(__webpack_require__(10));

	var AbstractPlayer = (function () {
	  function AbstractPlayer() {
	    _classCallCheck(this, AbstractPlayer);

	    this.position = new Position();

	    this.string = "P";
	    this.color = "#000000";
	    this.events = new EventEmitter2();
	  }

	  _createClass(AbstractPlayer, {
	    move: {
	      value: function move(direction) {
	        var newPosition = new Position();
	        newPosition.x = this.position.x;
	        newPosition.y = this.position.y;

	        switch (direction) {
	          case AbstractPlayer.MOVE_UP:
	            {
	              newPosition.y -= 1;
	              break;
	            }
	          case AbstractPlayer.MOVE_DOWN:
	            {
	              newPosition.y += 1;
	              break;
	            }
	          case AbstractPlayer.MOVE_LEFT:
	            {
	              newPosition.x -= 1;
	              break;
	            }
	          case AbstractPlayer.MOVE_RIGHT:
	            {
	              newPosition.x += 1;
	              break;
	            }
	        }

	        this.events.emit("move", { oldPosition: this.position, newPosition: newPosition });
	      }
	    },
	    setPosition: {
	      value: function setPosition(position) {
	        this.position = position;
	      }
	    },
	    toString: {
	      value: function toString() {
	        return this.string;
	      }
	    },
	    getColor: {
	      value: function getColor() {
	        return this.color;
	      }
	    }
	  });

	  return AbstractPlayer;
	})();

	AbstractPlayer.MOVE_UP = 0;
	AbstractPlayer.MOVE_DOWN = 1;
	AbstractPlayer.MOVE_LEFT = 2;
	AbstractPlayer.MOVE_RIGHT = 3;

	module.exports = AbstractPlayer;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var AbstractFurniture = _interopRequire(__webpack_require__(23));

	var Wardrobe = (function (_AbstractFurniture) {
	  function Wardrobe() {
	    _classCallCheck(this, Wardrobe);

	    _get(Object.getPrototypeOf(Wardrobe.prototype), "constructor", this).call(this);
	    this.string = "w";
	    this.objectName = "wardrobe";
	    this.color = "#f4a460";
	  }

	  _inherits(Wardrobe, _AbstractFurniture);

	  return Wardrobe;
	})(AbstractFurniture);

	var Chair = (function (_AbstractFurniture2) {
	  function Chair() {
	    _classCallCheck(this, Chair);

	    _get(Object.getPrototypeOf(Chair.prototype), "constructor", this).call(this);
	    this.string = "c";
	    this.objectName = "chair";
	  }

	  _inherits(Chair, _AbstractFurniture2);

	  return Chair;
	})(AbstractFurniture);

	var Table = (function (_AbstractFurniture3) {
	  function Table() {
	    _classCallCheck(this, Table);

	    _get(Object.getPrototypeOf(Table.prototype), "constructor", this).call(this);
	    this.string = "t";
	    this.objectName = "table";
	  }

	  _inherits(Table, _AbstractFurniture3);

	  return Table;
	})(AbstractFurniture);

	module.exports = {
	  Wardrobe: Wardrobe,
	  Chair: Chair,
	  Table: Table
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var AbstractItem = _interopRequire(__webpack_require__(24));

	var FirstAid = (function (_AbstractItem) {
	  function FirstAid() {
	    _classCallCheck(this, FirstAid);

	    _get(Object.getPrototypeOf(FirstAid.prototype), "constructor", this).call(this);

	    this.string = "+";
	    this.color = "red";
	    this.health = 30;
	    this.objectName = "FirstAid";
	  }

	  _inherits(FirstAid, _AbstractItem);

	  return FirstAid;
	})(AbstractItem);

	var FirstAidSmall = (function (_FirstAid) {
	  function FirstAidSmall() {
	    _classCallCheck(this, FirstAidSmall);

	    _get(Object.getPrototypeOf(FirstAidSmall.prototype), "constructor", this).call(this);

	    this.health = 15;
	    this.objectName = "FirstAidSmall";
	  }

	  _inherits(FirstAidSmall, _FirstAid);

	  return FirstAidSmall;
	})(FirstAid);

	module.exports = {
	  FirstAid: FirstAid,
	  FirstAidSmall: FirstAidSmall
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var AbstractPlaceable = _interopRequire(__webpack_require__(25));

	var PlayerSpawn = exports.PlayerSpawn = (function (_AbstractPlaceable) {
	  function PlayerSpawn() {
	    _classCallCheck(this, PlayerSpawn);

	    this.objectName = "PlayerSpawn";

	    this.renderable = false;
	  }

	  _inherits(PlayerSpawn, _AbstractPlaceable);

	  return PlayerSpawn;
	})(AbstractPlaceable);

	exports["default"] = {
	  PlayerSpawn: PlayerSpawn
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var AbstractCell = (function () {
	  function AbstractCell() {
	    _classCallCheck(this, AbstractCell);

	    this.string = undefined;
	    this.obstacle = false;
	    this.creature = undefined;
	    this.color = "#000000";
	    this.contains = [];

	    this.containsString = undefined;
	  }

	  _createClass(AbstractCell, {
	    toString: {
	      value: function toString() {
	        if (this.isCreatureInside()) {
	          return this.creature.toString();
	        }

	        if (typeof this.containsString !== "undefined") {
	          return this.containsString;
	        }

	        if (this.contains.length !== 0) {
	          var i = 0;

	          while (i < this.contains.length) {
	            if (this.contains[i].isRenderable()) {
	              return this.contains[i].toString();
	            }
	            i++;
	          }
	        }

	        return this.string;
	      }
	    },
	    getColor: {
	      value: function getColor() {
	        if (this.isCreatureInside()) {
	          return this.creature.getColor();
	        }
	        return this.color;
	      }
	    },
	    isObstacle: {
	      value: function isObstacle() {
	        return this.obstacle;
	      }
	    },
	    putCreature: {
	      value: function putCreature(creature) {
	        this.creature = creature;
	      }
	    },
	    removeCreature: {
	      value: function removeCreature() {
	        this.creature = undefined;
	      }
	    },
	    isCreatureInside: {
	      value: function isCreatureInside() {
	        return typeof this.creature !== "undefined";
	      }
	    },
	    contain: {
	      value: function contain(object) {
	        if (object.isObstacle()) {
	          this.obstacle = true;
	        }

	        if (typeof object.getColor() !== "undefined") {
	          this.color = object.getColor();
	        }

	        if (object.isRenderable()) {
	          this.containsString = object.string;
	        }
	        this.contains.push(object);
	      }
	    }
	  });

	  return AbstractCell;
	})();

	module.exports = AbstractCell;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var AbstractCell = _interopRequire(__webpack_require__(20));

	var FloorCell = (function (_AbstractCell) {
	  function FloorCell() {
	    _classCallCheck(this, FloorCell);

	    _get(Object.getPrototypeOf(FloorCell.prototype), "constructor", this).call(this);
	    this.string = "0";
	    this.color = "#d3d3d3";
	  }

	  _inherits(FloorCell, _AbstractCell);

	  return FloorCell;
	})(AbstractCell);

	module.exports = FloorCell;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var AbstractCell = __webpack_require__(20);

	var WallCell = (function (_AbstractCell) {
	  function WallCell() {
	    _classCallCheck(this, WallCell);

	    _get(Object.getPrototypeOf(WallCell.prototype), "constructor", this).call(this);
	    this.string = "w";
	    this.obstacle = true;
	  }

	  _inherits(WallCell, _AbstractCell);

	  return WallCell;
	})(AbstractCell);

	module.exports = WallCell;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var AbstractObstacle = _interopRequire(__webpack_require__(26));

	var AbstractFurniture = (function (_AbstractObstacle) {
	  function AbstractFurniture() {
	    _classCallCheck(this, AbstractFurniture);

	    _get(Object.getPrototypeOf(AbstractFurniture.prototype), "constructor", this).call(this);
	    this.color = "#9f622f";
	    this.name = "Wardrobe";
	    this.objectType = "furniture";
	    this.objectName = undefined;

	    this.renderable = true;
	  }

	  _inherits(AbstractFurniture, _AbstractObstacle);

	  return AbstractFurniture;
	})(AbstractObstacle);

	module.exports = AbstractFurniture;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var AbstractPlaceable = _interopRequire(__webpack_require__(25));

	var AbstractItem = (function (_AbstractPlaceable) {
	  function AbstractItem() {
	    _classCallCheck(this, AbstractItem);

	    _get(Object.getPrototypeOf(AbstractItem.prototype), "constructor", this).call(this);

	    this.objectType = "takeable";
	    this.renderable = true;
	  }

	  _inherits(AbstractItem, _AbstractPlaceable);

	  return AbstractItem;
	})(AbstractPlaceable);

	module.exports = AbstractItem;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var AbstractPlaceable = (function () {
	  function AbstractPlaceable() {
	    _classCallCheck(this, AbstractPlaceable);

	    this.string = undefined;
	    this.color = "#000000";
	    this.obstacle = false;

	    this.renderable = false;
	  }

	  _createClass(AbstractPlaceable, {
	    toString: {
	      value: function toString() {
	        return this.string;
	      }
	    },
	    isRenderable: {
	      value: function isRenderable() {
	        return this.renderable;
	      }
	    },
	    isObstacle: {
	      value: function isObstacle() {
	        return this.obstacle;
	      }
	    },
	    getColor: {
	      value: function getColor() {
	        return this.color;
	      }
	    }
	  });

	  return AbstractPlaceable;
	})();

	module.exports = AbstractPlaceable;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var AbstractPlaceable = _interopRequire(__webpack_require__(25));

	var AbstractObstacle = (function (_AbstractPlaceable) {
	  function AbstractObstacle() {
	    _classCallCheck(this, AbstractObstacle);

	    _get(Object.getPrototypeOf(AbstractObstacle.prototype), "constructor", this).call(this);

	    this.obstacle = true;
	  }

	  _inherits(AbstractObstacle, _AbstractPlaceable);

	  return AbstractObstacle;
	})(AbstractPlaceable);

	module.exports = AbstractObstacle;

/***/ }
/******/ ]);