'use strict';

const is = require('is');

class ErrorProviderError extends Error {
  /* istanbul ignore next */
	get name() { return 'ErrorProviderError'; }
}



module.exports = class ErrorProvider {

	$register(name, ErrorClass) {

		if(is.object(name)) {
			let errors = name;
			return Object.keys(errors).forEach(k => this.$register(k, errors[k]));
		}

		if(this.hasOwnProperty(name)) {
			throw new ErrorProviderError(`Error '${name}' already exists.`);
		}

		Object.defineProperty(this, name, {
			get() {
				return ErrorClass;
			}
		});
	}

};
