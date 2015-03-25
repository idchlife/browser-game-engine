import AbstractPlayer from '../creature/player/AbstractPlayer.js'

class WASDControls {
  constructor(player) {
    this.player = player;

    this.KEY_CODE_UP = 87;
    this.KEY_CODE_DOWN = 83;
    this.KEY_CODE_LEFT = 65;
    this.KEY_CODE_RIGHT = 68;

    this.initKeyListeners();
  }

  initKeyListeners() {
    document.body.onkeydown = function(event) {
      switch(parseInt(event.keyCode)) {
        case (this.KEY_CODE_UP): {
          this.player.move(AbstractPlayer.MOVE_UP);
          break;
        }
        case (this.KEY_CODE_DOWN): {
          this.player.move(AbstractPlayer.MOVE_DOWN);
          break;
        }
        case (this.KEY_CODE_LEFT): {
          this.player.move(AbstractPlayer.MOVE_LEFT);
          break;
        }
        case (this.KEY_CODE_RIGHT): {
          this.player.move(AbstractPlayer.MOVE_RIGHT);
          break;
        }
      }
    }.bind(this)
  }
}

export default WASDControls