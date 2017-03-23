'use strict';


const Code = require('code');
const expect = Code.expect;
const path = require('path');

const Durga = require(path.resolve('lib'));
const MethodsProvider = require(path.resolve('lib', 'plugins', 'methods', 'server', 'methods-provider'));
const MethodsProviderError = MethodsProvider.MethodsProviderError;

describe('Server:', () => {

	let server;
	beforeEach(() => server = new Durga.Server({}));


	describe('server.method()', () => {

		it('should be a function', () => {
			expect(server.method)
				.to.be.a.function();
		});


		it('should register a handler and call it', () => {

			server.method('test', ({ payload }) => {

				expect(payload)
					.to.equal({ test:123 });

				return Promise.resolve({ test:1234 });
			});

			return server.inject({
				event: {
					type: 'method',
					method: 'test',
					rid: 1,
					payload: { test:123 }
				}
			}, (e) => {

				expect(e)
					.to.equal({
						type: 'method',
						method: 'test',
						rid: 1,
						payload: { test:1234 },
						error: false
					});

			})
			.then(({ result }) => {

				expect(result)
					.to.equal({
						success: true,
						error: false
					});

			});

		});


		it('handler should respond with error on handler-error', () => {

			let hasResponded = false;


			server.method('test', ({ payload }) => {

				expect(payload)
					.to.equal({ test:123 });

				throw new Error('Handler error');
			});



			return server.inject({
				event: {
					type: 'method',
					method: 'test',
					rid: 1,
					payload: { test:123 }
				}
			}, (e) => {

				expect(e)
					.to.equal({
						type: 'method',
						method: 'test',
						rid: 1,
						payload: undefined,
						error: {
							msg: 'Internal server error',
							code: undefined
						}
					});

				hasResponded = true;

			})
			.then(({ result }) => {

				expect(result.success)
					.to.be.false();

				expect(result.error)
					.to.be.an.error(Error, 'Handler error');

				expect(hasResponded)
					.to.be.true();

			});

		});



		it('handler should respond with error on preHandler-error', () => {

			let hasResponded = false;


			server.method('test', () => {
				throw new Error('Should not be executed');
			});

			server.hook('preHandler', () => {
				throw new Error('PreHandler error');
			});

			return server.inject({
				event: {
					type: 'method',
					method: 'test',
					rid: 1,
					payload: { test:123 }
				}
			}, (e) => {

				expect(e)
					.to.equal({
						type: 'method',
						method: 'test',
						rid: 1,
						payload: undefined,
						error: {
							msg: 'Internal server error',
							code: undefined
						}
					});

				hasResponded = true;

			})
			.then(({ result }) => {

				expect(result.success)
					.to.be.false();

				expect(result.error)
					.to.be.an.error(Error, 'PreHandler error');

				expect(hasResponded)
					.to.be.true();

			});

		});



		it('requesting unknown handler should result in error', () => {

			let hasResponded = false;

			return server.inject({
				event: {
					type: 'method',
					method: 'test',
					rid: 1,
					payload: { test:123 }
				}
			}, (e) => {

				expect(e)
					.to.equal({
						type: 'method',
						method: 'test',
						rid: 1,
						payload: undefined,
						error: {
							msg: 'Internal server error',
							code: undefined
						}
					});

				hasResponded = true;

			})
			.then(({ result }) => {

				expect(result.success)
					.to.be.false();

				expect(result.error)
					.to.be.an.error(Error, `method 'test' not found`);

				expect(hasResponded)
					.to.be.true();

			});

		});


	});









	describe('MethodsProvider', () => {

		let provider;
		let server;

		beforeEach(() => {
			server = new Durga.Server({});
			provider = new MethodsProvider(server);
		});

		describe('Errors:', () => {
			it('MethodsProviderError should be defined', () => {
				expect(MethodsProviderError)
					.not.to.be.undefined();
			});

			it('MethodsProviderError should have name attribute', () => {
				let err = new MethodsProviderError();

				expect(err.name)
					.to.equal('MethodsProviderError');
			});
		});



		it('get() should throw MethodsProviderError on unknown method', () => {

			expect(() => provider.get('unknown'))
				.to.throw(MethodsProviderError);

		});

		it('set(name, handler) should register method', (done) => {

			provider.set('test', ({ payload }) => {

				expect(payload)
					.to.equal(123);

				return { test: payload };
			});

			let handler = provider.get('test');

			let con = server.createConnection();

			con.listen(e => {

				expect(e.payload)
					.to.equal({ test: 123 });

				done();
			});


			handler({
				connection: con,
				event: {
					rid: 1,
					payload: 123
				}
			})
			.catch(e => console.log(e));

		});


		it('set() should throw MethodsProviderError on duplicate entry', () => {

			provider.set('test', () => true);

			expect(() => provider.set('test', () => false))
				.to.throw(MethodsProviderError);

		});

	});

});
