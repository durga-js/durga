'use strict';

const HandlerProvider = require('../../../misc/handler-provider');
const debug = require('debug')('Durga:methods:method');


const HANDLER_TYPE = 'method';


class MethodsProviderError extends Error {
	get name() { return 'MethodsProviderError'; }
}

/**
 * MethodsHandlerProvider
 * @type {MethodsHandlerProvider}
 */
module.exports = class MethodsHandlerProvider extends HandlerProvider {

	constructor(server) {
		super({
			TYPE: HANDLER_TYPE,
			Error: MethodsProviderError
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
					method: ctx.event.method
				};

				if(payload instanceof Error) {
					e.error = this.server.errors.MethodResponseError.fromError(payload).toJSON(); // transform error object
					//ctx.connection.log(['error', 'method', 'response'], payload);
				} else {
					e.payload = payload;
				}

				ctx.connection.send('methodReply', e);

				return e;
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
				debug(`EXEC ${ctx.event.method} with payload ${JSON.stringify(ctx.event.payload)}`);
				resolve(handler(ctx));
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

module.exports.MethodsProviderError = MethodsProviderError;
