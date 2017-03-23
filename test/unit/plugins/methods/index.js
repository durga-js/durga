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

});
