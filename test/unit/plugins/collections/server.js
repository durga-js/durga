'use strict';


const Code = require('code');
const expect = Code.expect;
const path = require('path');
const rx = require('rx');


const Durga = require(path.resolve('lib'));


const CollectionsProvider = require(path.resolve('lib', 'plugins', 'collections', 'server', 'collections-provider'));
const CollectionsProviderError = CollectionsProvider.CollectionsProviderError;
const CollectionsProxyProvider = require(path.resolve('lib', 'plugins', 'collections', 'server', 'proxy-provider'));
const CollectionsProxyProviderError = CollectionsProxyProvider.CollectionsProxyProviderError;
const CollectionProxy = require(path.resolve('lib', 'plugins', 'collections', 'server', 'proxy'));
const CollectionProxyError = CollectionProxy.CollectionProxyError;



describe('Server:', () => {

	let server;
	beforeEach(() => server = new Durga.Server({}));

	describe('Errors:', () => {

		it('CollectionsProviderError should have name attribute', () => {
			let err = new CollectionsProviderError();
			expect(err.name)
				.to.equal('CollectionsProviderError');
		});

		it('CollectionsProxyProviderError should have name attribute', () => {
			let err = new CollectionsProxyProviderError();
			expect(err.name)
				.to.equal('CollectionsProxyProviderError');
		});

		it('CollectionProxyError should have name attribute', () => {
			let err = new CollectionProxyError();
			expect(err.name)
				.to.equal('CollectionProxyError');
		});


	});









	it('should decorate server with method: collection()', () => {

		expect(server.collection)
			.to.be.a.function();
	});


	it('should decorate server with method: collectionProxy()', () => {

		expect(server.collectionProxy)
			.to.be.a.function();
	});


	it('should decorate topic.ctx with method: collection()', () => {

		let handler = server.topic('test', ({ event, collection }) => {

			expect(collection)
				.to.be.a.function();

		});

		let connection = server.createConnection();

		connection.listen(e => true);

		return connection.dispatch({
			type: 'topic:sub',
			topic: 'test',
			rid: 1,
			payload: {}
		});

	});



	it('should decorate method.ctx with method: collection()', () => {

		let handler = server.method('test', ({ event, collection }) => {

			expect(collection)
				.to.be.a.function();

		});

		let connection = server.createConnection();

		connection.listen(e => true);

		return connection.dispatch({
			type: 'method',
			method: 'test',
			rid: 1,
			payload: {}
		});

	});


	it('should decorate event.ctx with method: collection()', () => {

		let handler = server.event('test', ({ event, collection }) => {

			expect(collection)
				.to.be.a.function();

		});

		let connection = server.createConnection();

		connection.listen(e => true);

		return connection.dispatch({
			type: 'event',
			event: 'test',
			payload: {}
		});

	});



	describe('collectionProxy():', () => {

		it('should throw error when used as getter to unknown proxy', () => {

			expect(() => server.collectionProxy('test'))
				.to.throw(Error, `Proxy 'test' not found.`);

		});

		it('should throw error when register duplicate', () => {

			server.collectionProxy('test', {});

			expect(() => server.collectionProxy('test', {}))
				.to.throw(Error, `Proxy 'test' already defined.`);

		});

		it('should return proxy if used as setter and shallow equal to result of getter', () => {

			let proxy = server.collectionProxy('test', {});

			expect(server.collectionProxy('test'))
				.to.shallow.equal(proxy);

		});



	});



	describe('collection():', () => {

		it('should throw error when used as getter to unknown collection', () => {

			expect(() => server.collection('test'))
				.to.throw(CollectionsProviderError, `Collection 'test' not found.`);

		});

		it('should throw error when register duplicate', () => {

			server.collectionProxy('testdb', {});

			server.collection('test', 'testdb', {});

			expect(() => server.collection('test', 'testdb', {}))
				.to.throw(CollectionsProviderError, `Collection 'test' already defined.`);

		});

		it('should return collection if used as setter and shallow equal to result of getter', () => {

			server.collectionProxy('testdb', {});
			let coll = server.collection('test', 'testdb', {});

			expect(server.collection('test'))
				.to.shallow.equal(coll);

		});

		it('should accept proxy instance instead of name (string)', () => {

			let proxy = server.collectionProxy('testdb', {});

			server.collection('test', proxy, {});

		});


		describe('options: registerMethods', () => {

			let methods = ['create', 'get', 'update', 'destroy'];

			let testAutoRegister = (method) => {

				describe(`with only attribute: ${method} === true`, () => {

					it('should register default method-handler and return expected value on execution', () => {

						let proxy = server.collectionProxy('testdb', {
							[method]: () => 123
						});

						server.collection('test', proxy, {
							registerMethods: {
								[method]: true
							}
						});

						let handler = server.method('$collection:test:'+method);

						let connection = server.createConnection();
						connection.listen(e => true);

						return handler({ connection, event:{
							rid: 1,
							payload: {}
						} })
						.then(res => {

							expect(res.payload)
								.to.equal(123);

						});

					});

					methods.filter(e => e !== method)
						.forEach(notMethod => {

							it(`should not register handler for ${notMethod}`, () => {

								let proxy = server.collectionProxy('testdb', {});

								server.collection('test', proxy, {
									registerMethods: {
										[method]: true
									}
								});

								expect(() => server.method('$collection:test:'+notMethod))
									.to.throw(Error);
							});

						});


				});


				describe(`only attribute: ${method} === handler (function)`, () => {

					it('should register default method-handler', () => {

						let proxy = server.collectionProxy('testdb', {
							[method]: () => 321
						});

						server.collection('test', proxy, {
							registerMethods: {
								[method]: ({ collection }) => collection('test')[method]()
							}
						});

						let handler = server.method('$collection:test:'+method);

						let connection = server.createConnection();
						connection.listen(e => true);

						return handler({ connection, event:{
							rid: 1
						} })
						.then(res => {

							expect(res.payload)
								.to.equal(321);

						});

					});

					methods.filter(e => e !== method)
						.forEach(notMethod => {

							it(`should not register handler for ${notMethod}`, () => {

								let proxy = server.collectionProxy('testdb', {});

								server.collection('test', proxy, {
									registerMethods: {
										[method]: ({ collection }) => collection('test')[method]()
									}
								});

								expect(() => server.method('$collection:test:'+notMethod))
									.to.throw(Error);
							});

						});


				});

				describe(`only attribute: ${method} === handler (object)`, () => {

					it('should register default method-handler', () => {

						let proxy = server.collectionProxy('testdb', {
							[method]: () => 987
						});

						server.collection('test', proxy, {
							registerMethods: {
								[method]: {
									handler: ({ collection }) => collection('test')[method]()
								}
							}
						});

						let handler = server.method('$collection:test:'+method);

						let connection = server.createConnection();
						connection.listen(e => true);

						return handler({ connection, event:{
							rid: 1
						} })
						.then(res => {

							expect(res.payload)
								.to.equal(987);

						});

					});

					methods.filter(e => e !== method)
						.forEach(notMethod => {

							it(`should not register handler for ${notMethod}`, () => {

								let proxy = server.collectionProxy('testdb', {});

								server.collection('test', proxy, {
									registerMethods: {
										[method]: {
											handler: ({ collection }) => collection('test')[method]()
										}
									}
								});

								expect(() => server.method('$collection:test:'+notMethod))
									.to.throw(Error);
							});

						});


				});

			};


			methods.forEach(method => testAutoRegister(method));

		});


		describe('query-methods:', () => {

			let testMethodImplementationErrors = (method) => {

				it(`${method}() should throw CollectionProxyError if not implemented in proxy`, () => {
					let proxy = server.collectionProxy('testdb', {});
					let coll = server.collection('test', proxy, {});

					expect(() => coll[method]())
						.to.throw(CollectionProxyError, `Proxy 'testdb' has no implementation for method: ${method}()`);

				});

			};


			testMethodImplementationErrors('get');
			testMethodImplementationErrors('query');
			testMethodImplementationErrors('queryOne');
			testMethodImplementationErrors('queryChanges');
			testMethodImplementationErrors('create');
			testMethodImplementationErrors('update');
			testMethodImplementationErrors('destroy');


			let testMethodResults = (method, expectedType) => {

				it(`${method}() should return ${expectedType.name}`, () => {
					let proxy = server.collectionProxy('testdb', {
						[method]: () => true
					});

					let coll = server.collection('test', proxy, {});

					let res = coll[method]();

					expect(res)
						.to.be.instanceof(expectedType);
				});

			};

			testMethodResults('get', Promise);
			testMethodResults('query', Promise);
			testMethodResults('queryOne', Promise);
			testMethodResults('queryChanges', rx.Observable);
			testMethodResults('create', Promise);
			testMethodResults('update', Promise);
			testMethodResults('destroy', Promise);


			describe('queryChanges():', () => {

				it('should emit changes and dispose on unsubscribe', (done) => {

					let proxy = server.collectionProxy('testdb', {
						queryChanges(coll, query, emit) {
							emit.added(1, {title: 'A'});
							emit.updated(2, { title: 'B' });
							emit.destroyed(3);

							return function dispose() {
								done();
							}
						}
					});

					let coll = server.collection('test', proxy, {});

					coll.queryChanges()
						.take(3)
						.toArray()
						.toPromise()
						.then(res => {

							expect(res)
								.to.equal([
									{ type: 'added', id: 1, model: { title: 'A' } },
									{ type: 'updated', id: 2, model: { title: 'B' }, cleans: undefined },
									{ type: 'destroyed', id: 3 },
								])

						})
						.catch(done);

				});

			});


		});


	});

});
