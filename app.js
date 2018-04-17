'use strict';

const Homey = require('homey');

module.exports = class extends Homey.App {
  onInit() {
    this.log('Elro is running...');
  }
};
