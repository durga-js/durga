'use strict';


const Code = require('code');
const expect = Code.expect;
const path = require('path');

const Durga = require(path.resolve('lib'));


describe('Client:', () => {

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


