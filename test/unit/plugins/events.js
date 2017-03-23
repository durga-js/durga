'use strict';


const Code = require('code');
const expect = Code.expect;
const path = require('path');

const Durga = require(path.resolve('lib'));


describe('Events', () => {


	describe('Server', () => {

		let server;
		beforeEach(() => server = new Durga.Server({}));

		describe('decoration', () => {

			it('should decorate server with method: event()', () => {
				expect(server.event)
					.to.be.a.function();
			});

			it('should add protocol matcher', (done) => {

				server.event('test', ({ payload }) => {
					expect(payload)
						.to.equal({ test: 123 });

					done();
				});

				let connection = server.createConnection();

				connection.dispatch({
					type: 'event',
					event: 'test',
					payload: { test: 123 }
				});

			});


		});

	});


	describe('Client', () => {

		let client;
		beforeEach(() => client = new Durga.Client({}));

		it('should decorate client with method: emit()', () => {
			expect(client.emit)
				.to.be.a.function();
		});

		it('should decorate client with method: event()', () => {
			expect(client.event)
				.to.be.a.function();
		});

	});







});
