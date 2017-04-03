'use strict';


const RoomProxy = require('./proxy');

module.exports = class RoomProxyProvider {

  constructor(server) {
    this.server = server;
    this.proxies = {};
  }

  getSet(name, config) {

    // get
    if(!config) {

      if(this.proxies.hasOwnProperty(name)) {
        return this.proxies[name];
      } else {
        throw new Error(`RoomProxy '${name}' not defined`);
      }

    // set
    } else {
      return (this.proxies[name] = this._initProxy(name, config));
    }

  }


  _initProxy(name, config) {
    let proxy = new RoomProxy(name, config);
    this.server.decorator.run('roomProxy', proxy, [proxy]);

    this.server.hook('start', proxy.start.bind(proxy));
    this.server.hook('stop', proxy.stop.bind(proxy));

    return proxy;
  }

};
