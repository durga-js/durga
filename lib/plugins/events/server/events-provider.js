'use strict';


const HandlerProvider = require('../../../misc/handler-provider');


class EventsProviderError extends Error {
	get name() { return 'EventsProviderError'; }
}

const HANDLER_TYPE = 'event';

module.exports = class EventsProvider extends HandlerProvider {

	constructor(server) {

		super({
			TYPE: HANDLER_TYPE,
			Error: EventsProviderError
		});

		this.server = server;
	}

	getErrorHandler(event, error) {
		return this._createHandler(() => Promise.reject(error));
	}

	_createHandler(config) {

		return this.server.createHandler(this.TYPE, config, (err, ctx, handler) => {

			if(err) {
				throw err;
			}

			return new Promise(resolve => {
				resolve(handler(ctx));
			});

		});

	}

};


module.exports.EventsProviderError = EventsProviderError;
