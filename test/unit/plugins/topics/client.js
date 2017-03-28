'use strict';


const Code = require('code');
const expect = Code.expect;
const path = require('path');
const rx = require('rx');

const Durga = require(path.resolve('lib'));

describe('Client:', () => {

	let client;
	beforeEach(() => client = new Durga.Client({}));


	describe('client.subscribe()', () => {

		it('should be a function', () => {
			expect(client.subscribe)
				.to.be.a.function();
		});


		describe('Subscription', () => {


			describe('ready', () => {

				it('should reject in case of topic error', () => {

					client.listen(e => {


						if(e.type === 'topic:sub') {
							// Needs to be on next tick
							setTimeout(() => {

								client.dispatch({
									type: 'topic:ready',
									topic: e.topic,
									rid: e.rid,
									error: {
										msg: 'Topic error'
									}
								});

							});
						}


					});

					let sub = client.subscribe('test', {}, { timeout: 10 });

					expect(sub)
						.to.be.an.object();

					expect(sub.dispose)
						.to.be.a.function();

					expect(sub.ready)
						.to.be.an.instanceof(Promise);

					return sub.ready
						.catch(err => {

							expect(sub.isReady)
								.to.be.false();

							expect(err)
								.to.be.an.error(client.errors.TopicResponseError, 'Topic error');

						});

				});



				it('should reject in case of request timeout', () => {

					client.listen(() => true);

					let sub = client.subscribe('test', {}, { timeout: 50 });

					expect(sub)
						.to.be.an.object();

					expect(sub.dispose)
						.to.be.a.function();

					expect(sub.ready)
						.to.be.an.instanceof(Promise);

					return sub.ready.catch(err => {

						expect(sub.isReady)
							.to.be.false();

						expect(err)
							.to.be.an.error(client.errors.TopicTimeoutError, `Timeout has occurred while waiting for topic:ready: test`);

					});

				});



				it('should dispatch if dispatches are available in ready response', () => {

					client.listen(e => {

            setTimeout(() => {
              client.dispatch({
                type: 'topic:ready',
                rid: e.rid,
                topic: e.topic,
                payload: {
                  dispatches: [
                    {
                      type: 'event',
                      event: 'test',
                      payload: { test:123 }
                    }
                  ]
                }
              });
            });

					});

          let eventExecuted = false;

          client.event('test', ({ payload }) => {
            expect(payload)
              .to.equal({ test:123 });


            eventExecuted = true;
          });

					return client.subscribe('test', {})
            .ready
						.then(res => {
              expect(res)
                .to.equal({});

              expect(eventExecuted)
                .to.be.true();
            });

				});


			});





			it('should dispose', () => {


				client.listen(e => {

					if(e.type === 'topic:sub') {
						// Needs to be on next tick
						setTimeout(() => {

							client.dispatch({
								type: 'topic:ready',
								topic: e.topic,
								rid: e.rid,
								payload: { test:123 }
							});

						});
					}


					if(e.type === 'topic:dispose') {
						// Needs to be on next tick
						setTimeout(() => {

							client.dispatch({
								type: 'topic:disposed',
								topic: e.topic,
								rid: e.rid
							});

						});
					}


				});

				let sub = client.subscribe('test', {}, { timeout: 20 });


				return sub.ready.then(() => sub.dispose())
					.then(res => {

						expect(res)
							.to.equal({
								type: 'topic:disposed',
								topic: 'test',
								rid: sub.id
							});

						expect(sub.isDisposed)
							.to.be.true();

					});

			});


			it('should handle dispose error', () => {


				client.listen(e => {

					if(e.type === 'topic:sub') {
						// Needs to be on next tick
						setTimeout(() => {

							client.dispatch({
								type: 'topic:ready',
								topic: e.topic,
								rid: e.rid,
								payload: { test:123 }
							});

						});
					}


					if(e.type === 'topic:dispose') {
						// Needs to be on next tick
						setTimeout(() => {

							client.dispatch({
								type: 'topic:disposed',
								topic: e.topic,
								rid: e.rid,
								error: { msg: 'Dispose error' }
							});

						});
					}


				});

				let sub = client.subscribe('test', {}, { timeout: 20 });


				return sub.ready.then(() => sub.dispose())
					.catch(err => {

						expect(err)
							.to.be.an.error(client.errors.TopicResponseError, 'Dispose error');

					});

			});


		});



	});

});
