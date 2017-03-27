'use strict';


const is = require('is');

class RoomProxy {
  constructor(name, config) {
    this.name = name;
    this.config = config;

    if(!is.fn(this.config.connect)) {
      throw new Error(`Proxy '${this.name}' needs implementation for method: connect(room)`)
    }


    if(!is.fn(this.config.emit)) {
      throw new Error(`Proxy '${this.name}' needs implementation for method: emit(room)`)
    }
  }

  emit(room, event, payload) {
    return this.config.emit(room, event, payload);
  }

  connect(room) {
    return this.config.connect(room);
  }
}



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
    return proxy;
  }

};
