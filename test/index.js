'use strict';


describe('Unit:', () => {
	require('./unit/misc');
	require('./unit/server');
	require('./unit/client');
	require('./unit/plugins');
});


describe('e2e:', () => {
	require('./e2e/events');
	require('./e2e/methods');
	require('./e2e/topics');
	require('./e2e/collections');
});
