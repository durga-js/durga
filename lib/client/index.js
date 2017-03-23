'use strict';

const rx = require('rx');
// const Subscription = require('./sub');


// let debug = (() => true);
// if(process.env.NODE_ENV !== 'production') {
// 	 debug = function() { console.log("%c[DURGA]", 'color:#C11C59', ...arguments ); };
// }


const Decorator = require('../misc/decorator');
const Protocol = require('../misc/protocol');
const Errors = require('../misc/errors');


const KNWON_DECORATOR_NS = ['client', 'client.errors'];


const defaultPlugins = {
	events: require('../plugins/events/client'),
	methods: require('../plugins/methods/client'),
	topics: require('../plugins/topics/client'),
	collections: require('../plugins/collections/client'),
	rooms: require('../plugins/rooms/client'),
}


class DurgaClient {

	constructor({ transporter }) {

		this.decorator = new Decorator({
			ns: KNWON_DECORATOR_NS
		});

		this.protocol = new Protocol();
		this.errors = new Errors();

		// Register default plugins
		Object.keys(defaultPlugins).forEach(key => {
			let plugin = defaultPlugins[key];
			this.use(plugin, {});
		});

		if(transporter) {
			transporter.init(this);
		}

		// this.connected = false;

		// this._options = options;

		// this._activeSubscriptions = [];
		// this._sendCache = [];

		// this._tx = new rx.Subject();
		// this._rx = new rx.Subject();

		// this._rx.subscribe(e => debug('RECV', e));

		// this.collection = this._rx.filter(e => e.type === 'collection');
		// this.events = this._rx.filter(e => e.type === 'event');
		// this._execs = this._rx.filter(e => e.type === 'exec');
	}


	log(tags, data) {
		console.log(tags, data);
	}


	/**
	 * Registers a plugin
	 * @param  {Function} plugin plugin installer function
	 * @param  {Object} options plugin config
	 * @return {void}
	 */
	use(plugin, options) {
		plugin(this, options);
	}



	/**
	 * Registers a decorator
	 * @param  {String} ns  one of KNWON_DECORATOR_NS
	 * @param  {String} key attribute name
	 * @param  {Object} val value of key
	 * @return {void}
	 */
	decorate(ns, key, val) {
		if(ns === 'client') {
			this.decorator._decorate('client', this, key, val, [this]);
		} else {
			this.decorator.register(ns, key, val);
		}
	}


	listen(listener) {
		this._send = listener;
	}


	dispatch(event) {
		let handler = this.protocol.match(event);

		if(!handler) {
			this.log(['error', 'dispatch'], { event });
			return Promise.reject(new Error('Handler not found'));
		}

		return handler(event);
	}

	sendRaw(e) {
		this._send(e);
	}

	send(composerName, attrs) {
		let msg = this.protocol.compose(composerName, attrs);
		return this.sendRaw(msg);
	}



	// _send(e) {
	// 	if(this.connected) {
	// 		debug('SEND', e);
	// 		this._tx.onNext(e);
	// 	} else {
	// 		this._sendCache.push(e);
	// 	}
	// }




	// _replayActiveSubscriptions() {
	// 	this._activeSubscriptions.forEach(sub => sub._connect());
	// }



	// subscribe(topic, payload, cb) {
	// 	return new Subscription(this, topic, payload, cb);
	// }




	// exec(method, payload) {

	// 	let execId = String(Date.now());

	// 	this._send({
	// 		type: 'exec',
	// 		exec: method,
	// 		execId,
	// 		payload: payload
	// 	});

	// 	return this._execs
	// 		.filter(e => e.execId === execId && e.exec === method)
	// 		.first()
	// 		.toPromise()
	// 		.then(e => e.payload);

	// }

	// emit(topic, payload) {
	// 	this._send({
	// 		type: 'event',
	// 		event: topic,
	// 		payload: payload
	// 	});
	// }




	// get vuex() {
	// 	return {
	// 		collectionMutations: (store, topic, storeModule, stateAttr) => {

	// 			this.collection.filter(e => e.collection === topic)
	// 				.subscribe(e => {
	// 					if(store._mutations[storeModule + '/$'+e.cmd] !== undefined) {
	// 						store.commit(storeModule+'/$'+e.cmd, e);
	// 					}
	// 				});


	// 			return {
	// 				$add: (state, e) => {
	// 					let coll = state[stateAttr];
	// 					let item = coll.find(item => item.id === e.payload.id);

	// 					if(!item) {
	// 						coll.push(e.payload);
	// 					} else {
	// 						Object.assign(item, e.payload);
	// 					}
	// 				},

	// 				$update: (state, e) => {
	// 					let coll = state[stateAttr];
	// 					let item = coll.find(item => item.id === e.payload.id);

	// 					if(!item) {
	// 						coll.push(e.payload);
	// 					} else {
	// 						Object.assign(item, e.payload);
	// 					}
	// 				},

	// 				$delete: (state, e) => {
	// 					let coll = state[stateAttr];
	// 					let existing = coll.find(i => i.id === e.payload.id);

	// 					let index = state.collection.indexOf(existing);

	// 					if(index !== -1) {
	// 						state.collection.splice(index, 1);
	// 					}
	// 				}
	// 			};

	// 		}
	// 	};
	// }




	// _processSendCache() {
	// 	if(this._sendCache.length) {
	// 		let currentCache = this._sendCache.concat();
	// 		this._sendCache = [];
	// 		currentCache.forEach(e => this._send(e));
	// 	}
	// }




	// _transportConnected() {
	// 	debug('Connected');
	// 	this.connected = true;

	// 	return this._processSendCache();
	// }




	// _transportDisconnected() {
	// 	debug('Disconnected');
	// 	this.connected = false;
	// }




	// _transportReconnected() {
	// 	debug('Reconnected');
	// 	this.connected = true;

	// 	return this._replayActiveSubscriptions();
	// }



	// connect(ctxExt) {
	// 	if(this._options.connect) {

	// 		let ctx = Object.assign({
	// 			listener: this._tx,
	// 			dispatch: (data) => this._rx.onNext(data),
	// 			reconnect: () => this._transportReconnected(),
	// 			connected: () => this._transportConnected(),
	// 			disconnected: () => this._transportDisconnected()
	// 		}, ctxExt)

	// 		this._options.connect(ctx);
	// 	} else {
	// 		throw new Error('Durga: Missing connector');
	// 	}
	// }

}


module.exports = DurgaClient;



