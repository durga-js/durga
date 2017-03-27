'use strict';

const is = require('is');
const Room = require('./room');



module.exports = class RoomProvider {

  constructor(server, proxyProvider) {
    this.server = server;
    this.proxies = proxyProvider;
    this.rooms = {};
  }


  getSet(name, proxy, config) {

    // get
    if(!proxy) {

      if(this.rooms.hasOwnProperty(name)) {
        return this.rooms[name];
      } else {
        throw new Error(`Room '${name}' not defined`);
      }

    } else {
      return (this.rooms[name] = this._initRoom(name, proxy, config));
    }

  }


  _initRoom(name, proxy, config) {

    if(is.string(proxy)) {
      proxy = this.proxies.getSet(proxy);
    }

    let room = new Room(name, proxy, config);
    this.server.decorator.run('room', room, [room]);
    return room;
  }

}
