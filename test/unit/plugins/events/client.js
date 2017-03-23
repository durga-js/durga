'use strict';


const Code = require('code');
const expect = Code.expect;
const path = require('path');

const Durga = require(path.resolve('lib'));


describe('Client:', () => {

	let client;
	beforeEach(() => client = new Durga.Client({}));


	describe('client.emit()', () => {

		it('should be a function', () => {
			expect(client.emit)
				.to.be.a.function();
		});

		it('should send event to server', (done) => {

			client.listen(e => {
				expect(e)
					.to.equal({
						type: 'event',
						event: 'test',
						payload: { test:123 }
					});

				done();
			});

			client.emit('test', { test:123 });

		});

	});



	describe('client.event()', () => {

		it('should be a function', () => {
			expect(client.event)
				.to.be.a.function();
		});

		it('should add handler eventhandler', () => {

			let isCalled = false;

			client.event('test', ({ payload }) => {

				expect(payload)
					.to.equal({ test:123 });

				isCalled = true;

			});

			return client.dispatch({
				type: 'event',
				event: 'test',
				payload: { test:123 }
			})
			.then(res => {

				expect(res.success)
					.to.be.true();

				expect(isCalled)
					.to.be.true();

			});

		});




	});


});


