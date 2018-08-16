import request from 'supertest';
import chai from 'chai';
import server from '../../server';
import testData from '../faker/orderFaker';
import { validToken, adminToken } from '../../test/test/user.test';

const { expect } = chai;

describe('Book-a-meal Order Test', () => {
  it('should load the api home page', (done) => {
    request(server)
      .get('/api/v1/')
      .expect(200)
      .end((err) => {
        if (err) {
          done(err);
        } 
        done();
      });
  });
  it('should return error if token is not present when making order', (done) => {
    request(server)
      .post('/api/v1/orders')
      .send(testData.newOrder)
      .end((error, res) => {
        expect(403);
        expect(res.body.message).to.include('You need to sign up or login');
        if (error) done(error);
        done();
      });
  });


  it('should return error if token is not vaild when making ORDER', (done) => {
    request(server)
      .post('/api/v1/orders')
      .send(testData.newOrder)
      .set('Authorization', 'jdjdjdjdjdj')
      .end((error, res) => {
        expect(403);
        expect(res.body.message).to.include('Authentication failed');
        if (error) done(error);
        done();
      });
  });

  it('should return 403 if login is User and Order is empty', (done) => {
    request(server)
      .post('/api/v1/orders')
      .send(testData.newOrder7)
      .set('Authorization', validToken.token)
      .end((error, res) => {
        expect(400);
        expect(res.body.errorMessage).to.include('input meal Orders');
        if (error) done(error);
        done();
      });
  });

  it('should return error if login user quantity is empty', (done) => {
    request(server)
      .post('/api/v1/orders')
      .send(testData.newOrder4)
      .set('Authorization', validToken.token)
      .end((error, res) => {
        expect(400);
        expect(res.body.errorMessage).to.include('input meal Orders');
        if (error) done(error);
        done();
      });
  });

  it(
    'should save Order to database if login is ' +
      'user and body is filed correctly',
    (done) => {
      request(server)
        .post('/api/v1/orders')
        .send(testData.newOrder5)
        .set('Authorization', validToken.token)
        .end((error, res) => {
          expect(201);
          expect(res.body.data)
          if (error) done(error);
          done();
        });
    },
  );

  it(
    'should return 201 if login is ' +
    'user and body is filled correctly',
    (done) => {
      request(server)
        .post('/api/v1/orders')
        .send(testData.newOrder5)
        .set('Authorization', validToken.token)
        .end((error, res) => {
          expect(201);
          expect(res.body.data)
          if (error) done(error);
          done();
        });
    },
  );
  it(
    'should return 400 if login is ' +
    'user and Order body is empty',
    (done) => {
      request(server)
        .post('/api/v1/orders')
        .send(testData.newOrder8)
        .set('Authorization', validToken.token)
        .end((error, res) => {
          expect(400);
          expect(res.body.message).to.include('Order input Errors')
          if (error) done(error);
          done();
        });
    },
  );
  it(
    'should return 400 if login is ' +
    'user and Order body contains invalid data',
    (done) => {
      request(server)
        .post('/api/v1/orders')
        .send(testData.newOrder9)
        .set('Authorization', validToken.token)
        .end((error, res) => {
          expect(400);
          expect(res.body.message).to.include('Meal Id and quantity must be an Integer')
          if (error) done(error);
          done();
        });
    },
  );
  it(
    'should return 200 if login is ' +
    'user update is successful',
    (done) => {
      request(server)
        .put('/api/v1/orders/1')
        .send(testData.newUpdate)
        .set('Authorization', validToken.token)
        .end((error, res) => {
          expect(200);
          expect(res.body.result)
            .to.include('updated');
          if (error) done(error);
          done();
        });
    },
  );
  it('should fail to return all the ORDER in database, if user is not valid', (done) => {
    request(server)
      .get('/api/v1/orders')
      .set('Authorization', 'fjhFJfvuiuivwov')
      .end((error, res) => {
        expect(403);
        expect(res.body.message).to.include('You have to be an admin');
        if (error) done(error);
        done();
      });
  });

  // it('should return all the ORDERs in database, if user is an admin', (done) => {
  //   request(server)
  //     .get('/api/v1/orders')
  //     .set('Authorization', adminToken.token)
  //     .end((error, res) => {
  //       expect(200);
  //       expect(res.body.result).to.include('success');
  //       if (error) done(error);
  //       done();
  //     });
  // });

  it('should return 403 if no token', (done) => {
    request(server)
      .get('/api/v1/orders/')
      .end((error, res) => {
        expect(403);
        expect(res.body.message).to.include('You need to sign up or login');
        if (error) done(error);
        done();
      });
  });
  it('should return error if ORDER route is incorrect', (done) => {
    request(server)
      .get('/api/v1/ord')
      .set('Authorization', validToken.token)
      .end((error, res) => {
        expect(404);
        if (error) done(error);
        done();
      });
  });
});

