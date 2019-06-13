/* eslint-disable no-console */
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../../../index';
import userData from '../fixtures/userData';
import db from '../../../configs/db';

chai.use(chaiHttp);

const { firstName, lastName, password } = userData;

describe('Tests for user authentication', () => {
  it('should signup user if all credentials are valid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName, lastName, email: 'test@test.com', password,
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.equal(true);
        expect(res.body).to.haveOwnProperty('message')
          .to.be.a('string');
        expect(res.body.message).to.equal(
          'Account successfully created for John Doe',
        );
        expect(res.body).to.haveOwnProperty('token')
          .to.be.a('string');
        expect(res.body).to.haveOwnProperty('data')
          .to.be.an('object');
        done();
      });
  });

  it('should not signup user if email has already been used', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName,
        lastName,
        email: 'test@test.com',
        password,
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(409);
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.equal(false);
        expect(res.body)
          .to.haveOwnProperty('message')
          .to.be.a('string');
        expect(res.body.message).to.equal(
          'Email has already been used',
        );
        done();
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
