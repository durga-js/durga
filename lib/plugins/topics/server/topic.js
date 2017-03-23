'use strict';

const Hooks = require('../../../misc/hooks');
const rx = require('rx');

module.exports = class TopicInstance {

	constructor(ctx, pool) {

		this.name = ctx.event.topic;
		this.ctx = ctx;
		this.id = ctx.connection.id + ctx.event.rid;
		this.hooks = new Hooks();
		this.pool = pool;

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
				this.ctx.connection.send('topic:disposed', {
					topic: this.name,
					rid: this.ctx.event.rid
				})
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

		if(observable instanceof Promise) {

			this.hook('reply', (ctx) => observable.then(res => ctx.push(res)))

		} else if (observable instanceof rx.Observable) {

			let sub = observable.subscribe(sender => sender(this.ctx));

			this.hook('dispose', topic => {
				sub.dispose();
			});

		}

	}


	/**
	 * [replySub description]
	 * @return {[type]} [description]
	 */
	_getReadyPayload() {
		return this.hooks.run('reply', [])
		.then(res =>  Object.assign({}, ...res));
	}

}
