'use strict';


const Code = require('code');
const expect = Code.expect;
const path = require('path');

const Durga = require(path.resolve('lib'));
const Protocol = require(path.resolve('lib', 'misc', 'protocol'));
const Connection = require(path.resolve('lib', 'server', 'connection'));


describe('Server:', () => {

	let server;
	beforeEach(() => server = new Durga.Server({}));


	it('should have protocol instance', () => {

		let server = new Durga.Server({});

		expect(server.protocol)
			.to.be.an.instanceOf(Protocol);

	});

	it('should register server decorator', () => {

		let server = new Durga.Server({});

		let val = { test:123 };

		server.decorate('server', 'test', () => val);

		expect(server.test)
			.to.shallow.equal(val);

	});

	it('should register connection decorator', () => {

		let server = new Durga.Server({});

		let val = { test:123 };

		server.decorate('connection', 'test', () => val);

		let session = server.createConnection();

		expect(session.test)
			.to.shallow.equal(val);

	});

	it('should execute decorators with ns \'server\' with server as first argument', () => {

		let server = new Durga.Server({});

		server.decorate('server', 'test', (s) => {

			expect(s)
				.to.shallow.equal(server);

			return null;
		});

	});


	it('should init transporter', (done) => {

		let server = new Durga.Server({
			transporter: {
				init(server) {
					expect(server).to.shallow.equal(server);
					done();
				}
			}
		});

	});


	it('log() should log with given logger', () => {

		let server = new Durga.Server({
			logger: (tags, data) => {
				expect(tags)
					.to.equal(['test']);

				expect(data)
					.to.equal(123);
			}
		});

		server.log(['test'], 123);

	});

	it('log() should not log without given logger and return false', () => {

		let server = new Durga.Server({});

		expect(server.log(['test'], 123))
			.to.be.false();

	});


	it('should register start hook and run on server.start()', () => {

		let server = new Durga.Server({});

		let runned = false;

		server.hook('start', (ctx) => {
			expect(ctx)
				.to.shallow.equal(server);

			runned = true;
		});

		return server.start()
			.then(() => {
				expect(runned)
					.to.be.true();
			});

	});

	it('sanitizeHandlerConfig(type, [Function]) should return object', () => {
		let server = new Durga.Server({});

		let handler = () => true;
		let config = server.sanitizeHandlerConfig('method', handler);

		expect(config)
			.to.be.an.object();

		expect(config.handler)
			.to.shallow.equal(handler);
	});

	it('sanitizeHandlerConfig(type, [Object]) should return object', () => {
		let server = new Durga.Server({});

		let rawConfig = { handler: () => true };
		let config = server.sanitizeHandlerConfig('method', rawConfig);

		expect(config)
			.to.be.an.object();

		expect(config.handler)
			.to.shallow.equal(rawConfig.handler);
	});


	it('createHandler()', () => {

		let server = new Durga.Server({});

		server.hook('preHandler', ({ handler }) => {
			if(handler.type === 'test') {
				return Promise.reject(new Error('nope'));
			}
		});

		let handler = server.createHandler('test', () => true, (err, ctx, handler) => {

			expect(err)
				.to.be.an.error(Error, 'nope');

			expect(ctx.handler)
				.to.be.an.object();

			expect(ctx.handler.type)
				.to.equal('test');

			return 123;

		});

		return handler({})
			.then(res => {
				expect(res)
					.to.equal(123);
			});
	});




	describe('createConnection()', () => {

		it('should be a function', () => {
			expect(server.createConnection)
				.to.be.a.function();
		});

		it('should return instance of Connection', () => {

			let con = server.createConnection();

			expect(con)
				.to.be.an.instanceof(Connection);

		});

		describe('Connection:', () => {

			let con;
			beforeEach(() => con = server.createConnection());


			describe('log()', () => {

				it('should be a function', () => {

					expect(con.log)
						.to.be.a.function();

				});

				it('should log on server with tag: connection', (done) => {

					server._logger = (tags, data) => {

						expect(tags)
							.to.equal(['connection', 'test']);

						expect(data)
							.to.equal(123);

						done();
					};

					con.log(['test'], 123);

				});

				it('should return connection instance', () => {

					let res = con.log(['test'], 123);

					expect(res)
						.to.shallow.equal(con);

				});

			});



			describe('hook()', () => {

				it('should be a function', () => {

					expect(con.hook)
						.to.be.a.function();

				});


				it('should register hook', () => {

					con.hook('test', () => true);

					expect(con.hooks._expectHooksByName('test'))
						.to.have.length(1);

				});

				it('should return instance of connection', () => {

					let res = con.hook('test', () => true);

					expect(res)
						.to.shallow.equal(con);

				});

			});






			describe('listen()', () => {

				it('should be a function', () => {

					expect(con.listen)
						.to.be.a.function();

				});


				it('should register listener and return connection instance', () => {

					expect(con._send)
						.not.to.be.a.function();

					let res = con.listen(() => true);

					expect(res)
						.to.shallow.equal(con);

					expect(con._send)
						.to.be.a.function();

				});

			});





			describe('sendRaw()', () => {

				it('should be a function', () => {

					expect(con.sendRaw)
						.to.be.a.function();

				});


				it('should throw Error if no listener is attached', () => {

					expect(() => con.sendRaw({}))
						.to.throw(Error, 'Can\'t send without listener.');

				});


				it('should execute listener', () => {

					con.listen(e => expect(e).to.equal({ test:123 }));

					con.sendRaw({ test:123 });

				});

			});







			describe('send()', () => {

				it('should be a function', () => {

					expect(con.send)
						.to.be.a.function();

				});

				it('should throw ProtocolError on unknown composer', () => {

					expect(() => con.send('test'))
						.to.throw(Protocol.ProtocolError, `Composer 'test' not found.`);

				});


				it('should send composed message to listener', () => {

					let isSent = false;

					con.listen(e => {

						expect(e)
							.to.equal({ test:123 });

						isSent = true;

					});

					con.server.protocol.registerComposer('test', () => ({ test:123 }));

					con.send('test');

					expect(isSent)
						.to.be.true();

				});

			});





			describe('dispatch()', () => {

				it('should be a function', () => {

					expect(con.dispatch)
						.to.be.a.function();

				});


				it('should resolve with error:error and success:false on unknown handler', () => {

					let res = con.dispatch({
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

					con.server.protocol.registerMatcher(e => {

						if(e.type === 'test') {
							return () => {

								expect(e.payload)
									.to.equal({ test: 123 });

								matched = true;

							};
						}
					});

					let res = con.dispatch({
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




			describe('destroy()', () => {

				it('should be a function', () => {

					expect(con.destroy)
						.to.be.a.function();

				});

				it('should return promise', () => {

					let res = con.destroy();

					expect(res)
						.to.be.instanceof(Promise);

				});

				it('should run destroy hooks with con as param', () => {

					con.hook('destroy', 0, (_con) => {
						expect(_con)
							.to.shallow.equal(con);
					});

					return con.destroy();

				});

			});



		});


	});



});
