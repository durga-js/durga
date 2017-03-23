'use strict';

const uuid = require('uuid/v4');

module.exports = function(responses, pluginOptions) {

	let ready = responses
		.filter(e => e.type === 'topic:ready');


	let disposed = responses
		.filter(e => e.type === 'topic:disposed');


	return function subscribeServerTopic(topic, payload, options, cb) {

		// Default request options
		let DEFAULT_OPTIONS = {
			timeout: pluginOptions.execTimeout
		};

		// extend DEFAULT_OPTIONS with given options
		options = Object.assign(DEFAULT_OPTIONS, options);

		// create unique identifier
		let rid = uuid();

		let isReady = false;
		let isDisposed = false;

		const res2promise = (observable, timeoutErrorMessage) => {
			return observable

				// filter responses by rid
				.filter(e => e.rid === rid)

				// dispose after first message
				.first()

				// timeout after options.timeout with TopicTimeoutError
				.timeout(options.timeout, new this.errors.TopicTimeoutError(timeoutErrorMessage))

				// transform to promise
				.toPromise();
		};



		// send request
		this.send('topic:sub', { rid, topic, payload });

		// Chain returns promise which resolves with result of executed server method
		// or TopicTimeoutError
		// or TopicResponseError (if server method throws/rejects error)
		let readyPromise = res2promise(ready, 'Timeout has occurred for topic:sub: '+topic)

			// handle response
			.then(res => {

				// if res has error attribute transform it to TopicResponseError and reject promise
				if(res.error) {
					let err = this.errors.TopicResponseError.fromJSON(res.error);
					throw err;
				}

				isReady = true;

				return res.payload;
			});




		let client = this;

		return new (class Subscription {

			get ready() { return readyPromise; }
			get isReady() { return isReady; }
			get id() { return rid; }
			get isDisposed() { return isDisposed; }

			dispose() {
				client.send('topic:dispose', { rid, topic });

				return res2promise(disposed, 'Timeout has occurred for topic:dispose: '+topic)

					// handle response
					.then(res => {

						// if res has error attribute transform it to TopicResponseError and reject promise
						if(res.error) {
							let err = client.errors.TopicResponseError.fromJSON(res.error);
							throw err;
						}

						isDisposed = true;

						return res;

					});

			}
		});

	};

};
