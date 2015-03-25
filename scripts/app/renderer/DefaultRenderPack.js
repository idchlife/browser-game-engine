class DefaultRenderPack {
  constructor() {
    this.settings = {
      '0': {
        view: 'f',
        color: 'green'
      },
      'w': {
        view: '_',
        color: 'blue'
      }
    }
  }

  isThereSettingsForCell(cell) {
    return typeof this.settings[cell.toString()] !== 'undefined';
  }

  getSettings() {
    return this.settings;
  }

  getSettingsForCell(cell) {
    return this.settings[cell.toString()];
  }
}

export default DefaultRenderPack