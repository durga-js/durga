'use strict';


const Code = require('code');
const expect = Code.expect;
const path = require('path');

const Decorator = require(path.resolve('lib', 'misc', 'decorator'));
const DecoratorError = Decorator.DecoratorError;



describe('Decorator:', function() {



	describe('constructor()', () => {

		it('should use given ns array to extend a new array to avoid collisions during tests', () => {
			let ns = ['a'];
			let d = new Decorator({ ns });

			expect(d._ns)
				.to.equal(['a'])
				.not.to.shallow.equal(['a']);

		});

		it('should create new array for ns if not given', () => {

			let d = new Decorator({});

			expect(d._ns)
				.to.equal([]);

		});

	});









	describe('addNamespace()', () => {

		let d;
		beforeEach(() => d = new Decorator({}));

		it('should be a function', () => {
			expect(d.addNamespace)
				.to.be.a.function();
		});

		it('should add a new namespace', () => {

			d.addNamespace('b');

			expect(d._hasNamespace('b'))
				.to.be.true();

		});

		it('should throw a DecoratorError if ns already exists', () => {

			d.addNamespace('b');

			expect(() => d.addNamespace('b'))
				.to.throw(DecoratorError, 'Namespace \'b\' already exists');

		});

	});










	describe('register()', () => {

		let d;
		beforeEach(() => d = new Decorator({}));

		it('should be a function', () => {
			expect(d.register)
				.to.be.a.function();
		});

		it('should throw DecoratorError if namespace not allowed', () => {

			expect(() => d.register('test', 'a', () => true))
				.to.throw(DecoratorError, 'Namespace \'test\' not allowed');

		});

		it('should register decorator on known namespace', () => {

			d.addNamespace('test');

			d.register('test', 'a', () => true);

		});

	});







	describe('run()', () => {

		let d;
		beforeEach(() => d = new Decorator({}));

		it('should be a function', () => {
			expect(d.run)
				.to.be.a.function();
		});

		it('should throw DecoratorError if target.key already set', () => {

			d.addNamespace('test');
			d.register('test', 'a', () => true);

			let test = { a:123 };

			expect(() => d.run('test', test))
				.to.throw(DecoratorError, `'test' cant be decorated. Property 'a' already exists.`);

		});

		it('should throw DecoratorError ns not allowed', () => {

			expect(() => d.run('test', {}))
				.to.throw(DecoratorError, 'Namespace \'test\' not allowed');

		});

	});





	describe('decorateTarget()', () => {

		let d;
		beforeEach(() => d = new Decorator({}));

		it('should be a function', () => {
			expect(d.decorateTarget)
				.to.be.a.function();
		});

		it('should decorate given target', () => {

			let target = {};

			d.decorateTarget(target, 'a', () => 123);

			expect(target.a)
				.to.equal(123);

		});

		it('should throw DecoratorError if target has own property on given key', () => {

			let target = { a:123 };

			expect(() => d.decorateTarget(target, 'a', () => 123))
				.to.throw(DecoratorError, `Can't decorate target. Property 'a' already exists.`);

		});

	});






	describe('DecoratorError:', () => {

		it('should have name attribute', () => {
			let err = new DecoratorError();

			expect(err.name)
				.to.equal('DecoratorError');
		});

	});



});
