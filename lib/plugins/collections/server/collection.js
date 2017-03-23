'use strict';

const is = require('is');

module.exports = class Collection {

	constructor(name, server, config, proxy) {
		this.config = config;
		this.proxy = proxy;
		this.name = name;
		this.server = server;

		if(this.config.registerMethods) {

			[
				'create',
				'get',
				'update',
				'destroy'
			]
			.filter(i => this.config.registerMethods.hasOwnProperty(i))
			.filter(i => this.config.registerMethods[i] !== false)
			.forEach(method => {

				let conf = this.config.registerMethods[method];

				if(is.true(conf)) {
					this.server.method(`$collection:${this.name}:${method}`, ({ collection, payload }) => {
						if(method === 'update') {
							return collection(this.name)[method](payload.id, payload.attrs, payload.cleans);
						} else if(method === 'get') {
							return collection(this.name)[method](payload.id);
						} else {
							return collection(this.name)[method](payload);
						}
					});
				} else {
					this.server.method(`$collection:${this.name}:${method}`, conf);
				}

			});

		}
	}

	get(id) {
		return this.proxy.get(this, id);
	}

	query(q) {
		return this.proxy.query(this, q);
	}

	queryOne(q) {
		return this.proxy.queryOne(this, q);
	}

	queryChanges(q) {
		return this.proxy.queryChanges(this, q);
	}

	create(q) {
		return this.proxy.create(this, q);
	}

	update(id, attrs, cleans) {
		return this.proxy.update(this, ...arguments);
	}

	destroy(q) {
		return this.proxy.destroy(this, q);
	}

};
