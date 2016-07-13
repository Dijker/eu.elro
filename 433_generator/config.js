'use strict';
const fs = require('fs');
const path = require('path');

module.exports = {
	deviceClasses: {
		elro_dipswitch: {
			driver: './drivers/elro_dip/elro.js',
			signal: {
				sof: [],
				eof: [300],
				words: [
					[300, 980, 950, 350], // 0
					[300, 980, 300, 980], // 1
				],
				interval: 9940,
				repetitions: 20,
				sensitivity: 0.7,
				minimalLength: 12,
				maximalLength: 12,
			},
		},
		dipswitch_remote: {
			extends: ['generic_remote', 'elro_dipswitch'],
			driver: './drivers/elro_dip/remote',
			triggers: [
				{
					id: 'received',
					title: '433_generator.generic.button_pressed',
					args: [
						{
							name: 'unit',
							type: 'dropdown',
							values: [
								{ id: '10000', label: '433_generator.generic.buttons.A' },
								{ id: '01000', label: '433_generator.generic.buttons.B' },
								{ id: '00100', label: '433_generator.generic.buttons.C' },
								{ id: '00010', label: '433_generator.generic.buttons.D' },
							],
						},
						{
							name: 'state',
							type: 'dropdown',
							values: [
								{ id: '1', label: '433_generator.generic.on' },
								{ id: '0', label: '433_generator.generic.off' },
							],
						},
					],
				},
			],
		},
		dipswitch_socket: {
			extends: ['generic_dipswitch_socket', 'elro_dipswitch'],
			pair: {
				viewOptions: {
					generic_choice: {
						buttons: [{
							name: 'deviceClasses.generic_dipswitch_socket.views.generic_choice.buttons.generic_imitate',
							view: 'generic_imitate',
							svg: fs.readFileSync(path.join(__dirname, './assets/AB440R/icon.svg')).toString(),
						}, {
							name: 'deviceClasses.generic_dipswitch_socket.views.generic_choice.buttons.generic_dipswitch',
							view: 'generic_info',
							svg: fs.readFileSync(path.join(__dirname, './assets/AB440SC/dipswitches.svg')).toString(),
						}],
					},
					generic_dipswitch: {
						dipswitchList: [1, 2, 3, 4, 5, 'A', 'B', 'C', 'D', 'E'],
					},
				},
			},
		},
	},
	devices: {
		AB440R: {
			extends: 'dipswitch_remote',
			name: 'devices.AB440R.name',
			icon: './assets/AB440R/remote.svg',
			images: {
				small: './assets/AB440R/images/small.jpg',
				large: './assets/AB440R/images/large.jpg',
			},
			pair: {
				viewOptions: {
					generic_imitate: {
						svg: './assets/AB440R/remote_pair.svg',
					},
					generic_test_remote: {
						svg: './assets/AB440R/remote.svg',
					},
				},
			},
		},
		AB440WD: {
			extends: 'dipswitch_socket',
			name: 'devices.AB440WD.name',
			icon: './assets/AB440WD/icon.svg',
			images: {
				small: './assets/AB440WD/images/small.jpg',
				large: './assets/AB440WD/images/large.jpg',
			},
			pair: {
				viewOptions: {
					generic_info: {
						svg: './assets/AB440SC/dipswitches.svg',
					},
					generic_imitate: {
						svg: './assets/AB440R/remote_pair.svg',
					},
				},
			},
		},
		AB440SC: {
			extends: 'dipswitch_socket',
			name: 'devices.AB440SC.name',
			icon: './assets/AB440SC/icon.svg',
			images: {
				small: './assets/AB440SC/images/small.jpg',
				large: './assets/AB440SC/images/large.jpg',
			},
			pair: {
				viewOptions: {
					generic_info: {
						svg: './assets/AB440SC/dipswitches.svg',
					},
					generic_imitate: {
						svg: './assets/AB440R/remote_pair.svg',
					},
				},
			},
		},
	},
};
