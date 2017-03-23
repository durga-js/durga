'use strict';

const debug = require('debug')('Durga:connection');
const debugVerbose = require('debug')('verbose:Durga:connection');
const UUID = require('uuid/v1');
const Hooks = require('../misc/hooks');

module.exports = class DurgaConnection {

	constructor(server) {
		debug('CREATE');

		this.server = server;
		this.id = UUID();
		this.hooks = new Hooks();
	}

	log(tags, data) {
		this.server.log(['connection', ...tags], data);
		return this;
	}

	destroy() {
		debug('DESTROY');
		return this.hooks.run('destroy');
	}

	/**
	 * Registers a hook
	 * @param  {String} name 		namespace
	 * @param  {Function} hook 	hook-handler
	 * @return {Object}      		self
	 */
	hook(name, priority, hook) {
		this.hooks.register(name, priority, hook);
		return this;
	}

	listen(handler) {
		this._listener = function() {
			debugVerbose('Send', ...arguments);
			handler(...arguments);
		};
	}



	sendRaw(e) {
		if(!this._listener) {
			throw new Error('Listener not attached');
		}
		this._listener(e);
	}

	send(composerName, attrs) {
		let msg = this.server.protocol.compose(composerName, attrs);
		return this.sendRaw(msg);
	}


	dispatch(event) {
		let handler = this.server.protocol.match(event);

		if(!handler) {
			//this.log(['error', 'dispatch'], { event });
			return Promise.reject(new Error('Handler not found'));
		}

		let promise = this.server.runHandler(handler, this, event);

		// do not log errors during testing to detect implementation errors
		// Should we log them in production or
		if(process.env.NODE_ENV !== 'test') {
			promise = promise
				// catch any error from handler execution and log them
				.catch(err => {
					this.log(['error', 'implementation'], err);
				});
		}

		return promise;
	}

};
