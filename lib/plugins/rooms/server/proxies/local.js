'use strict';

const EventEmitter = require('events');


module.exports = class LocalProxy {

  constructor() {
    this.emitter = new EventEmitter();
  }

  emit(room, event, payload) {
    this.emitter.emit(room.name, {
      event,
      payload
    })
  }

  connect(room) {

    this.emitter.on(room.name, d => {
      room._emitLocal(d.event, d.payload);
    });

  }

}
