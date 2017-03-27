'use strict';

const is = require('is');

class Room {

  constructor(name, proxy, config) {
    this.name = name;
    this.proxy = proxy;
    this.config = config;
    this.connections = {};
    this.proxy.connect(this);
  }

  _emitLocal(event, payload) {
    Object.keys(this.connections)
      .map(key => this.connections[key])
      .forEach(con => con.send('event', {
        event,
        payload
      }));
  }

  emit(name, payload) {
    this.proxy.emit(this, name, payload);
  }

  join(connection) {

    if(this.connections.hasOwnProperty(connection.id)) {
      throw new Error(`Connection '${connection.id}' already joined room '${this.name}'`);
    }

    this.connections[connection.id] = connection;

    connection.hook('destroy', () => {
      if(this.connections.hasOwnProperty(connection.id)) {
        delete this.connections[connection.id];
      }
    });

    return this;
  }

  leave(connection) {
    if(this.connections.hasOwnProperty(connection.id)) {
      delete this.connections[connection.id];
    }
  }


}



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
