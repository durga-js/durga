'use strict';


const RoomProxyProvider = require('./proxy-provider');
const RoomProvider = require('./room-provider');
const LocalRoomProxy = require('./proxies/local');
const RoomHandlerInterface = require('./room-handler-interface');


module.exports = function RoomsServerPlugin(server, options) {


  const proxyProvider = new RoomProxyProvider(server);
  const roomProvider = new RoomProvider(server, proxyProvider);


  server.decorator.addNamespace('roomProxy');
  server.decorator.addNamespace('room');

  server.decorate('server', 'roomProxy', () => proxyProvider.getSet.bind(proxyProvider));
  server.decorate('server', 'room', () => roomProvider.getSet.bind(roomProvider));

  server.decorate('server', 'LocalRoomProxy', () => LocalRoomProxy);

  server.decorate('event.ctx', 'room', handlerCtx => roomName => {
    let room = roomProvider.getSet(roomName);
    return new RoomHandlerInterface(room, handlerCtx);
  });

  server.decorate('topic.ctx', 'room', handlerCtx => roomName => {
    let room = roomProvider.getSet(roomName);
    return new RoomHandlerInterface(room, handlerCtx);
  });

};
