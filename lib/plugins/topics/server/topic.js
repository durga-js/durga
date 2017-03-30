'use strict';

const Hooks = require('../../../misc/hooks');
const rx = require('rx');
const debug = require('debug')('Durga:topics:topic');

module.exports = class TopicInstance {

	constructor(ctx, pool) {

		this.name = ctx.event.topic;
		this.ctx = ctx;
		this.id = ctx.connection.id + ctx.event.rid;
		this.hooks = new Hooks();
		this.pool = pool;
		this.connection = ctx.connection;

		this.pool[this.id] = this;
		this.ctx.connection.hook('destroy', () => this.dispose());

	}


	/**
	 * Disposes subscription to topic
	 * @return {Promise} resolves when ready
	 */
	dispose() {
		return this.hooks.run('dispose', this)
			.then(() => {
				delete this.pool[this.id];
			})
			.then(() => {
				if(this.connection.isConnected) {
					this.ctx.connection.send('topic:disposed', {
						topic: this.name,
						rid: this.ctx.event.rid
					});
				}
				debug(`DISPOSED: ${this.id}`);
			});
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



	observe(observable) {

    /* istanbul ignore else */
		if(observable instanceof Promise) {

			this.hook('reply', (ctx) => observable.then(cb => cb(ctx)));

		}

    /* istanbul ignore else */
    if (observable instanceof rx.Observable) {

			let sub = observable.subscribe(cb => cb(this.ctx));

			this.hook('dispose', () => sub.dispose());

		}

	}


	/**
	 * [replySub description]
	 * @return {[type]} [description]
	 */
	_getReadyPayload() {
		return this.hooks.run('reply', [])
			.then(res => {
				debug(`SUB ${this.connection.id} subscribed to '${this.name}'\nID: ${this.id}`);
				return res;
			})
			.then(dispatches => ({ dispatches: [].concat(...dispatches) }));
	}

};
