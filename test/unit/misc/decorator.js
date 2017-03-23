'use strict';


const Code = require('code');
const expect = Code.expect;
const path = require('path');

const Decorator = require(path.resolve('lib', 'misc', 'decorator'));
const DecoratorError = Decorator.DecoratorError;



describe('Decorator', function() {

	it('should decorate method', () => {

		let decorator = new Decorator({
			ns: ['server']
		});
		let server = {};

		decorator.register('server', 'method', function(a,b,c) {

			expect(this)
				.to.shallow.equal(server);

			return function() {
				return this;
			};

		});

		decorator.decorate('server', server);

		expect(server.method).to.be.a.function();
		expect(server.method()).to.shallow.equal(server);

		decorator.addNamespace('test');


		expect(() => decorator._decorate('server', server, 'method', 123))
			.to.throw(Error);

		expect(() => decorator._decorate('unknownNamespace', server, 'method', 123))
			.to.throw(Error);
	});









	it('decorate() with bindCtx', () => {

		let decorator = new Decorator({});
		decorator.addNamespace('server');

		let server = {};
		let ctx = {};

		decorator.register('server', 'method', function(_ctx) {

			expect(_ctx)
				.to.shallow.equal(ctx);

			return () => this;
		});

		decorator.decorate('server', server, [ctx]);

		expect(server.method).to.be.a.function();
		expect(server.method()).to.shallow.equal(server);

	});

	it('addNamespace() should throw error on duplicate', () => {
		let decorator = new Decorator({});
		decorator.addNamespace('server');

		expect(() => decorator.addNamespace('server'))
			.to.throw(Error);
	});


	describe('DecoratorError', () => {


		it('should have name attribute', () => {
			let err = new DecoratorError();

			expect(err.name)
				.to.equal('DecoratorError');
		})

	})

});
