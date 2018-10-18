'use strict';

const ElroDevice = require('../../lib/ElroDevice');

// To extend from another class change the line below to
// module.exports = RFDevice => class AB440SCDevice extends MyGenericDevice(RFDevice) {
// and define MyGenericDevice like so
// module.exports = RFDevice => class MyGenericDevice extends RFDevice {
module.exports = RFDevice => class AB440SCDevice extends ElroDevice(RFDevice) {};
