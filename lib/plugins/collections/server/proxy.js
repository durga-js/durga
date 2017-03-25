'use strict';

const is = require('is');
const rx = require('rx');

class CollectionProxyError extends Error {
	get name() { return 'CollectionProxyError'; }
};


function createNotImplementedError(name, method) {
	return new CollectionProxyError(`Proxy '${name}' has no implementation for method: ${method}()`);
}

module.exports = class CollectionProxy {

	constructor(name, config) {
		this.name = name;

		this.config = config;
	}

	get(coll, id) {
		if(!is.fn(this.config.get)) {
			throw createNotImplementedError(this.name, 'get');
		}

		return new Promise(resolve => resolve(this.config.get(coll, id)));
	}

	query(coll, q) {
		if(!is.fn(this.config.query)) {
			throw createNotImplementedError(this.name, 'query');
		}

		return new Promise(resolve => resolve(this.config.query(coll, q)));
	}

	queryOne(coll, q) {

		if(!is.fn(this.config.queryOne)) {
			throw createNotImplementedError(this.name, 'queryOne');
		}

		return new Promise(resolve => resolve(this.config.queryOne(coll, q)));
	}

	queryChanges(coll, q, emit) {

		if(!is.fn(this.config.queryChanges)) {
			throw createNotImplementedError(this.name, 'queryChanges');
		}


		let queryObservable = rx.Observable.create((observer) => {

			let emit = {
				added: (id, model) => observer.onNext({ type: 'added', id, model }),
				updated: (id, model, cleans) => observer.onNext({ type: 'updated', id, model, cleans }),
				destroyed: (id) => observer.onNext({ type: 'destroyed', id })
			};

			return this.config.queryChanges(coll, q, emit);

		})
		.share();

		return queryObservable;
	}

	create(coll, q) {
		if(!is.fn(this.config.create)) {
			throw createNotImplementedError(this.name, 'create');
		}
		return new Promise(resolve => resolve(this.config.create(coll, q)));
	}

	update(coll, id, attrs, cleans) {
		if(!is.fn(this.config.update)) {
			throw createNotImplementedError(this.name, 'update');
		}
		return new Promise(resolve => resolve(this.config.update(...arguments)));
	}

	destroy(coll, q) {
		if(!is.fn(this.config.destroy)) {
			throw createNotImplementedError(this.name, 'destroy');
		}
		return new Promise(resolve => resolve(this.config.destroy(coll, q)));
	}

};



module.exports.CollectionProxyError = CollectionProxyError;
