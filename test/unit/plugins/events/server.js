'use strict';


const Code = require('code');
const expect = Code.expect;
const path = require('path');

const Durga = require(path.resolve('lib'));

const EventsProvider = require(path.resolve('lib', 'plugins', 'events', 'server', 'events-provider'));
const EventsProviderError = EventsProvider.EventsProviderError;



describe('Server:', () => {

	let server;
	beforeEach(() => server = new Durga.Server({}));



	describe('EventsProviderError:', () => {

		it('should have name getter', () => {
			let err = new EventsProviderError();
			expect(err.name)
				.to.equal('EventsProviderError');
		});

	});

	describe('server.event()', () => {

		it('should be a function', () => {
			expect(server.event)
				.to.be.a.function();
		});

	});


	describe('event.ctx', () => {

		it('should have payload attribute', () => {

			server.event('test', ({ payload }) => {

				expect(payload)
					.to.equal({ test:123 });

			});

			return server.inject({
				event: {
					type: 'event',
					event: 'test',
					payload: { test:123 }
				}
			})
			.then(res => {

				expect(res.result)
					.to.equal({
						success: true,
						error: false
					});

			});

		});

	});



	describe('dispatiching: events', () => {

		it('should result with error on unknown event', () => {

			return server.inject({
				event: {
					type: 'event',
					event: 'test',
					payload: { test:123 }
				}
			})
			.then(res => {

				expect(res.result.success)
					.to.be.false();

				expect(res.result.error)
					.to.be.an.error(EventsProviderError, `event 'test' not found`);

			});


		});


		it('should result with error on preHandler-error', () => {

			server.event('test', () => {});

			server.hook('preHandler', () => {
				throw new Error('Prehandler error');
			});

			return server.inject({
				event: {
					type: 'event',
					event: 'test',
					payload: { test:123 }
				}
			})
			.then(res => {

				expect(res.result.success)
					.to.be.false();

				expect(res.result.error)
					.to.be.an.error(Error, 'Prehandler error');

			});

		});


		it('should result with error on handler-error', () => {

			server.event('test', () => {
				throw new Error('Handler error');
			});


			return server.inject({
				event: {
					type: 'event',
					event: 'test',
					payload: { test:123 }
				}
			})
			.then(res => {

				expect(res.result.success)
					.to.be.false();

				expect(res.result.error)
					.to.be.an.error(Error, 'Handler error');

			});

		});

	});


});
