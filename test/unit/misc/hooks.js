'use strict';


const Code = require('code');
const expect = Code.expect;
const path = require('path');

const Hooks = require(path.resolve('lib', 'misc', 'hooks'));




describe('Hooks', function() {

	let hooks;
	beforeEach(() => hooks = new Hooks());

	it('should register hook with priority', () => {

		let hook = () => true;
		let priority = 100;

		hooks.register('test', priority, hook);
		let registeredHooks = hooks._expectHooksByName('test');

		expect(registeredHooks)
			.to.have.length(1);

		expect(registeredHooks[0].hook)
			.to.shallow.equal(hook);

		expect(registeredHooks[0].priority)
			.to.shallow.equal(priority);

	});


	it('should register hook without priority with default priority', () => {

		let hook = () => true;
		let priority = Hooks.DEFAULT_PRIORITY;

		hooks.register('test', hook);
		let registeredHooks = hooks._expectHooksByName('test');

		expect(registeredHooks)
			.to.have.length(1);

		expect(registeredHooks[0].hook)
			.to.shallow.equal(hook);

		expect(registeredHooks[0].priority)
			.to.shallow.equal(priority);

	});



	it('should register 3 hooks on same topic and sort them by priority', () => {

		let a = () => true;
		let b = () => true;
		let c = () => true;

		hooks.register('test', 100, a);
		hooks.register('test', 200, b);
		hooks.register('test', 300, c);

		let registeredHooks = hooks._expectHooksByName('test');

		expect(registeredHooks[0].hook)
			.to.shallow.equal(a);

		expect(registeredHooks[1].hook)
			.to.shallow.equal(b);

		expect(registeredHooks[2].hook)
			.to.shallow.equal(c);


	});


	it('should register 3 hooks on same topic reversed and sort them by priority', () => {

		let a = () => true;
		let b = () => true;
		let c = () => true;

		hooks.register('test', 300, c);
		hooks.register('test', 200, b);
		hooks.register('test', 100, a);

		let registeredHooks = hooks._expectHooksByName('test');

		expect(registeredHooks[0].hook)
			.to.shallow.equal(a);

		expect(registeredHooks[1].hook)
			.to.shallow.equal(b);

		expect(registeredHooks[2].hook)
			.to.shallow.equal(c);

	});


	it('should run 3 hooks in order of priority', () => {

		let res = [];

		let a = () => res.push('a');
		let b = () => res.push('b');
		let c = () => res.push('c');

		hooks.register('test', 300, c);
		hooks.register('test', 200, b);
		hooks.register('test', 100, a);

		return hooks.run('test')
			.then(() => {
				expect(res)
					.to.equal(['a', 'b', 'c']);
			});

	});


	it('should run 3 hooks which set attributes on ctx', () => {

		let a = (ctx) => ctx.a = 1;
		let b = (ctx) => ctx.b = 2;
		let c = (ctx) => ctx.c = 3;

		hooks.register('test', 300, c);
		hooks.register('test', 200, b);
		hooks.register('test', 100, a);

		let ctx = {};

		return hooks.run('test', ctx)
			.then((res) => {

				expect(res)
					.to.shallow.equal(ctx);

				expect(ctx)
					.to.equal({
						a:1,
						b:2,
						c:3
					});
			});

	});

});
