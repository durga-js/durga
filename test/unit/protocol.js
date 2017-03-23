'use strict';


const Code = require('code');
const expect = Code.expect;
const path = require('path');

const Durga = require(path.resolve('lib'));
const Protocol = require(path.resolve('lib', 'misc', 'protocol'));
const ProtocolError = Protocol.ProtocolError;

describe('Protocol', () => {

	it('ProtocolError should be defined', () => {
		expect(ProtocolError)
			.not.to.be.undefined();

		let error = new ProtocolError('test');

		expect(error)
			.to.be.an.error(ProtocolError);
	});

	it('should register matcher and match an event', (done) => {

		let server = new Durga.Server({});

		let handler = (ctx) => 123;

		server.protocol.registerMatcher(e => e.type === 'test1' ? false : false);
		server.protocol.registerMatcher(e => e.type === 'test2' ? handler : false);
		server.protocol.registerMatcher(e => e.type === 'test3' ? false : false);

		let matchedHandler = server.protocol.match({ type: 'test2' });

		expect(matchedHandler)
			.to.shallow.equal(handler);

		expect(matchedHandler())
			.to.be.equal(123);

		done();

	});

	it('should register composer and compose correctly', (done) => {

		let server = new Durga.Server({});

		server.protocol.registerComposer('test', (data) => ({
			type: 'test',
			test: data.test
		}));

		let msg = server.protocol.compose('test', { test: 123 });

		expect(msg)
			.to.be.an.object();

		expect(msg.type)
			.to.be.a.string()
			.to.equal('test');

		expect(msg.test)
			.to.be.a.number()
			.to.equal(123);

		done();
	});

	it('should throw error on unknown composer', () => {

		let server = new Durga.Server({});

		expect(() => server.protocol.compose('unknown', {}))
			.to.throw(server.protocol.Error);

	});


	it('should throw error on composer duplicate', () => {

		let server = new Durga.Server({});

		server.protocol.registerComposer('test', () => ({}));

		expect(() => server.protocol.registerComposer('test', () => ({})))
			.to.throw(ProtocolError);

	});

});
