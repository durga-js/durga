'use strict';

const EventsProvider = require('./events-provider.js');

module.exports = function(server) {


	const eventsProvider = new EventsProvider(server);

	// add decorator namespace for handler.method.ctx
	// will be called on method prehandler
	server.decorator.addNamespace('event.ctx');

	// register decorator to add payload to ctx
	server.decorate('event.ctx', 'payload', (ctx) => ctx.event.payload)

	// register preHandler hook which executes ctx-decorator
	.hook('preHandler', 0, (ctx) => {
		if(ctx.handler.type === eventsProvider.TYPE) {
			server.decorator.run('event.ctx', ctx, [ctx]);
		}
	})

	// decorate server with method: event()
	.decorate('server', 'event', () => eventsProvider.getSet.bind(eventsProvider))

	// Register matcher and composer on protocolProvider
	.protocol
		.registerMatcher(event => {
			if(event.type === 'event' && event.event) {
				return eventsProvider.get(event.event);
			}
		})
		.registerComposer('event', ({ event, payload }) => ({
			type: 'event',
			event,
			payload
		}));



};
