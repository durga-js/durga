'use strict';


const Code = require('code');
const expect = Code.expect;
const path = require('path');

const Durga = require(path.resolve('lib'));


describe('Events:', () => {
	require('./server');
	require('./client');
});
