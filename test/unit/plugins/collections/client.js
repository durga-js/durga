'use strict';


const Code = require('code');
const expect = Code.expect;
const path = require('path');

const Durga = require(path.resolve('lib'));


describe('Client:', () => {

	let client;
	beforeEach(() => client = new Durga.Client({}));


	it('should decorate client with method: collection()', () => {

		expect(client.collection)
			.to.be.a.function();

	});


});
