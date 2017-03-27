'use strict';


const Code = require('code');
const expect = Code.expect;
const path = require('path');
const rx = require('rx');
const EventEmitter = require('events');

const Durga = require(path.resolve('lib'));


describe('Server:', () => {

	let server;
	beforeEach(() => server = new Durga.Server({}));

  describe('server.roomProxy()', () => {

    it('should be a function', () => {

      expect(server.roomProxy)
        .to.be.a.function();

    });


    it('should throw Error when used as getter for unknown proxy', () => {

      expect(() => server.roomProxy('unknown'))
        .to.throw(Error, `RoomProxy 'unknown' not defined`);

    });



    it('should return proxy when used as setter', () => {

      let res = server.roomProxy('test', new server.LocalRoomProxy());

      console.log('Needs implementation');
    });



    it('should throw error in case of missing implementation for: connect()', () => {

      expect(() => server.roomProxy('test', {}))
        .to.throw(Error, `Proxy 'test' needs implementation for method: connect(room)`);

    });



    it('should throw error in case of missing implementation for: emit()', () => {

      expect(() => server.roomProxy('test', { connect() {} }))
        .to.throw(Error, `Proxy 'test' needs implementation for method: emit(room)`);

    });




    describe('roomProxy', () => {

      describe('emit()', () => {

        it('should be a function', () => {

          let proxy = server.roomProxy('test', {
            connect() {},
            emit(event, payload) {}
          });

          expect(proxy.emit)
            .to.be.a.function();

        });


        it('should execute given connect() and emit() implementation', () => {

          let roomDummy = { name: 'dummy' };

          let isConnected = false;
          let hasEmitted = false;

          let proxy = server.roomProxy('test', {
            connect(room) {
              expect(room)
                .to.shallow.equal(roomDummy);

              isConnected = true;
            },
            emit(room, event, payload) {

              expect(room)
                .to.shallow.equal(roomDummy);

              expect(event)
                .to.be.a.string()
                .to.equal('test');

              expect(payload)
                .to.be.an.object()
                .to.equal({ test:123 });

              hasEmitted = true;

            }
          });


          proxy.connect(roomDummy);
          proxy.emit(roomDummy, 'test', { test:123 });

          expect(isConnected)
            .to.be.true();

          expect(hasEmitted)
            .to.be.true();


        });

      });
    });


  });



  describe('server.room()', () => {

    it('should be a function', () => {

      expect(server.room)
        .to.be.a.function();

    });


    it('should throw Error when used as getter for undefined room', () => {

      expect(() => server.room('test'))
        .to.throw(Error, `Room 'test' not defined`);

    });


    it('should return room instance when used as getter', () => {

      let proxy = server.roomProxy('test', new server.LocalRoomProxy());
      let room = server.room('test', 'test');


      expect(server.room('test'))
        .to.shallow.equal(room);
    });

    it('should define room with proxy-string', () => {
      server.roomProxy('test', new server.LocalRoomProxy());
      server.room('test', 'test');
    });

    it('should define room with proxy-instance', () => {
      let proxy = server.roomProxy('test', new server.LocalRoomProxy());
      server.room('test', proxy);
    });


    it('should define room and connect proxy', () => {

      let connected = false;

      server.roomProxy('testProxy', {
        connect(room) {

          expect(room)
            .to.be.an.object();

          expect(room._emitLocal)
            .to.be.a.function();

          connected = true;
        },
        emit(){}
      });

      let room = server.room('test', 'testProxy');

      expect(connected)
        .to.be.true();

    });


    describe('room', () => {

      describe('emit()', () => {

        it('should be a function', () => {

          server.roomProxy('test', new server.LocalRoomProxy());
          let room = server.room('test', 'test');

          expect(room.emit)
            .to.be.a.function();

        });


        it('should execute proxy.emit()', () => {

          let executed = false;

          server.roomProxy('test', {
            connect() {},
            emit(room, event, payload) {
              expect(event)
                .to.be.a.string()
                .to.equal('test');

              expect(payload)
                .to.be.an.object()
                .to.equal({ test:123 });

              executed = true;
            }
          });

          let room = server.room('test', 'test');

          room.emit('test', { test:123 });

          expect(executed)
            .to.be.true();

        });

      });

      describe('join()', () => {

        it('should be a function', () => {
          server.roomProxy('test', new server.LocalRoomProxy());
          let room = server.room('test', 'test');

          expect(room.join)
            .to.be.a.function();
        });

        it('should throw error if connection already joined', () => {

          server.roomProxy('test', new server.LocalRoomProxy());
          let room = server.room('test', 'test');

          let con = server.createConnection();

          room.join(con);

          expect(() => room.join(con))
            .to.throw(Error, `Connection '${con.id}' already joined room 'test'`);

        });

        it('should add connection as listener', () => {

          server.roomProxy('test', new server.LocalRoomProxy());
          let room = server.room('test', 'test');

          let con = server.createConnection();

          room.join(con);

          expect(room.connections)
            .to.include(con.id);

        });

      });

      describe('leave()', () => {

        it('should be a function', () => {
          server.roomProxy('test', new server.LocalRoomProxy());
          let room = server.room('test', 'test');

          expect(room.leave)
            .to.be.a.function();
        });


        it('should remove connection as listener', () => {

          server.roomProxy('test', new server.LocalRoomProxy());
          let room = server.room('test', 'test');

          let con = server.createConnection();

          room.join(con);

          expect(room.connections)
            .to.include(con.id);

          room.leave(con);

          expect(room.connections)
            .not.to.include(con.id);

        });

        it('should automatically leave room on connection destroy', () => {

          server.roomProxy('test', new server.LocalRoomProxy());
          let room = server.room('test', 'test');

          let con = server.createConnection();

          room.join(con);

          expect(room.connections)
            .to.include(con.id);

          return con.destroy()
            .then(() => {

              expect(room.connections)
                .not.to.include(con.id);

            });

        });

        it('should do nothing if connection already left room', () => {
          server.roomProxy('test', new server.LocalRoomProxy());
          let room = server.room('test', 'test');

          let con = server.createConnection();

          room.join(con);

          room.leave(con);

          room.leave(con);
        });

      });

      describe('_emitLocal()', () => {

        it('should be a function', () => {
          server.roomProxy('test', new server.LocalRoomProxy());
          let room = server.room('test', 'test');

          expect(room._emitLocal)
            .to.be.a.function();
        });

        it('should send event to all connected clients', () => {

          server.roomProxy('test', new server.LocalRoomProxy());
          let room = server.room('test', 'test');

          let con1 = server.createConnection();
          let con2 = server.createConnection();

          let con1Received = false;
          let con2Received = false;

          con1.listen(e => {

            expect(e).to.equal({
              type: 'event',
              event: 'test',
              payload: { test:123 }
            });

            con1Received = true;
          });

          con2.listen(e => {

            expect(e).to.equal({
              type: 'event',
              event: 'test',
              payload: { test:123 }
            });

            con2Received = true;
          });

          room.join(con1);
          room.join(con2);

          room._emitLocal('test', { test:123 });

          expect(con1Received)
            .to.be.true();

          expect(con2Received)
            .to.be.true();

        });

      });

    });


  });



	describe('LocalProxy', () => {

		it('should work', () => {


			server.roomProxy('local', new server.LocalRoomProxy());

			let room = server.room('test', 'local');

			let con = server.createConnection();

			let sentEvent = false;

			con.listen(e => {
				expect(e)
					.to.equal({
						type: 'event',
						event: 'test',
						payload: { test:123 }
					});

				sentEvent = true;
			});

			room.join(con);

			room.emit('test', { test:123 });

			expect(sentEvent)
				.to.be.true();

		});

	});


});
