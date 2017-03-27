'use strict';


const Code = require('code');
const expect = Code.expect;
const path = require('path');
const rx = require('rx');

const Durga = require(path.resolve('lib'));
const Topic = require(path.resolve('lib', 'plugins', 'topics', 'server', 'topic'));



describe('Server:', () => {

	let server;
	beforeEach(() => server = new Durga.Server({}));


	describe('server.topic()', () => {

		it('should be a function', () => {
			expect(server.topic)
				.to.be.a.function();
		});


		it('should register topic handler and test lifecycle until closing connection', () => {

			let isReady = false;
			let isDisposed = false;
			let msgCounter = 0;
			let isObservedSubDisposed = false;

			server.protocol.registerComposer('test', (i) => ({
				type: 'test',
				i
			}));

			server.topic('test', ({ observe, topic, connection }) => {

				expect(observe)
					.to.be.a.function();

				expect(topic)
					.to.be.an.instanceof(Topic);


				let sender = rx.Observable
					.interval(10)
					.map(i => () => {
						connection.send('test', i);
					})
					.finally(() => {
						isObservedSubDisposed = true;
					});

				observe(sender);


				topic.hook('dispose', () => isDisposed = true);

			});

			return server.inject({
				event: {
					type: 'topic:sub',
					topic: 'test',
					rid: 1,
					payload: { test:123 }
				}
			}, e => {

				if(msgCounter === 0) {
					expect(e)
						.to.equal({
							type: 'topic:ready',
							topic: 'test',
							rid: 1,
							error: undefined,
							payload: { dispatches:[] }
						});

					isReady = true;
				}

				if(msgCounter > 0) {

					expect(e)
						.to.equal({
							type: 'test',
							i: msgCounter-1
						});

				}

				msgCounter++;

			})
			.then(({ result, connection }) => {

				expect(result)
					.to.equal({
						success: true,
						error: false
					});

				expect(isReady)
					.to.be.true();


				return new Promise(resolve => {
					setTimeout(() => {

						expect(msgCounter)
							.to.be.above(2);

						resolve(
							connection.destroy()
							.then(() => {

								expect(isDisposed)
									.to.be.true();

								expect(isObservedSubDisposed)
									.to.be.true();

							})
						);
					}, 100);
				});



			});

		});

	});



	describe('subscribing', () => {


		it('should return error on unknown topic', () => {

			return server.inject({
				event:{
					type: 'topic:sub',
					topic: 'test',
					rid: 1,
					payload: {}
				}
			}, e => {

				expect(e)
					.to.equal({
						type: 'topic:ready',
						topic: 'test',
						rid: 1,
						payload: undefined,
						error: { msg: 'Internal server error', code: undefined }
					});

			})
			.then(({ result }) => {

				expect(result.success)
					.to.be.false();

				expect(result.error)
					.to.be.an.error(Error, `topic 'test' not found`);

			});





		});


		it('should return error on preHandler err', () => {


			server.hook('preHandler', () => { throw new Error('Prehandler error'); });

			return server.inject({
				event:{
					type: 'topic:sub',
					topic: 'test',
					rid: 1,
					payload: {}
				}
			}, e => {

				expect(e)
					.to.equal({
						type: 'topic:ready',
						topic: 'test',
						rid: 1,
						payload: undefined,
						error: { msg: 'Internal server error', code: undefined }
					});

			})
			.then(({ result }) => {

				expect(result.success)
					.to.be.false();

				expect(result.error)
					.to.be.an.error(Error, 'Prehandler error');

			});

		});

	});


	describe('disposing', () => {

		it('should dispose on closing connection', () => {

			let isSubscribed = false;
			let isDisposed = false;

			server.topic('test', ({ topic }) => {

				isSubscribed = true;

				topic.hook('dispose', () => isDisposed = true);

			});


			return server.inject({
				event: {
					type: 'topic:sub',
					topic: 'test',
					rid:1,
					payload: {}
				}
			}, e => {

				if(e.type === 'topic:disposed') {
					throw new Error('Should not happen');
				}

			})
			.then(({ connection, result }) => {

				expect(result)
					.to.equal({
						success: true,
						error: false
					});

				expect(isSubscribed)
					.to.be.true();

				return connection.destroy()
				.then(() => {

					expect(isDisposed)
						.to.be.true();

				});
			});


		});

		it('should dispose on dispose request', () => {

			let isSubscribed = false;
			let isDisposed = false;

			server.topic('test', ({ topic }) => {

				isSubscribed = true;

				topic.hook('dispose', () => isDisposed = true);

			});


			return server.inject({
				event: {
					type: 'topic:sub',
					topic: 'test',
					rid:1,
					payload: {}
				}
			}, () => true)
			.then(({ result, connection }) => {

				expect(result)
					.to.equal({
						success: true,
						error: false
					});

				expect(isSubscribed)
					.to.be.true();

				return server.inject({
					connection,
					event: {
						type: 'topic:dispose',
						topic: 'test',
						rid: 1
					}
				}, () => true)
				.then(({ result }) => {

					expect(result)
						.to.equal({
							success: true,
							error: false
						});

					expect(isDisposed)
						.to.be.true();

				});

			});


		});

		it('should return error on unknown subscription', () => {

			return server.inject({
				event:{
					type: 'topic:dispose',
					topic: 'test',
					rid: 1,
					payload: {}
				}
			}, e => {

				expect(e)
					.to.equal({
						type: 'topic:disposed',
						topic: 'test',
						rid: 1,
						error: { msg: 'Subscription not found' }
					});

			})
			.then(({ result }) => {

				expect(result.success)
					.to.be.false();

				expect(result.error)
					.to.be.an.error(Error, 'Subscription not found');

			});

		});

	});


});
