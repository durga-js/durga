'use strict';


const RoomProxyProvider = require('./proxy-provider');
const RoomProvider = require('./room-provider');
const LocalRoomProxy = require('./proxies/local');


module.exports = function RoomsServerPlugin(server, options) {


  const proxyProvider = new RoomProxyProvider(server);
  const roomProvider = new RoomProvider(server, proxyProvider);


  server.decorator.addNamespace('roomProxy');
  server.decorator.addNamespace('room');

  server.decorate('server', 'roomProxy', () => proxyProvider.getSet.bind(proxyProvider));
  server.decorate('server', 'room', () => roomProvider.getSet.bind(roomProvider));

  server.decorate('server', 'LocalRoomProxy', () => LocalRoomProxy);



	// let memoryRooms = new rx.Subject();

	// server.roomProxy('redis', {
	// 	observe(room) {
	// 		let sub = memoryRooms
	// 			.filter(e => e.room === room.name)
	// 			.subscribe(e => room.dispatch(event.name, event.payload));

	// 		return () => sub.dispose();
	// 	},
	// 	dispatch(room, event) {
	// 		memoryRooms.onNext({
	// 			room: room.name,
	// 			event
	// 		});
	// 	}
	// });


	// server.room('bar', 'redis', {

	// 	init() {

	// 	},

	// 	onJoin(con) {
	// 		// Sends event to all connected clients
	// 		this.emit('new connection in room');
	// 	},
	// 	onLeave(con) {
	// 		// Sends event to all connected clients
	// 		this.emit('con has left the room');
	// 	}
	// })


	// server.room('bar').join(connection);
	// server.room('bar').leave(connection);
	// server.room('bar').emit('test', {});

};
