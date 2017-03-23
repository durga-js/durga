'use strict';


const init = require('./lib/init-e2e-env');
const Code = require('code');
const expect = Code.expect;


describe('events', function() {

	let $;
	beforeEach(() => $ = init());



	it('should send event to server', (done) => {

		$.server.event('test', ({ payload }) => {
			expect(payload)
				.to.equal({ test:123 });

			done();
		});

		$.client.emit('test', { test: 123 });

	});


	it('should receive event from server', (done) => {

		$.client.event('test', ({ payload }) => {

			expect(payload)
				.to.equal({ test:123 });

			done();
		});

		$.server.$connection.send('event', { event: 'test', payload: { test:123 }});

	});

});
