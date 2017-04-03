'use strict';

module.exports = class RoomHandlerInterface {
  constructor(room, handlerCtx) {
    this._room = room;
    this._handlerCtx = handlerCtx;
  }

  emit(event, payload) {
    return this._room.emit(...arguments);
  }

  join() {
    this._room.join(this._handlerCtx.connection);
  }
}
