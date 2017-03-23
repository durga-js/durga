'use strict';


const Connection = require('./connection');
const Decorator = require('../misc/decorator');
const Hooks = require('../misc/hooks');
const Protocol = require('../misc/protocol');
const Errors = require('../misc/errors');

const is = require('is');


const KNWON_DECORATOR_NS = ['server', 'connection', 'handler'];

const defaultPlugins = {
	events: require('../plugins/events/server'),
	methods: require('../plugins/methods/server'),
	topics: require('../plugins/topics/server'),
	collections: require('../plugins/collections/server'),
	rooms: require('../plugins/rooms/server'),
};


/**
 * Server class
 */
class DurgaServer {


	/**
	 * Constructor
	 * @param  {[type]} options.transporter [description]
	 * @return {[type]}                     [description]
	 */
	constructor({ logger, transporter }) {

		this._logger = logger || (() => false);

		// init decorator provider
		this.decorator = new Decorator({
			ns: KNWON_DECORATOR_NS
		});

		// init hooks
		this.hooks = new Hooks();

		// init protocol provider
		this.protocol = new Protocol();

		// init errors provider
		this.errors = new Errors();

		// Register default plugins
		Object.keys(defaultPlugins).forEach(key => {
			let plugin = defaultPlugins[key];
			this.use(plugin);
		});

		// init transporter
		if(transporter) {
			transporter.init(this);
		}
	}


	/**
	 * Registers a server plugin
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
		if(ns === 'server') {
			this.decorator._decorate('server', this, key, val, [this]);
		} else {
			this.decorator.register(ns, key, val);
		}
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
	 * Create server log entry
	 * @param  {Array} tags
	 * @param  {Object} data
	 * @return {Object}      self
	 *
	 * @TODO: Implement logger interface
	 */
	log(tags, data) {
		return this._logger(tags, data);
	}



	/**
	 * Creates session instance and decorates it
	 * @return {Session} decorated session instance
	 */
	createConnection() {
		let connection = new Connection(this);
		this.decorator.run('connection', connection);
		return connection;
	}





	/**
	 * Sanitizes handler config and assigns type
	 * @param  {String} type   		handler-type (e.g. method, event, topic, ...)
	 * @param  {Object|Function} 	config object or handler closure
	 * @return {Object}        		sanitized config
	 */
	sanitizeHandlerConfig(type, config) {

		// transform given closure to config object
		if(is.fn(config)) {
			config = {
				handler: config
			};
		}

		// assign type
		config.type = type;

		// TODO: Is this the right place to decorate the config?

		this.decorator.run('handler', config);

		return config;
	}




	/**
	 * Creates a handler function which will be invoked by dispatcher
	 * @param  {String}   type   	handler-type (see sanitizer)
	 * @param  {Object|Function}  config config object or handler closure
	 * @param  {Function} cb     	handler executor
	 * @return {Function}         handler (invoked by dispatcher)
	 */
	createHandler(type, config, cb) {

		// Sanitize config
		config = this.sanitizeHandlerConfig(type, config);

		// return handler closure
		return (ctx) => {

			// assign handler config to ctx (think of route config in hapijs)
			ctx.handler = config;

			// run preHandler hooks
			return this.hooks.run('preHandler', ctx)

			// run handler
			.then(
				() => cb(null, ctx, config.handler),
				err => cb(err, ctx, config.handler)
			);

		};

	}



	/**
	 * Runs a handler with created context
	 * @param  {Function} handler 			Closure created with createHandler()
	 * @param  {Connection} connection 	Connection-instance on which the handler should run
	 * @param  {Object} event   				Event-Object received from dispatcher
	 * @return {void}
	 */
	runHandler(handler, connection, event) {
		let handlerCtx = { connection, event };
		return handler(handlerCtx);
	}



	/**
	 * Start server
	 * @return {Promise} resolves when start-hooks are ready
	 */
	start() {
		return this.hooks.run('start', this);
	}


	inject(conf) {
		let con = this.createConnection();

		return new Promise(resolve => {

			resolve(con.dispatch(conf.event).then(result => {

				return {
					result,
					listen: (h) => con.listen(e => h(e))
				};

			}));

		});
	}


}



module.exports = DurgaServer;
