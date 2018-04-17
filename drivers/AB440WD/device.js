'use strict';

const Homey = require('homey');
const util = require('homey-rfdriver').util;

const ElroDevice = require('../../lib/ElroDevice');

// To extend from another class change the line below to
// module.exports = RFDevice => class AB440WDDevice extends MyGenericDevice(RFDevice) {
// and define MyGenericDevice like so
// module.exports = RFDevice => class MyGenericDevice extends RFDevice {
module.exports = RFDevice => class AB440WDDevice extends ElroDevice(RFDevice) {
};
