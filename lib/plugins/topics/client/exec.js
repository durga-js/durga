'use strict';

const uuid = require('uuid/v4');
const TopicSubscription = require('./sub');
const debug = require('debug')('Durga:plugin:topics');

module.exports = function(client, responses, pluginOptions) {

	let activeSubs = [];

	// reconnect active subs
	client.on('reconnect', () => {
		debug('Reconnecting active topics');
		activeSubs.forEach(sub => sub.connect());
	});



	return function subscribeServerTopic(topic, payload, options) {

		let tsub = new TopicSubscription(client, responses, topic, payload);

		// Default request options
		let DEFAULT_OPTIONS = {
			timeout: pluginOptions.execTimeout
		};

		// extend DEFAULT_OPTIONS with given options
		options = Object.assign(DEFAULT_OPTIONS, options);

		// connect to topic
		tsub.connect(options);

		activeSubs.push(tsub);

		tsub.on('disposed', () => {
			let index = activeSubs.indexOf(tsub);
			if(index !== -1) {
				activeSubs.splice(index, 1);
			}
		});

		return tsub;

	};

};
