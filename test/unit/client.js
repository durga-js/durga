'use strict';

const path = require('path');
const Code = require('code');
const expect = Code.expect;
const Durga = require(path.resolve('lib'));
const Protocol = require(path.resolve('lib', 'misc', 'protocol'));
const Decorator = require(path.resolve('lib', 'misc', 'decorator'));


describe('Client:', () => {

	let client;
	beforeEach(() => client = new Durga.Client({}));


	describe('constructor()', () => {

		it('should init given transporter', () => {

			let isInit = false;

			new Durga.Client({
				transporter: {
					init(_client) {

						expect(_client)
							.to.be.an.instanceof(Durga.Client);

						isInit = true;

					}
				}
			});


			expect(isInit)
				.to.be.true();

		});

	});







	describe('protocol', () => {

		it('should be an instance of Protocol', () => {

			expect(client.protocol)
				.to.be.an.instanceof(Protocol);

		});

	});









	describe('decorator', () => {

		it('should be an instance of Decorator', () => {

			expect(client.decorator)
				.to.be.an.instanceof(Decorator);

		});

	});









	describe('decorate()', () => {

		it('should be a function', () => {
			expect(client.decorate)
				.to.be.a.function();
		});


		it('should return client instance', () => {

			let res = client.decorate('client', 'test', () => 123);

			expect(res)
				.to.shallow.equal(client);

		});

		it('should decorate the client instance directly', () => {

			client.decorate('client', 'test', () => 123);

			expect(client.test)
				.to.equal(123);

		});


		it('should register decorator for custom namespace', () => {

			client.decorator.addNamespace('test');
			client.decorate('test', 'test', () => true);

		});

	});












	describe('use()', () => {

		it('should be a function', () => {

			expect(client.use)
				.to.be.a.function();

		});


		it('should execute plugin without given config', () => {

			let plugin = (_client, options) => {

				expect(_client)
					.to.shallow.equal(client);

				expect(options)
					.to.be.an.object()
					.to.equal({});
			};

			client.use(plugin);

		});

		it('should execute plugin with given options', () => {

			let plugin = (_client, options) => {

				expect(_client)
					.to.shallow.equal(client);

				expect(options)
					.to.be.an.object()
					.to.equal({ test:123 });
			};

			client.use(plugin, { test:123 });

		});

	});












	describe('listen()', () => {

		it('should be a function', () => {

			expect(client.listen)
				.to.be.a.function();

		});

		it('should register listener and return client instance', () => {

			expect(client._send)
				.not.to.be.a.function();

			let res = client.listen(() => true);

			expect(res)
				.to.shallow.equal(client);

			expect(client._send)
				.to.be.a.function();

		});

	});










	describe('sendRaw()', () => {

		it('should be a function', () => {

			expect(client.sendRaw)
				.to.be.a.function();

		});


		it('should throw Error if no listener is attached', () => {

			expect(() => client.sendRaw({}))
				.to.throw(Error, 'Can\'t send without listener.');

		});


		it('should execute listener', () => {

			client.listen(e => expect(e).to.equal({ test:123 }));

			client.sendRaw({ test:123 });

		});

	});










	describe('send()', () => {

		it('should be a function', () => {

			expect(client.send)
				.to.be.a.function();

		});

		it('should throw ProtocolError on unknown composer', () => {

			expect(() => client.send('test'))
				.to.throw(Protocol.ProtocolError, `Composer 'test' not found.`);

		});


		it('should send composed message to listener', () => {

			let isSent = false;

			client.listen(e => {

				expect(e)
					.to.equal({ test:123 });

				isSent = true;

			});

			client.protocol.registerComposer('test', () => ({ test:123 }));

			client.send('test');

			expect(isSent)
				.to.be.true();

		});

	});










	describe('dispatch()', () => {

		it('should be a function', () => {

			expect(client.dispatch)
				.to.be.a.function();

		});


		it('should resolve with error:error and success:false on unknown handler', () => {

			let res = client.dispatch({
				type: 'test',
				payload: { test:123 }
			});

			expect(res)
				.to.be.instanceof(Promise);

			return res.then(res => {
				expect(res.success)
					.to.be.false();

				expect(res.error)
					.to.be.an.error(Error, 'Handler not found');
			});

		});


		it('should resolve with error:false and success:true', () => {

			let matched = false;

			client.protocol.registerMatcher(e => {

				if(e.type === 'test') {
					return () => {

						expect(e.payload)
							.to.equal({ test: 123 });

						matched = true;

					};
				}
			});

			let res = client.dispatch({
				type: 'test',
				payload: { test:123 }
			});

			expect(res)
				.to.be.instanceof(Promise);

			return res.then(res => {

				expect(res.error)
					.to.be.false();

				expect(res.success)
					.to.be.true();

				expect(matched)
					.to.be.true();

			});

		});


	});






});
