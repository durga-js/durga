'use strict';

const Decorator = require('../misc/decorator');
const Protocol = require('../misc/protocol');
const Errors = require('../misc/errors');
const EventEmitter = require('events');
const debug = require('debug')('Durga');


// Default plugins
const PLUGINS = {
	events: require('../plugins/events/client'),
	methods: require('../plugins/methods/client'),
	topics: require('../plugins/topics/client'),
	collections: require('../plugins/collections/client'),
	rooms: require('../plugins/rooms/client'),
};


class DurgaClient extends EventEmitter {



	/**
	 * Constructor
	 * @param  {Object} options.transporter transporter with init()-method
	 * @return {Object}                     self
	 */
	constructor({ transporter }) {
		super();
		let oEmit = this.emit;
		this.trigger = oEmit;
		this.emit = undefined;

		this.decorator = new Decorator({
			ns: ['client']
		});

		this.protocol = new Protocol();
		this.errors = new Errors();

		// Register default plugins
		Object.keys(PLUGINS).forEach(key => {
			let plugin = PLUGINS[key];
			this.use(plugin, {});
		});

		if (transporter) {
			transporter.init(this);
		}

	}



	/**
	 * Registers a plugin
	 * @param  {Function} plugin plugin installer function
	 * @param  {Object} options plugin config
	 * @return {void}
	 */
	use(plugin, options) {
		plugin(this, options || {});
	}



	/**
	 * Registers a decorator
	 * @param  {String} ns  one of KNWON_DECORATOR_NS
	 * @param  {String} key attribute name
	 * @param  {Object} val value of key
	 * @return {void}
	 */
	decorate(ns, key, val) {
		if (ns === 'client') {
			this.decorator._decorate('client', this, key, val, [this]);
		} else {
			this.decorator.register(ns, key, val);
		}
		return this;
	}



	/**
	 * Register a listen-handler
	 * @param  {Function} listener will be executed when sending events to server
	 * @return {Object}          self
	 */
	listen(listener) {
		this._send = listener;
		return this;
	}



	/**
	 * Dispatches an event from server
	 * @param  {Object} event
	 * @return {Promise}       always resolves(!) with object { success:[Boolean], error:[true|Error]
	 */
	dispatch(event) {

		debug('Dispatch', event);

		// chrome.extension.sendMessage({

		// }, function(message){
		// 	console.log(message);
		// });

		//console.log('DISPATCH', event);
		let handler = this.protocol.match(event);

		return new Promise(resolve => {
				if (!handler) {
					throw new Error('Handler not found');
				}
				resolve(handler(event));
			})
			.then(
				() => ({
					success: true,
					error: false
				}),
				error => ({
					success: false,
					error
				})
			);
	}



	/**
	 * Sends an event to server
	 * @param  {Object} e event
	 * @return {Object}   self
	 */
	sendRaw(e) {
		debug('Send', e);

		if (!this.hasOwnProperty('_send')) {
			throw new Error('Can\'t send without listener.');
		}

		this._send(e);

		return this;
	}



	/**
	 * Composes an event based on given protocol-disposer-name and options
	 * @param  {String} composerName name of protocol-disposer
	 * @param  {Object} options      composer options
	 * @return {Object}              result of sendRaw (self)
	 */
	send(composerName, options) {
		let msg = this.protocol.compose(composerName, options);
		return this.sendRaw(msg);
	}


}


module.exports = DurgaClient;
