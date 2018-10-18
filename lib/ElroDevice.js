'use strict';

const util = require('homey-rfdriver').util;

// To extend from another class change the line below to
// module.exports = RFDevice => class ElroDevice extends MyGenericDevice(RFDevice)
// and define MyGenericDevice like so
// module.exports = RFDevice => class MyGenericDevice extends RFDevice

module.exports = RFDevice => class ElroDevice extends RFDevice {
  onRFInit() {
    super.onRFInit();

    this.clearFromEmptySendObject = ['onoff'];
  }

  static dipswitchesToData(dipswitches) {
    const data = {
      address: dipswitches.slice(0, 5).map(Number).join(''),
      unit: dipswitches.slice(5, 10).map(Number).join(''),
      onoff: false,
      state: 0,
    };
    data.id = `${data.address}:${data.unit}`;
    return data;
  }

  static payloadToData(payload) { // Convert received data to usable variables
    if (payload.length === 12 && payload[10] !== payload[11]) {
      const data = {
        address: util.bitArrayToString(payload.slice(0, 5)),
        unit: util.bitArrayToString(payload.slice(5, 10)),
        onoff: Boolean(payload[10]),
        state: payload[10],
      };
      data.id = `${data.address}:${data.unit}`;
      return data;
    }
    return null;
  }

  static dataToPayload(data) {
    if (
      data &&
      data.address && data.address.length === 5 &&
      data.unit && data.unit.length === 5 &&
      (
        typeof data.state !== 'undefined' ||
        typeof data.onoff !== 'undefined'
      )
    ) {
      const address = util.bitStringToBitArray(data.address);
      const unit = util.bitStringToBitArray(data.unit);
      const state = typeof data.onoff !== 'undefined' ? data.onoff : data.state;
      return address.concat(unit, Number(state), Number(state) ? 0 : 1);
    }
    return null;
  }

  static generateData() {
    const address = util.generateRandomBitString(5);
    const unit = util.generateRandomBitString(5);

    return {
      address,
      unit,
      state: 0,
      onoff: false,
      id: `${address}:${unit}`,
    };
  }
};
