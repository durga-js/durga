'use strict';


const Code = require('code');
const expect = Code.expect;
const path = require('path');

const Durga = require(path.resolve('lib'));



describe('Client:', () => {

	let client;
	beforeEach(() => client = new Durga.Client({}));


	describe('client.exec()', () => {

		it('should be a function', () => {

			expect(client.exec)
				.to.be.a.function();

		});

		it('should send message to "server" and receive result in promise', () => {

			client.listen(e => {

				expect(e.type)
					.to.equal('method');

				expect(e.method)
					.to.equal('test');

				expect(e.payload)
					.to.equal({ test:123 });

				expect(e.rid)
					.to.be.a.string();

				// Needs to be on the next tick
				setTimeout(() => {

					client.dispatch({
						type: 'method',
						method: 'test',
						rid: e.rid,
						payload: { test:1234 }
					})
					.then(res => {

						expect(res)
							.to.equal({ success:true, error:false });

					});

				});


			});

			return client.exec('test', { test:123 })
				.then(res => {
					expect(res)
						.to.equal({ test:1234 });
				});

		});

	});

});
