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


    // describe('room', () => {
    //
    //   describe('emit()', () => {
    //
    //     it('should be a function', () => {
    //
    //       server.roomProxy('test', new server.LocalRoomProxy());
    //       let room = server.room('test', 'test');
    //
    //       expect(room.emit)
    //         .to.be.a.function();
    //
    //     });
    //
    //     it('should throw error if proxy does not implement method emit()', () => {
    //
    //       server.roomProxy('test', { connect() {} });
    //       let room = server.room('test', 'test');
    //
    //       expect(() => room.emit('test', {}))
    //         .to.throw(Error, `RoomProxy 'test' has no implementation for method: emit()`);
    //
    //     });
    //
    //     it('should execute proxy.emit()', () => {
    //
    //       let executed = false;
    //
    //       server.roomProxy('test', {
    //         connect() {},
    //         emit(room, event, payload) {
    //           expect(event)
    //             .to.be.a.string()
    //             .to.equal('test');
    //
    //           expect(payload)
    //             .to.be.an.object()
    //             .to.equal({ test:123 });
    //
    //           executed = true;
    //         }
    //       });
    //
    //       let room = server.room('test', 'test');
    //
    //       room.emit('test', { test:123 });
    //
    //       expect(executed)
    //         .to.be.true();
    //
    //     });
    //
    //   });
    //
    //   describe('join()', () => {
    //
    //   });
    //
    //   describe('leave()', () => {
    //
    //   });
    //
    // });



    // it('should define room with proxy as string', () => {
    //
    //   let room = server.room('test', 'testProxy', {});
    //
    // });

  });


});
