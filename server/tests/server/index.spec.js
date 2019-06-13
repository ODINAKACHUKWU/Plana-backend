import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../../index';

chai.use(chaiHttp);

describe('Server', () => {
  it('should return a welcome message', () => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.text).to.equal(`<h1>Welcome to Plana</h1>
            <h3>Plana is a task management solution that helps users to manage todo lists.</h3>
            <p>For any more information please visit our
            <a href='https://github.com/ODINAKACHUKWU/Plana-backend'>
            Github repo!</a></p>
            <h4>Thank you for visiting  &#x1F600;</h4>
            `);
      });
  });

  it('should return Connected to Plana v1 API', () => {
    chai.request(app)
      .get('/api/v1')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Connected to Plana v1 API');
      });
  });

  it('should return Not found', () => {
    chai
      .request(app)
      .get('/api/v1/unavailable')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Not found');
      });
  });
});
