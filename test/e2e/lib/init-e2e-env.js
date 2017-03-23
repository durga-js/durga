'use strict';

const path = require('path');
const Durga = require(path.resolve('lib'));
const EventEmitter = require('events');

const transporter = require('./test-transporter');



module.exports = function init() {

	let bridge = new EventEmitter();

	const server = new Durga.Server({
		transporter: new transporter.Server(bridge)
	});

	const client = new Durga.Client({
		transporter: new transporter.Client(bridge)
	});




	return {
		server,
		client
	};
};
