'use strict';

const EventEmitter = require('events');

module.exports = function(client) {

	let rx = new EventEmitter();

	client.decorate('client', 'emit', () => function(event, payload) {
		this.send('event', { event, payload });
	});


	client.decorate('client', 'event', () => function(event, handler) {
		rx.on(event, payload => handler({ payload }));
	});


	client.protocol
		.registerMatcher(event => {
			if(event.type === 'event' && event.event) {
				return () => rx.emit(event.event, event.payload);
			}
		})
		.registerComposer('event', ({ event, payload }) => ({
			type: 'event',
			event,
			payload
		}));

};
