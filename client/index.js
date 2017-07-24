'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Decorator = require('../misc/decorator');
var Protocol = require('../misc/protocol');
var Errors = require('../misc/errors');
var EventEmitter = require('events');
var debug = require('debug')('Durga');

var PLUGINS = {
	events: require('../plugins/events/client'),
	methods: require('../plugins/methods/client'),
	topics: require('../plugins/topics/client'),
	collections: require('../plugins/collections/client'),
	rooms: require('../plugins/rooms/client')
};

var DurgaClient = function (_EventEmitter) {
	_inherits(DurgaClient, _EventEmitter);

	function DurgaClient(_ref) {
		var transporter = _ref.transporter;

		_classCallCheck(this, DurgaClient);

		var _this = _possibleConstructorReturn(this, (DurgaClient.__proto__ || Object.getPrototypeOf(DurgaClient)).call(this));

		var oEmit = _this.emit;
		_this.trigger = oEmit;
		_this.emit = undefined;

		_this.decorator = new Decorator({
			ns: ['client']
		});

		_this.protocol = new Protocol();
		_this.errors = new Errors();

		Object.keys(PLUGINS).forEach(function (key) {
			var plugin = PLUGINS[key];
			_this.use(plugin, {});
		});

		if (transporter) {
			transporter.init(_this);
		}

		return _this;
	}

	_createClass(DurgaClient, [{
		key: 'use',
		value: function use(plugin, options) {
			plugin(this, options || {});
		}
	}, {
		key: 'decorate',
		value: function decorate(ns, key, val) {
			if (ns === 'client') {
				this.decorator._decorate('client', this, key, val, [this]);
			} else {
				this.decorator.register(ns, key, val);
			}
			return this;
		}
	}, {
		key: 'listen',
		value: function listen(listener) {
			this._send = listener;
			return this;
		}
	}, {
		key: 'dispatch',
		value: function dispatch(event) {

			debug('Dispatch', event);

			var handler = this.protocol.match(event);

			return new Promise(function (resolve) {
				if (!handler) {
					throw new Error('Handler not found');
				}
				resolve(handler(event));
			}).then(function () {
				return {
					success: true,
					error: false
				};
			}, function (error) {
				return {
					success: false,
					error: error
				};
			});
		}
	}, {
		key: 'sendRaw',
		value: function sendRaw(e) {
			debug('Send', e);

			if (!this.hasOwnProperty('_send')) {
				throw new Error('Can\'t send without listener.');
			}

			this._send(e);

			return this;
		}
	}, {
		key: 'send',
		value: function send(composerName, options) {
			var msg = this.protocol.compose(composerName, options);
			return this.sendRaw(msg);
		}
	}]);

	return DurgaClient;
}(EventEmitter);

module.exports = DurgaClient;
