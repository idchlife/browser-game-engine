import DefaultRenderPack from './DefaultRenderPack.js'

class Renderer {
  constructor() {
    this.elementForRender = undefined;
    this.pack = undefined;
  }

  getCellSettings(cell, type) {
    if (typeof this.pack === 'undefined') {
      if (type === 'color') {
        return cell.getColor();
      } else if (type === 'view') {
        return cell.toString();
      }
    }

    if (type === 'color') {
      if (this.pack.isThereSettingsForCell(cell)) {
        return this.pack.getSettingsForCell(cell).color
      } else {
        return cell.getColor();
      }
    }
    if (type === 'view') {
      if (this.pack.isThereSettingsForCell(cell)) {
        return this.pack.getSettingsForCell(cell).view
      } else {
        return cell.toString();
      }
    }
  }

  setElementForRender(element) {
    this.elementForRender = element;
    return this;
  }

  renderCellsArray(cellsArray) {
    var html = '';
    html += '<table>';
    for (var y = 0; y < cellsArray.length; y++) {
      html += '<tr>';
      for (var x = 0; x < cellsArray[y].length; x++) {
        html += '<td style="height: 15px; width: 15px; color: ' +
        this.getCellSettings(cellsArray[y][x], 'color') + '">';
        html += this.getCellSettings(cellsArray[y][x], 'view');
        html += '</td>'
      }
      html += '</tr>';
    }
    this.elementForRender.innerHTML = html;
  }
}

export default Renderer