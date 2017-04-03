'use strict';

const is = require('is');
const debug = require('debug')('Durga:room-proxy');

module.exports = class RoomProxy {


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

  start(server) {
    /* istanbul ignore else */
    if(is.fn(this.config.start)) {
      debug(`${this.name} START`);
      return this.config.start(server);
    }
  }

  stop(server) {
    /* istanbul ignore else */
    if(is.fn(this.config.stop)) {
      debug(`${this.name} STOP`);
      return this.config.stop(server);
    }
  }

  emit(room, event, payload) {
    return this.config.emit(room, event, payload);
  }

  connect(room) {
    return this.config.connect(room, room._emitLocal.bind(room));
  }


}
