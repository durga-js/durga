'use strict';


const init = require('./lib/init-e2e-env');
const Code = require('code');
const expect = Code.expect;


describe('methods', function() {

	let $;
	beforeEach(() => $ = init());



	it('method.ctx should be decorateable', () => {

		$.server.decorate('method.ctx', 'test', function test() {
			return () => true
		});

		$.server.method('test', (ctx) => {

			expect(ctx.test)
				.to.be.a.function();

			return { init:321 }
		});

		return $.client.exec('test', { test:1234 })
			.then(res => {
				expect(res)
					.to.equal({ init: 321 });
			});

	});


	it('should execute method on server', () => {

		$.server.method('test', ({ payload }) => {

			expect(payload)
				.to.equal({ test:123 });

			return payload;
		});

		return $.client.exec('test', { test: 123 })
			.then(res => {

				expect(res)
					.to.equal({ test:123 });

			});

	});


	it('should receive MethodResponseError if method not defined', () => {

		return $.client.exec('unknown', {})
			.then(
				() => { throw new Error('should not be executed'); },
				err => {
					expect(err)
						.to.be.an.error($.client.errors.MethodResponseError);
				}
			);

	});

	it('should receive MethodTimeoutError on timeout', () => {

		$.server.method('test', () => {
			// return never resolving promise to simulate timeout
			return new Promise(()=>true);
		});

		return $.client.exec('test', {}, { timeout: 0 })
			.then(
				() => { throw new Error('should not be executed'); },
				err => {

					expect(err)
						.to.be.an.error($.client.errors.MethodTimeoutError);

					expect(err.name)
						.to.equal('MethodTimeoutError');
				}
			);

	});


	it('should receive MethodResponseError \'bad implementation\'', () => {

		$.server.method('test', () => {
			// create TypeError (Promise.resolve() is not constructor)
			return new Promise.resolve();
		});

		return $.client.exec('test', {}, { timeout: 0 })
			.then(
				() => { throw new Error('should not be executed'); },
				err => {

					expect(err)
						.to.be.an.error($.client.errors.MethodResponseError, 'Bad implementation');

					expect(err.name)
						.to.equal('MethodResponseError');
				}
			);

	});


	// it('should receive event from server', (done) => {

	// 	$.client.event('test', ({ payload }) => {

	// 		expect(payload)
	// 			.to.equal({ test:123 });

	// 		done();
	// 	});

	// 	$.server.$session.send('event', { event: 'test', payload: { test:123 }});

	// });

});
