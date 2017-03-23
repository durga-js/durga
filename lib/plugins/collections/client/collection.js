'use strict';


module.exports = class CollectionInterface {
	constructor(name, client, observable) {
		this.name = name;
		this.client = client;
		this.observable = observable.filter(e => e.collection === this.name);;
	}

	get _remoteBasePath() {
		return `$collection:${this.name}:`;
	}

	get(id) {
		return this.exec('get', { id });
	}

	create(attrs) {
		return this.exec('create', attrs);
	}

	update(id, attrs, cleans) {
		return this.exec('update', {
			id,
			attrs,
			cleans
		});
	}

	destroy(id) {
		return this.exec('destroy', { id });
	}

	subscribe(observer) {
		return this.observable
			.map(e => ({
				type: e.event,
				id: e.id,
				model: e.model,
				cleans: e.cleans
			}))
			.subscribe(...arguments);
	}

	exec(method, payload) {
		return this.client.exec(this._remoteBasePath+method, payload);
	}
};
