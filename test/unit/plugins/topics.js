'use strict';


const Code = require('code');
const expect = Code.expect;
const path = require('path');

const Durga = require(path.resolve('lib'));
const Topic = require(path.resolve('lib', 'plugins', 'topics', 'server', 'topic'));

describe('Topics:', () => {


	describe('Server:', () => {

		let server;
		beforeEach(() => server = new Durga.Server({}));

		it('should decroate server with method: topic()', () => {
			expect(server.topic)
				.to.be.a.function();
		});

		it('should decorate topic.ctx with topic instance', () => {

			server.topic('test', ({ topic }) => {
				expect(topic)
					.to.be.instanceof(Topic);
			});

			let con = server.createConnection();
			con.listen(e => true);

			return con.dispatch({
				type: 'topic:sub',
				topic: 'test',
				rid: 1,
			})
			.then(() => {
				return con.dispatch({
					type: 'topic:dispose',
					topic: 'test',
					rid: 1
				});
			})

		});

	});


});
