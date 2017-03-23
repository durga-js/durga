'use strict';


const init = require('./lib/init-e2e-env');
const Code = require('code');
const expect = Code.expect;


describe('topics', function() {

	let $;
	beforeEach(() => $ = init());

	// it('should execute topic handler', () => {

	// 	$.server.topic('test', (ctx) => {

	// 		expect(ctx.connection)
	// 			.to.be.an.object();

	// 		expect(ctx.event)
	// 			.to.be.an.object();

	// 		expect(ctx.handler)
	// 			.to.be.an.object();

	// 		expect(ctx.payload)
	// 			.to.equal({ test:1234 });

	// 		return { init:321 }
	// 	});

	// 	return $.client.subscribe('test', { test:1234 })
	// 		.then(res => {

	// 			expect(res)
	// 				.to.equal({ init: 321 });

	// 		});

	// });


	// it('topic.ctx should be decorateable', () => {

	// 	$.server.decorate('topic.ctx', 'test', function test() {
	// 		return () => true
	// 	});

	// 	$.server.topic('test', (ctx) => {

	// 		expect(ctx.test)
	// 			.to.be.a.function();

	// 		return { init:321 }
	// 	});

	// 	return $.client.subscribe('test', { test:1234 })
	// 		.then(res => {
	// 			expect(res)
	// 				.to.equal({ init: 321 });
	// 		});

	// });

});
