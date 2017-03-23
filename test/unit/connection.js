const Code = require('code');
const expect = Code.expect;
const path = require('path');

const Durga = require(path.resolve('lib'));

describe('Connection', () => {

	it('should create', () => {

		let server = new Durga.Server({});

		let con = server.createConnection();

		expect(con.id)
			.to.be.a.string();

		expect(con.server)
			.to.shallow.equal(server);

	});


	it('should add listener and be able to send events', (done) => {

		let transporter = {
			init(server) {
				// timeout simulates established connection
				setTimeout(() => {
					let con = server.createConnection();

					let event = { test:123 };


					expect(() => con.sendRaw(event))
						.to.throw(Error, 'Listener not attached');


					con.listen(e => {
						expect(e)
							.to.shallow.equal(event);
						done();
					});

					expect(con._listener)
						.to.be.a.function();

					con.sendRaw(event);
				});
			}
		};

		let server = new Durga.Server({ transporter });

	});

	// it('should destroy', (done) => {

	// 	let isDestroyed = false;

	// 	let transporter = {
	// 		init(server) {
	// 			// timeout simulates established connection
	// 			setTimeout(() => {
	// 				let con = server.createConnection();

	// 				con.listen(e => true);

	// 				setTimeout(() => {

	// 					con.destroy()
	// 					.then(() => {
	// 						expect(isDestroyed)
	// 							.to.be.true();

	// 						done();
	// 					});

	// 				});

	// 			});
	// 		}
	// 	};

	// 	let server = new Durga.Server({ transporter });

	// 	server.hook('connection.destroy', (con) => {
	// 		isDestroyed = true;
	// 	});

	// });



	it('should reject result promise on unknown dispatch handler', () => {

		let server = new Durga.Server({});
		let con = server.createConnection();

		return con.dispatch({
			type: 'unknown'
		})
		.then(
			() => { throw new Error('should not be executed'); },
			err => expect(err).to.be.an.error()
		);

	});


});
