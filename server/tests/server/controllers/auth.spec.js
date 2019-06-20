/* eslint-disable no-console */
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../../../index';
import userData from '../fixtures/userData';
import db from '../../../configs/db';
import User from '../../../models/user';

chai.use(chaiHttp);

describe('API test for user authentication', () => {
  describe('POST /api/v1/auth/signup', () => {
    it('should signup user if all credentials are valid', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          ...userData,
          email: 'test@test.com',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body.success).to.equal(true);
          expect(res.body)
            .to.haveOwnProperty('message')
            .to.be.a('string');
          expect(res.body.message).to.equal('Account successfully created for John Doe');
          expect(res.body)
            .to.haveOwnProperty('token')
            .to.be.a('string');
          expect(res.body)
            .to.haveOwnProperty('data')
            .to.be.an('object');
          done();
        });
    });

    it('should not signup user if email has already been used', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          ...userData,
          email: 'test@test.com',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(409);
          expect(res.body).to.be.an('object');
          expect(res.body.success).to.equal(false);
          expect(res.body)
            .to.haveOwnProperty('message')
            .to.be.a('string');
          expect(res.body.message).to.equal('Email has already been used');
          done();
        });
    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('should login user if all credentials are valid', async () => {
      const user = await User.create({ ...userData, email: 'login@email.com' });
      const res = await chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: user.email,
          password: userData.password,
        });
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(true);
      expect(res.body)
        .to.haveOwnProperty('message')
        .to.be.a('string');
      expect(res.body.message).to.equal('John Doe is logged in');
      expect(res.body)
        .to.haveOwnProperty('token')
        .to.be.a('string');
    });

    it('should not login user if a wrong password is provided', done => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'login@email.com',
          password: 'wrong-password',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.success).to.equal(false);
          expect(res.body)
            .to.haveOwnProperty('message')
            .to.be.a('string');
          expect(res.body.message).to.equal('Invalid login credentials');
          done();
        });
    });

    it('should not login user if a wrong email is provided', done => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'wrong-email@email.com',
          password: 'password',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.success).to.equal(false);
          expect(res.body)
            .to.haveOwnProperty('message')
            .to.be.a('string');
          expect(res.body.message).to.equal('Invalid login credentials');
          done();
        });
    });
  });
});

after(() => {
  db.dropCollection('users', (err, result) => {
    if (err) {
      console.log('An error occured!', err);
    } else {
      console.log('Users table successfully deleted!', result);
    }
  });
});
