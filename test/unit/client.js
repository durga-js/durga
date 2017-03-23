'use strict';

const path = require('path');
const Code = require('code');
const expect = Code.expect;
const Durga = require(path.resolve('lib'));
const Protocol = require(path.resolve('lib', 'misc', 'protocol'));


describe('client', () => {

	let client;
	beforeEach(() => client = new Durga.Client({}));

	it('should have method decorate()', () => {
		expect(client.decorate)
			.to.be.a.function();
	});

	it('should decorate client', () => {

		client.decorate('client', 'test', () => 123);

		expect(client.test)
			.to.equal(123);

	});

	it('should execute decorators with ns \'client\' with client instance as first argument', () => {

		let client = new Durga.Client({});

		client.decorate('client', 'test', (s) => {

			expect(s)
				.to.shallow.equal(client);

			return null;
		});

	});


	it('should have method use()', () => {

		expect(client.use)
			.to.be.a.function();

	});

	it('should execute plugin registered with use()', () => {

		let plugin = function(_client, options) {

			expect(_client)
				.to.shallow.equal(client);

			expect(options)
				.to.equal({ test: 123 });

		};

		client.use(plugin, { test:123 });

	});

	it('should have protocol instance', () => {

		expect(client.protocol)
			.to.be.an.instanceOf(Protocol);

	});


});
