'use strict';

const rx = require('rx');


const CollectionProvider = require('./collections-provider');


module.exports = function CollectionsClientPlugin(client, options) {

	let collectionsEvents = new rx.Subject();

	let collections = new CollectionProvider(client, collectionsEvents);

	client.decorate('client', 'collection', () => collections.get.bind(collections));


	client.protocol
		.registerMatcher(event => {
			if(event.type === 'collection' && event.collection) {
				return () => collectionsEvents.onNext(event);
			}
		});

};
