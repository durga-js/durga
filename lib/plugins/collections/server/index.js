'use strict';


const CollectionsProxyProvider = require('./proxy-provider');
const CollectionsProvider = require('./collections-provider');


module.exports = function CollectionsServerPlugin(server, options) {



	const proxyProvider = new CollectionsProxyProvider();
	const collectionsProvider = new CollectionsProvider(server, proxyProvider);



	server
		.decorate('server', 'collection', () => collectionsProvider.getSet.bind(collectionsProvider))

		.decorate('server', 'collectionProxy', () => proxyProvider.getSet.bind(proxyProvider))

		.decorate('topic.ctx', 'collection', function({ observe }) {

			return function collectionInstanceGetter(name) {
				let coll = collectionsProvider.getSet(name);

				return {
					query(q) {
						observe(
							coll.query(q).then(res => (ctx) => {

                res.map(model => {
                  ctx.push(server.protocol.compose('collection:added', {
                  	collection: coll.name,
                  	id: model.id,
                  	model: model
                  }));
                });

              })
						);
					},
					queryChanges(q) {
						observe(coll.queryChanges(q).map(e => (ctx) => {
							ctx.connection.send('collection:'+e.type, {
								collection: name,
								id: e.id,
								model: e.model,
								cleans: e.cleans
							});
						}));
					}
				};
			};

		})
    .decorate('method.ctx', 'collection', (ctx) => (collName) => collectionsProvider.getSet(collName))

    .decorate('event.ctx', 'collection', (ctx) => (collName) => collectionsProvider.getSet(collName))

		.protocol
			.registerComposer('collection:added', ({ collection, id, model }) => ({
				type: 'collection',
				collection,
				event: 'added',
				id,
				model
			}))
			.registerComposer('collection:updated', ({ collection, id, model, cleans }) => ({
				type: 'collection',
				collection,
				event: 'updated',
				id,
				model,
				cleans
			}))
			.registerComposer('collection:destroyed', ({ collection, id }) => ({
				type: 'collection',
				collection,
				event: 'destroyed',
				id
			}));

};
