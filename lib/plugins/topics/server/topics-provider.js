'use strict';

const HandlerProvider = require('../../../misc/handler-provider');
const Boom = require('boom');

const HANDLER_TYPE = 'topic';


class TopicsHandlerProviderError extends Error {

  /* istanbul ignore next */
	get name() { return 'TopicsHandlerProviderError'; }
}

/**
 * TopicsHandlerProvider
 * @type {TopicsHandlerProvider}
 */
module.exports = class TopicsHandlerProvider extends HandlerProvider {

	constructor(server) {
		super({
			TYPE: HANDLER_TYPE,
			Error: TopicsHandlerProviderError
		});

		this.server = server;
	}


	getErrorHandler(event, error) {
		return this._createHandler(() => Promise.reject(error));
	}


	_createHandler(config) {

		return this.server.createHandler(this.TYPE, config, (err, ctx, handler) => {

			// reply handler
			const reply = (payload) => {

				let e = {
					rid: ctx.event.rid,
					topic: ctx.event.topic
				};

				if(payload instanceof Error) {

					payload = payload.isBoom ? payload : Boom.wrap(payload);

					e.error = payload.output.payload; // transform error object
				} else {
					e.payload = payload;
				}

				return ctx.connection.send('topic:ready', e);
			};


			// if error is set something went wront in preHandlers
			// @examples: unauthenticated, missing scope, etc
			if(err) {
				reply(err);
				throw err;
			}

			// Wrap handler execution into promise to ensure catching implementation errors.
			// Dispatcher will log them on server level ...
			return new Promise(resolve => {
				resolve(handler(ctx));
			})
			.then(() => {
				return ctx.topic._getReadyPayload();
			})
			.then(

				// reply to client
				res => reply(res),

				// important to throw error after reply that it bubbles up to dispatcher (logging)
				err => {
					reply(err);
					throw err;
				}

			);

		});

	}

};

module.exports.TopicsHandlerProviderError = TopicsHandlerProviderError;
