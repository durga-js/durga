'use strict';


const path = require('path');
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

	_createHandler(config) {

		return this.server.createHandler(this.TYPE, config, (err, ctx, handler) => {

			if(err) {
				return console.log(err);
			}

			return Promise.resolve(handler(ctx))
			// .catch(err => console.log(err));

		});

	}

};
