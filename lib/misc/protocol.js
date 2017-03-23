'use strict';


class ProtocolError extends Error {
	get name() { return 'ProtocolError'; }
}


module.exports = class Protocol {

	constructor() {
		this._matchers = [];
		this._composers = {};
	}

	match(event) {
		let handler;
		this._matchers.find(m => (handler = m(event)));
		return handler;
	}

	compose(name, payload) {
		if(!this._composers.hasOwnProperty(name)) {
			throw new ProtocolError(`Composer '${name}' not found.`)
		}
		return this._composers[name](payload);
	}

	registerMatcher(m) {
		this._matchers.push(m);
		return this;
	}

	registerComposer(name, composer) {
		if(this._composers.hasOwnProperty(name)) {
			throw new ProtocolError(`Composer '${name}' already registered.`);
		}
		this._composers[name] = composer;
		return this;
	}

};


module.exports.ProtocolError = ProtocolError;
