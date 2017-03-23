'use strict';


const Code = require('code');
const expect = Code.expect;
const path = require('path');

const Durga = require(path.resolve('lib'));
const Protocol = require(path.resolve('lib', 'misc', 'protocol'));


describe('Server', () => {

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




});
