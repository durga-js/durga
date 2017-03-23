'use strict';


const init = require('./lib/init-e2e-env');
const Code = require('code');
const expect = Code.expect;
const rx = require('rx');

describe('Collections:', function() {

	let $;
	beforeEach(() => $ = init());

	it('should create()', () => {

		$.server.collectionProxy('testdb', {
			create(coll, q) {
				return Object.assign({}, q, { id: 'qwe123' });
			}
		});

		$.server.collection('todos', 'testdb', {
			registerMethods: {
				create: true
			}
		});

		return $.client.collection('todos').create({ title: 123 })
			.then(res => {

				expect(res)
					.to.equal({
						id: 'qwe123',
						title: 123
					});

			});

	});


	it('should get()', () => {

		$.server.collectionProxy('testdb', {
			get(coll, id) {
				return Object.assign({ title: 'test' }, { id });
			}
		});

		$.server.collection('todos', 'testdb', {
			registerMethods: {
				get: true
			}
		});

		return $.client.collection('todos').get('123')
			.then(res => {

				expect(res)
					.to.equal({
						id: '123',
						title: 'test'
					});

			});

	});



	it('should update()', () => {

		let model = {
			id: '123',
			title: 'test',
			updated: false,
			removeMe: 'trash'
		};

		$.server.collectionProxy('testdb', {
			update(coll, id, data, cleans) {

				let res = Object.assign({}, model, data, { updated: true });

				Object.keys(cleans)
					.filter(k => cleans[k]===true)
					.forEach(k => delete res[k]);

				return res;
			}
		});

		$.server.collection('todos', 'testdb', {
			registerMethods: {
				update: true
			}
		});

		return $.client.collection('todos').update('123', { addMe:'huhu' }, { removeMe: true })
			.then(res => {

				expect(res)
					.to.equal({
						id: '123',
						title: 'test',
						updated: true,
						addMe: 'huhu'
					});

			});

	});


	it('should destroy()', () => {

		$.server.collectionProxy('testdb', {
			destroy(coll, id) {
				return true;
			}
		});

		$.server.collection('todos', 'testdb', {
			registerMethods: {
				destroy: true
			}
		});

		return $.client.collection('todos').destroy('123')
			.then(res => {

				expect(res)
					.to.be.true();

			});

	});


	it('could use topicCollectionInterface', () => {

		let onTopicDispose;
		let topicDisposed = new Promise(resolve => onTopicDispose = resolve)

		$.server.topic('home', ({ collection, topic }) => {

			collection('todos').query();
			collection('todos').queryChanges();

			topic.hook('dispose', () => onTopicDispose())

		});

		let onQueryChangeDispose;
		let queryChangesDispose = new Promise(resolve => onQueryChangeDispose = resolve)

		$.server.collectionProxy('testdb', {
			query() {
				return Promise.resolve([1,2,3]);
			},

			queryChanges(coll, query, { added, updated, destroyed }) {
				added(1, {
					id: 1,
					title: 'test',
					cleanable: 'trash'
				});

				updated(1, {
					title: 'test'
				}, { cleanable:true });

				destroyed(1);

				return () => {
					onQueryChangeDispose();
				}
			}
		});

		$.server.collection('todos', 'testdb', {});






		let collEvents = $.client.collection('todos')
			.observable
			.take(3)
			.toArray()
			.toPromise()
			.then(res => {

				expect(res.map(e => e.event))
					.to.equal(['added', 'updated', 'destroyed']);

			});


		let subscription = new Promise(resolve => {

			let sub = $.client.subscribe('home', {}, null, (err, res) => {

				expect(err)
					.to.be.null();

				expect(res)
					.to.be.an.object();


				expect(res.todos)
					.to.be.an.array()
					.to.equal([1,2,3]);

				sub.dispose()
					.then(res => {
						resolve();
					});
			});


		});


		return Promise.all([
			collEvents,
			subscription,
			queryChangesDispose,
			topicDisposed
		]);


	});


});
