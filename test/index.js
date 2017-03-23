'use strict';


describe('Unit:', () => {
	require('./unit/misc');
	require('./unit/plugins');
	require('./unit/server');
	require('./unit/client');
});


describe('e2e:', () => {
	require('./e2e/events');
	require('./e2e/methods');
	require('./e2e/topics');
	require('./e2e/collections');
});
