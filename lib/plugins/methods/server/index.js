'use strict';

const MethodsProvider = require('./methods-provider');

const errors = require('../errors');


module.exports = function(server) {

	// init MethodsProvider
	let methods = new MethodsProvider(server);

	// add decorator namespace for handler.method.ctx
	// will be called on method prehandler
	server.decorator.addNamespace('method.ctx');


	// register decorator to add payload to ctx
	server.decorate('method.ctx', 'payload', (ctx) => ctx.event.payload)


	// register preHandler-hook to extend ctx of method handlers with payload attribute
	.hook('preHandler', 0, (ctx) => {

		if(ctx.handler.type === methods.TYPE) {
			server.decorator.run('method.ctx', ctx, [ctx]);
		}

	})

	// decorate server with getter/setter method: method(name, config) / method(name)
	.decorate('server', 'method', () => methods.getSet.bind(methods))

	// register errors used in this plugin
	.errors
		.$register(errors);


	// extend protocol
	server.protocol
		.registerMatcher(event => {
			if(event.type === 'method' && event.method && event.rid) {
				try {
					return methods.get(event.method);
				} catch(e) {
					return methods.getErrorHandler(event, e);
				}
			}
		})
		.registerComposer('methodReply', ({ method, rid, payload, error }) => ({
			type: 'method',
			method,
			rid,
			error: error || false,
			payload
		}));

};
