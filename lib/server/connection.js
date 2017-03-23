'use strict';

const debug = require('debug')('Durga:connection');
const debugVerbose = require('debug')('verbose:Durga:connection');
const UUID = require('uuid/v1');
const Hooks = require('../misc/hooks');

module.exports = class DurgaConnection {



	/**
	 * Constructor
	 * @param  {Object} server instance of server
	 * @return {Object}        self
	 */
	constructor(server) {
		debug('CREATE');

		this.server = server;
		this.id = UUID();
		this.hooks = new Hooks();
		this.isConnected = false;
	}




	/**
	 * Logs with tag connection
	 * @param  {Array} tags		log tags
	 * @param  {Any} data			data to be logged
	 * @return {Object}      	self
	 */
	log(tags, data) {
		this.server.log(['connection', ...tags], data);
		return this;
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




	/**
	 * Register a listen-handler
	 * @param  {Function} listener will be executed when sending events to client
	 * @return {Object}          self
	 */
	listen(handler) {
		this._send = function() {
			debugVerbose('Send', ...arguments);
			handler(...arguments);
		};

		this.isConnected = true;

		return this;
	}



	/**
	 * Sends an event to client
	 * @param  {Object} e event
	 * @return {Object}   self
	 */
	sendRaw(e) {
		if(!this._send) {
			throw new Error('Can\'t send without listener.');
		}
		this._send(e);
	}



	/**
	 * Composes an event based on given protocol-disposer-name and options
	 * @param  {String} composerName name of protocol-disposer
	 * @param  {Object} options      composer options
	 * @return {Object}              result of sendRaw (self)
	 */
	send(composerName, attrs) {
		let msg = this.server.protocol.compose(composerName, attrs);
		return this.sendRaw(msg);
	}




	/**
	 * Dispatches an event from client
	 * @param  {Object} event
	 * @return {Promise}       always resolves(!) with object { success:[Boolean], error:[true|Error]
	 */
	dispatch(event) {
		console.log(event);
		let handler = this.server.protocol.match(event);


		return new Promise(resolve => {

			if(!handler) {
				throw new Error('Handler not found');
			}


			resolve(this.server.runHandler(handler, this, event));
		})
		.then(
			() => ({
				success: true,
				error: false
			}),
			error => {
				this.log(['error'], error);
				return {
					success: false,
					error
				}
			}
		);

	}


	/**
	 * Destroys a connection and all its deps
	 * @return {Promise} resolves when destroy-hooks are ready
	 */
	destroy() {
		debug('DESTROY');
		this.isConnected = false;
		return this.hooks.run('destroy', this);
	}

};
