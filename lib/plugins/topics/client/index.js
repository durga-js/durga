'use strict';

const rx = require('rx');
const errors = require('../errors');
const createSubscribeTopicMethod = require('./exec');


// Default plugin config
const DEFAULT_CONFIG = {
	execTimeout: 1000 * 30 // 30 seconds
};


module.exports = function TopicsClientPlugin(client, pluginOptions) {

	// extend default config
	pluginOptions = Object.assign({}, DEFAULT_CONFIG, pluginOptions);


	// handles topic events from dispatcher
	const responses = new rx.Subject();



	// register errors used in this plugin
	client.errors
		.$register(errors);


	// extend protocol
	client.protocol
		.registerMatcher(event => {
			if(event.type === 'topic:ready' && event.topic && event.rid) {
				return () => responses.onNext(event);
			} else if(event.type === 'topic:disposed' && event.topic && event.rid) {
				return () => responses.onNext(event);
			}
		})
		.registerComposer('topic:sub', ({ rid, topic, payload }) => ({
			type: 'topic:sub',
			rid,
			topic,
			payload
		}))
		.registerComposer('topic:dispose', ({ rid, topic }) => ({
			type: 'topic:dispose',
			rid,
			topic
		}));


	// decorate client with subscribe method
	client.decorate('client', 'subscribe', (client) => createSubscribeTopicMethod(client, responses, pluginOptions));


};
