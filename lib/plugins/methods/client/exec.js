'use strict';

const uuid = require('uuid/v4')

module.exports = function(responses, pluginOptions) {

	return function execServerMethod(method, payload, options) {

		// Default request options
		let DEFAULT_OPTIONS = {
			timeout: pluginOptions.execTimeout
		};

		// extend DEFAULT_OPTIONS with given options
		options = Object.assign(DEFAULT_OPTIONS, options);

		// create unique identifier
		let rid = uuid();

		// send request
		this.send('method', { rid, method, payload });

		// Chain returns promise which resolves with result of executed server method
		// or MethodTimeoutError
		// or MethodResponseError (if server method throws/rejects error)
		return responses

			// filter responses by rid
			.filter(e => e.rid === rid)

			// dispose after first message
			.first()

			// timeout after options.timeout with MethodTimeoutError
			.timeout(options.timeout, new this.errors.MethodTimeoutError('Timeout has occurred.'))

			// transform to promise
			.toPromise()

			// handle response
			.then(res => {

				// if res has error attribute transform it to MethodResponseError and reject promise
				if(res.error) {
					let err = this.errors.MethodResponseError.fromJSON(res.error);
					return Promise.reject(err);
				}

				// ... otherise resolve with payload (method result)
				return res.payload;
			});

	};

}
