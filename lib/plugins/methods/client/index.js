'use strict';

const rx = require('rx');
const errors = require('../errors');
const createExecServerMethod = require('./exec');


// Default plugin config
const DEFAULT_CONFIG = {
	execTimeout: 1000 * 30 // 30 seconds
};


module.exports = function MethodsClientPlugin(client, pluginOptions) {

	// extend default config
	pluginOptions = Object.assign({}, DEFAULT_CONFIG, pluginOptions);


	// handles method events from dispatcher
	const responses = new rx.Subject();


	// register errors used in this plugin
	client.errors
		.$register(errors);


	// extend protocol
	client.protocol
		.registerMatcher(event => {
			if(event.type === 'method' && event.method && event.rid) {
				return () => responses.onNext(event);
			}
		})
		.registerComposer('method', ({ rid, method, payload }) => ({
			type: 'method',
			rid,
			method,
			payload
		}));


	// decorate client with exec method
	client.decorate('client', 'exec', () => createExecServerMethod(responses, pluginOptions));

};
