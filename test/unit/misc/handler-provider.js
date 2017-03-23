'use strict';


const Code = require('code');
const expect = Code.expect;
const path = require('path');

const HandlerProvider = require(path.resolve('lib', 'misc', 'handler-provider'));
const HandlerProviderError = HandlerProvider.HandlerProviderError;


class TestHandlerProvider extends HandlerProvider {
	constructor() {
		super({
			TYPE: 'test'
		});
	}

	_createHandler(config) {
		return () => config;
	}
}

describe('HandlerProvider', () => {

	it('should throw error on missing TYPE in options', () => {

		expect(() => new HandlerProvider({}))
			.to.throw(HandlerProviderError, 'Missing TYPE in options.');

	});

	it('should throw error on invalid implementation', () => {

		expect(() => new HandlerProvider({
			TYPE: 'test'
		}))
		.to.throw(HandlerProviderError, `Method '_createHandler(handlerConfig)' not implemented`);

	});

	describe('instance', () => {
		let provider;
		beforeEach(() => provider = new TestHandlerProvider());

		it('should have method: getSet()', () => {

			expect(provider.getSet)
				.to.be.a.function();

		});

		it('should have method: get()', () => {

			expect(provider.get)
				.to.be.a.function();

		});

		it('should have method: set()', () => {

			expect(provider.set)
				.to.be.a.function();

		});

		it('should have method: _createHandler()', () => {

			expect(provider._createHandler)
				.to.be.a.function();

		});


		it('should set a handler', () => {

			let handler = () => 123;

			provider.set('test', handler);

			expect(provider.get('test')()())
				.to.equal(123);

		});

		it('should throw error on duplicate key', () => {

			provider.set('test', () => true);

			expect(() => provider.set('test', () => true))
				.to.throw(HandlerProviderError);

		});

		it('should throw error on missing config', () => {

			expect(() => provider.set('test'))
				.to.throw(HandlerProviderError);

		});

		it('should throw error on unknown key', () => {

			expect(() => provider.get('test'))
				.to.throw(HandlerProviderError);

		});

		it('HandlerProviderError should have attribute name', () => {
			let err = new HandlerProviderError();
			expect(err.name)
				.to.equal('HandlerProviderError');
		})

	});


});
