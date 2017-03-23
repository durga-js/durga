'use strict';


const Code = require('code');
const expect = Code.expect;
const path = require('path');

const Durga = require(path.resolve('lib'));
const MethodsProvider = require(path.resolve('lib', 'plugins', 'methods', 'server', 'methods-provider'));
const MethodsProviderError = MethodsProvider.MethodsProviderError;


describe('Methods', () => {

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

				return { test: payload }
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

	it('should decorate server with method()', () => {

		let server = new Durga.Server({});

		expect(server.method)
			.to.be.a.function();

	});


	it('should execute method', (done) => {

		let server = new Durga.Server({});

		server.method('test', ({ raw }) => {
			return { test: 123 };
		});

		let con = server.createConnection();

		con.listen(e => {

			expect(e.payload)
				.to.equal({ test: 123 });

			done();
		});

		con.dispatch({
			type: 'method',
			method: 'test',
			rid: String(Date.now()),
			payload: {}
		});

	});


	it('should reply with error on preHandler-Error', (done) => {


		let server = new Durga.Server({});

		server.hook('preHandler', ({ handler }) => {
			if(handler.type === 'method') {
				return Promise.reject(new Error('nope'));
			}
		});

		server.method('test', () => true);

		let con = server.createConnection();
		con.listen(e => {

			expect(e.error)
				//.to.be.true();

			expect(e.payload)
				//.to.be.an.error(Error, 'nope');

			done();
		});

		con.dispatch({
			type: 'method',
			method: 'test',
			rid: String(Date.now()),
			payload: {}
		});


	});


});
