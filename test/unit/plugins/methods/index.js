'use strict';


const Code = require('code');
const expect = Code.expect;
const path = require('path');

const Durga = require(path.resolve('lib'));
const MethodsProvider = require(path.resolve('lib', 'plugins', 'methods', 'server', 'methods-provider'));
const MethodsProviderError = MethodsProvider.MethodsProviderError;


describe('Methods:', () => {

	require('./server');
	require('./client');







	// it('should execute method', (done) => {

	// 	let server = new Durga.Server({});

	// 	server.method('test', ({ raw }) => {
	// 		return { test: 123 };
	// 	});

	// 	let con = server.createConnection();

	// 	con.listen(e => {

	// 		expect(e.payload)
	// 			.to.equal({ test: 123 });

	// 		done();
	// 	});

	// 	con.dispatch({
	// 		type: 'method',
	// 		method: 'test',
	// 		rid: String(Date.now()),
	// 		payload: {}
	// 	});

	// });


	// it('should reply with error on preHandler-Error', (done) => {


	// 	let server = new Durga.Server({});

	// 	server.hook('preHandler', ({ handler }) => {
	// 		if(handler.type === 'method') {
	// 			return Promise.reject(new Error('nope'));
	// 		}
	// 	});

	// 	server.method('test', () => true);

	// 	let con = server.createConnection();
	// 	con.listen(e => {

	// 		expect(e.error)
	// 			//.to.be.true();

	// 		expect(e.payload)
	// 			//.to.be.an.error(Error, 'nope');

	// 		done();
	// 	});

	// 	con.dispatch({
	// 		type: 'method',
	// 		method: 'test',
	// 		rid: String(Date.now()),
	// 		payload: {}
	// 	});


	// });


});
