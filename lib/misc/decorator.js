'use strict';


class DecoratorError extends Error {
	get name() { return 'DecoratorError'; }
}

module.exports = class Decorator {

	static get DecoratorError() { return DecoratorError; }

	constructor({ ns }) {
		this._decorators = {};
		this._ns = [].concat(ns || []);
	}

	_hasNamespace(ns) {
		return this._ns.indexOf(ns) !== -1;
	}

	addNamespace(ns) {
		if(!this._hasNamespace(ns)) {
			this._ns.push(ns);
		} else {
			throw new DecoratorError(`Namespace '${ns}' already exists`);
		}
	}

	_getNsDecorators(ns) {
		return this._decorators.hasOwnProperty(ns) ? this._decorators[ns] : (this._decorators[ns] = []);
	}

	_decorate(ns, target, key, factory, args) {

		try {
			this.decorateTarget(target, key, factory, args);
		} catch(e) {
			throw new DecoratorError(`'${ns}' cant be decorated. Property '${key}' already exists.`);
		}

	}

	decorateTarget(target, key, factory, args) {
		if(!target[key]) {
			target[key] = factory.apply(target, args);
		} else {
			throw new DecoratorError(`Can't decorate target. Property '${key}' already exists.`);
		}
	}

	register(ns, key, factory) {
		if(!this._hasNamespace(ns)) {
			throw new DecoratorError(`Namespace '${ns}' not allowed`);
		}

		this._getNsDecorators(ns)
			.push((target, args) => this._decorate(ns, target, key, factory, args));
	}

	run(ns, target, args) {
		if(!this._hasNamespace(ns)) {
			throw new DecoratorError(`Namespace '${ns}' not allowed`);
		}
		this._getNsDecorators(ns).forEach(d => d(target, args));
	}

};
