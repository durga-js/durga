'use strict';

const CollectionInterface = require('./collection');


module.exports = class CollectionsProvider {

	constructor(client, observable) {
		this.client = client;
		this.observable = observable;

		this._collections = {};
	}

	get(name) {

		if(this._collections.hasOwnProperty(name)) {
			return this._collections[name];
		} else {

			return (this._collections[name] = this._initCollection(name));

		}

	}

	_initCollection(name) {
		return new CollectionInterface(name, this.client, this.observable);
	}

};
