'use strict';


const Code = require('code');
const expect = Code.expect;
const path = require('path');

const Durga = require(path.resolve('lib'));
const CollectionInterface = require(path.resolve('lib', 'plugins', 'collections', 'client', 'collection'));

describe('Client:', () => {

	let client;
	beforeEach(() => client = new Durga.Client({}));


  describe('collection()', () => {

    it('should be a function', () => {

      expect(client.collection)
        .to.be.a.function();

    });

    it('should return instance of collection', () => {

      let coll = client.collection('test');

      expect(coll)
        .to.be.instanceof(CollectionInterface);

    });


    it('should cache collection instances', () => {

      let coll1 = client.collection('test');
      let coll2 = client.collection('test');

      expect(coll1)
        .to.shallow.equal(coll2);

    });











    describe('collection instance', () => {

      let coll;
      beforeEach(() => coll = client.collection('test'));



      describe('get(id)', () => {

        it('should be a function', () => {

          expect(coll.get)
            .to.be.a.function();

        });

        it('should return promise which resolves with server response', () => {

          // mock client.exec to simulate server request/response
          client.exec = function(method, payload) {

            expect(method)
              .to.equal('$collection:test:get');

            expect(payload)
              .to.equal({ id:1 })

            return Promise.resolve({ test:1234 });
          };


          let res = coll.get(1);

          expect(res)
            .to.be.an.instanceof(Promise);

          return res.then(res => {

            expect(res)
              .to.equal({ test:1234 });

          });

        });

      });


      describe('create(data)', () => {

        it('should be a function', () => {

          expect(coll.create)
            .to.be.a.function();

        });

        it('should return promise which resolves with server response', () => {

          // mock client.exec to simulate server request/response
          client.exec = function(method, payload) {

            expect(method)
              .to.equal('$collection:test:create');

            expect(payload)
              .to.equal({ test:123 })

            return Promise.resolve({ test:1234 });
          };


          let res = coll.create({ test:123 });

          expect(res)
            .to.be.an.instanceof(Promise);

          return res.then(res => {

            expect(res)
              .to.equal({ test:1234 });

          });

        });

      });


      describe('update(data)', () => {

        it('should be a function', () => {

          expect(coll.update)
            .to.be.a.function();

        });


        it('should return promise which resolves with server response', () => {

          // mock client.exec to simulate server request/response
          client.exec = function(method, payload) {

            expect(method)
              .to.equal('$collection:test:update');

            expect(payload)
              .to.equal({
                id: 1,
                attrs: { test:123 },
                cleans: { a:true }
              })

            return Promise.resolve({ test:1234 });
          };


          let res = coll.update(1, { test:123 }, { a:true });

          expect(res)
            .to.be.an.instanceof(Promise);

          return res.then(res => {

            expect(res)
              .to.equal({ test:1234 });

          });

        });


      });


      describe('destroy(id)', () => {

        it('should be a function', () => {

          expect(coll.update)
            .to.be.a.function();

        });


        it('should return promise which resolves with server response', () => {

          // mock client.exec to simulate server request/response
          client.exec = function(method, payload) {

            expect(method)
              .to.equal('$collection:test:destroy');

            expect(payload)
              .to.equal({ id:1 })

            return Promise.resolve({ test:1234 });
          };


          let res = coll.destroy(1);

          expect(res)
            .to.be.an.instanceof(Promise);

          return res.then(res => {

            expect(res)
              .to.equal({ test:1234 });

          });

        });

      });


      describe('exec(method, payload)', () => {

        it('should be a function', () => {

          expect(coll.exec)
            .to.be.a.function();

        });


        it('should return promise which resolves with server response', () => {

          // mock client.exec to simulate server request/response
          client.exec = function(method, payload) {

            expect(method)
              .to.equal('$collection:test:huhu');

            expect(payload)
              .to.equal(123)

            return Promise.resolve({ test:1234 });
          };


          let res = coll.exec('huhu', 123);

          expect(res)
            .to.be.an.instanceof(Promise);

          return res.then(res => {

            expect(res)
              .to.equal({ test:1234 });

          });

        });

      });


      describe('subscribe(observer)', () => {

        it('should be a function', () => {

          expect(coll.subscribe)
            .to.be.a.function();

        });


      });

    });

  });



});
