'use strict';


module.exports = class Room {

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
      this.leave(connection);
    });

    return this;
  }

  leave(connection) {
    if(this.connections.hasOwnProperty(connection.id)) {
      delete this.connections[connection.id];
    }
  }


};
