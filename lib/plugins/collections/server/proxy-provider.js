'use strict';


const CollectionProxy = require('./proxy');

class CollectionsProxyProviderError extends Error {
	get name() { return 'CollectionsProxyProviderError'; }
}




module.exports = class CollectionsProxyProvider {

	constructor() {
		this._proxies = {};
	}

	getSet(name, config) {

		// get
		if(!config) {


			if(this._proxies.hasOwnProperty(name)) {
				return this._proxies[name];
			} else {
				throw new CollectionsProxyProviderError(`Proxy '${name}' not found.`);
			}


		// set
		} else {

			if(this._proxies.hasOwnProperty(name)) {
				throw new CollectionsProxyProviderError(`Proxy '${name}' already defined.`);
			}

			return (this._proxies[name] = this.initProxyFromConfig(name, config));

		}

	}

	initProxyFromConfig(name, config) {
		return new CollectionProxy(name, config);
	}

};


module.exports.CollectionsProxyProviderError = CollectionsProxyProviderError;
