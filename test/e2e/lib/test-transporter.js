'use strict';


const stringify = data => JSON.stringify(data);
const parse = string => JSON.parse(string);

class Client {
	constructor(bridge) {
		this.bridge = bridge;
	}

	init(client) {
		client.listen(e => this.bridge.emit('cs', stringify(e)));
		this.bridge.on('sc', e => client.dispatch(parse(e)));
	}
}

class Server {
	constructor(bridge) {
		this.bridge = bridge;
	}

	init(server) {
		let connection = server.createConnection();

		// important to access session in tests
		server.$connection = connection;

		connection.listen(e => this.bridge.emit('sc', stringify(e)));
		this.bridge.on('cs', e => connection.dispatch(parse(e)).catch(err => {
			// catch any error from dispatcher
			// to avoid unhandlered promises
		}));
	}
}

module.exports = {
	Client,
	Server
};
