'use strict';

const ElroDevice = require('../../lib/ElroDevice');

// To extend from another class change the line below to
// module.exports = RFDevice => class AB440RDevice extends MyGenericDevice(RFDevice) {
// and define MyGenericDevice like so
// module.exports = RFDevice => class MyGenericDevice extends RFDevice {
module.exports = RFDevice => class AB440RDevice extends ElroDevice(RFDevice) {
  static payloadToData(payload) { // Convert received data to usable variables
    const data = super.payloadToData(payload);
    if (!data) return data;

    data.id = data.address;
    return data;
  }
};
