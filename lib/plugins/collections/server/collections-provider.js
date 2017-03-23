'use strict';

const is = require('is');

const Collection = require('./collection');

class CollectionsProviderError extends Error {
	get name() { return 'CollectionsProviderError'; }
}


module.exports = class CollectionsProvider {

	constructor(server, proxyProvider) {
		this.server = server;
		this.proxyProvider = proxyProvider;
		this._collections = {};
	}


	getSet(name, proxy, config) {

		// set
		if(proxy && config) {

			if(this._collections.hasOwnProperty(name)) {
				throw new CollectionsProviderError(`Collection '${name}' already defined.`);
			}

			if(is.string(proxy)) {
				proxy = this.proxyProvider.getSet(proxy);
			}

			return (this._collections[name] = this.initCollectionFromConfig(name, config, proxy));

		// get
		} else {

			if(this._collections.hasOwnProperty(name)) {
				return this._collections[name];
			} else {
				throw new CollectionsProviderError(`Collection '${name}' not found.`);
			}

		}

	}

	initCollectionFromConfig(name, config, proxy) {
		let coll = new Collection(name, this.server, config, proxy);


		return coll;
	}

};


module.exports.CollectionsProviderError = CollectionsProviderError;
