'use strict';

const DefaultDriver = require('../../../drivers/lib/driver');

module.exports = class Elro extends DefaultDriver {
	constructor(config) {
		super(config);
		this.on('frame', this.updateState.bind(this));
		this.on('new_state', this.updateRealtime.bind(this));
		this.on('new_pairing_device', device => this.updateState(device.data));
	}

	dipswitchesToData(dipswitches) {
		const data = {
			address: dipswitches.slice(0, 5).map(Number).join(''),
			unit: dipswitches.slice(5, 10).map(Number).join(''),
			state: 0,
		};
		data.id = `${data.address}:${data.unit}`;
		return data;
	}

	payloadToData(payload) { // Convert received data to usable variables
		if (payload.length === 12 && payload[10] !== payload[11]) {
			const data = {
				address: this.bitArrayToString(payload.slice(0, 5)),
				unit: this.bitArrayToString(payload.slice(5, 10)),
				state: payload[10],
			};
			data.id = `${data.address}:${data.unit}`;
			return data;
		}
		return null;
	}

	dataToPayload(data) {
		if (
			data &&
			data.address && data.address.length === 5 &&
			data.unit && data.unit.length === 5 &&
			typeof data.state !== 'undefined'
		) {
			const address = this.bitStringToBitArray(data.address);
			const unit = this.bitStringToBitArray(data.unit);
			return address.concat(unit, Number(data.state), Number(data.state) ? 0 : 1);
		}
		return null;
	}

	updateState(frame) {
		this.setState(frame.id, Object.assign({}, this.getState(frame.id), frame));
	}

	updateRealtime(device, state, oldState) {
		if (Boolean(Number(state.state)) !== Boolean(Number(oldState.state))) {
			this.realtime(device, 'onoff', Boolean(Number(state.state)));
		}
	}

	getExports() {
		const exports = super.getExports();
		exports.capabilities = exports.capabilities || {};
		exports.capabilities.onoff = {
			get: (device, callback) => callback(null, Boolean(Number(this.getState(device).state))),
			set: (device, state, callback) => this.send(device, { state: state ? 1 : 0 }, () => callback(null, state)),
		};
		return exports;
	}
};
