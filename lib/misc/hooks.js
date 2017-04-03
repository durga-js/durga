'use strict';


const DEFAULT_PRIORITY = 1000;

module.exports = class Hooks {

	constructor() {
		this._hooks = {};
	}

	_expectHooksByName(name) {
		return this._hooks.hasOwnProperty(name) ? this._hooks[name] : (this._hooks[name] = []);
	}

	register(name, priority, hook) {

		if(!hook) {
			hook = priority;
			priority = 1000;
		}

		let hooks = this._expectHooksByName(name);
		hooks.push({
			priority,
			hook
		});
		hooks.sort((a, b) => a.priority - b.priority);
		return this;
	}

	run(name, ctx, irgnoreErrors) {
		let hooks = this._expectHooksByName(name).map(i => i.hook);
		return hooks.reduce((p, hook) => p.then(() => {

			if(irgnoreErrors) {
				return new Promise(resolve => resolve(hook(ctx)))
				.catch(err => false);
			}

			return hook(ctx);
		}), Promise.resolve()).then(() => ctx);
	}

};

module.exports.DEFAULT_PRIORITY = DEFAULT_PRIORITY;
