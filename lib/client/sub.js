'use strict';


const NOOP = (() => true);

class Subscription {
	constructor(durga, topic, payload, cb) {
		this.connected = false;

		this.$durga = durga;
		this.$topic = topic;
		this.$id = String(Date.now());
		this.$payload = payload || {};
		this.$cb = cb || NOOP;

		this._connect();

		this.$durga._activeSubscriptions.push(this);
	}

	_connect() {
		this.$durga.exec('$sub/'+this.$topic, {
			subId: this.$id,
			payload: this.$payload
		})
		.then(res => {
			this.connected = true;
			this.$cb(null, res);
			return res;
		}, err => this.$cb(err, null));
	}

	_disconnect() {
		return this.$durga.exec('$dispose/'+this.$topic, {
			subId: this.$id
		})
		.then(res => {
			this.connected = false;
			return res;
		});
	}


	dispose() {
		return this._disconnect()
			.then(res => {
				let index = this.$durga._activeSubscriptions.indexOf(this);
				if(index !== -1) {
					this.$durga._activeSubscriptions.splice(index, 1);
				}
			});
	}
}

module.exports = Subscription;
