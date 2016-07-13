'use strict';

const Elro = require('./elro');

module.exports = class Remote extends Elro {
	payloadToData(payload) { // Convert received data to usable variables
		const data = super.payloadToData(payload);
		if (!data) return data;

		data.id = data.address;
		return data;
	}
};
