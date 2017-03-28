'use strict';


const uuid = require('uuid/v4');
const EventEmitter = require('events');


module.exports = class TopicSubscription extends EventEmitter {

  constructor(client, responses, topic, payload) {
    super();

    this.client = client;
    this.topic = topic;
    this.payload = payload;
    this.id = uuid();
    this.responsesObservable = responses;

    this.isReady = false;
    this.isDisposed = false;

    this.ready = null;
  }

  _responsePromise(type, timeout) {

    return this.responsesObservable

      // filter responses by rid
      .filter(e => e.rid === this.id)

      // dispose after first message
      .first()

      // timeout after options.timeout with TopicTimeoutError
      .timeout(timeout || 30000, new this.client.errors.TopicTimeoutError(`Timeout has occurred while waiting for ${type}: ${this.topic}`))

      // transform to promise
      .toPromise();
  }




  connect(options) {

    options = options || {};

    this.client.send('topic:sub', { rid: this.id, topic: this.topic, payload: this.payload });

    // Chain returns promise which resolves with result of executed server method
    // or TopicTimeoutError
    // or TopicResponseError (if server method throws/rejects error)
    return this.ready = this._responsePromise('topic:ready', options.timeout)

      // handle response
      .then(res => {

        // if res has error attribute transform it to TopicResponseError and reject promise
        if(res.error) {
          let err = this.client.errors.TopicResponseError.fromJSON(res.error);
          throw err;
        }

        this.isReady = true;
        this.emit('ready');

        if(res.payload.dispatches) {
          let p = res.payload.dispatches.map(event => this.client.dispatch(event));
          return Promise.all(p).then(() => {
            delete res.payload.dispatches;
            return res.payload;
          });
        }

        return res.payload;
      });

  }






  dispose(options) {
    options = options || {};

    this.client.send('topic:dispose', { rid: this.id, topic: this.topic });

    return this._responsePromise('topic:disposed', options.timeout)

		.then(res => {

			// if res has error attribute transform it to TopicResponseError and reject promise
			if(res.error) {
				let err = this.client.errors.TopicResponseError.fromJSON(res.error);
				throw err;
			}

			this.isDisposed = true;
      this.emit('disposed');

			return res;

		});


  }

};
