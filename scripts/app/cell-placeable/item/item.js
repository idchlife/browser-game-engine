import AbstractItem from './AbstractItem.js'

class FirstAid extends AbstractItem {
  constructor() {
    super();

    this.string = '+';
    this.color = 'red';
    this.health = 30;
    this.objectName = 'FirstAid';
  }
}

class FirstAidSmall extends FirstAid {
  constructor() {
    super();

    this.health = 15;
    this.objectName = 'FirstAidSmall'
  }
}

export default {
  'FirstAid': FirstAid,
  'FirstAidSmall': FirstAidSmall
}