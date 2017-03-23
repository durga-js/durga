'use strict';

const TopicsHandlerProvider = require('./topics-provider');
const Topic = require('./topic');


const errors = require('../errors');


module.exports = function(server) {

	// init TopicsHandlerProvider
	let topicsHandlers = new TopicsHandlerProvider(server);

	// holds active Topic instances of subscribed clients
	let activeTopicsProvider = {};

	// add decorator namespace for handler.topic.ctx
	// will be called on topic prehandler
	server.decorator.addNamespace('topic.ctx');

	// decorate topic.ctx with event payload
	server.decorate('topic.ctx', 'payload', (ctx) => ctx.event.payload);

	// decorate topic.ctx with topic instance
	server.decorate('topic.ctx', 'topic', (ctx) => new Topic(ctx, activeTopicsProvider));
	server.decorate('topic.ctx', 'observe', (ctx) => ctx.topic.observe.bind(ctx.topic));

	// register errors used in this plugin
	server.errors
		.$register(errors);

	// decorate server with getter/setter method: method(name, config) / method(name)
	server.decorate('server', 'topic', () => topicsHandlers.getSet.bind(topicsHandlers));

	// extend protocol
	server.protocol
		.registerMatcher(event => {
			if(event.type === 'topic:sub' && event.topic && event.rid) {
				try {
					return topicsHandlers.get(event.topic);
				} catch(e) {
					return topicsHandlers.getErrorHandler(event, e);
				}
			} else if(event.type === 'topic:dispose' && event.topic && event.rid) {

				return ({ connection, event }) => {
					let topicId = connection.id + event.rid;

					let topic = activeTopicsProvider[topicId];

					if(!topic) {
						let err = new Error('Subscription not found');
						connection.send('topic:disposed', {
							topic: event.topic,
							rid: event.rid,
							error: {
								msg: err.message
							}
						});
						throw err;
					}
					return topic.dispose();
				};

			}
		})
		.registerComposer('topic:ready', ({ topic, rid, payload, error }) => ({
			type: 'topic:ready',
			topic,
			rid,
			error,
			payload
		}))
		.registerComposer('topic:disposed', ({ topic, rid, error }) => ({
			type: 'topic:disposed',
			topic,
			rid,
			error
		}));


	//register preHandler-hook to extend ctx of method handlers with payload attribute
	server.hook('preHandler', 0, (ctx) => {

		if(ctx.handler.type === topicsHandlers.TYPE) {
			server.decorator.run('topic.ctx', ctx, [ctx]);
		}

	});

};
