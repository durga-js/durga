'use strict';


class HandlerProviderError extends Error {
	get name() { return 'HandlerProviderError'; }
}


module.exports = class HandlerProvider {

	static get HandlerProviderError() { return HandlerProviderError; }

	constructor(options) {

		this._store = {};
		this.Error = options.Error || HandlerProviderError;

		if(!options.TYPE) {
			throw new this.Error('Missing TYPE in options.');
		}

		this.TYPE = options.TYPE;

		if(!this._createHandler) {
			throw new this.Error(`Method '_createHandler(handlerConfig)' not implemented`);
		}
	}

	getSet(key, config) {

		// set
		if(config) {
			if(this._store.hasOwnProperty(key)) {
				throw new this.Error(`${this.TYPE} '${key}' already defined`);
			}

			return (this._store[key] = this._createHandler(config));

		// get
		} else {
			if(this._store.hasOwnProperty(key)) {
				return this._store[key];
			} else {
				throw new this.Error(`${this.TYPE} '${key}' not found`);
			}
		}

	}

	get(key) {
		return this.getSet(key);
	}

	set(key, config) {
		if(!config) {
			throw new this.Error(`Missing config for ${this.TYPE}-handler '${key}'`);
		}

		return this.getSet(key, config);
	}

};
