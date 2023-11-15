const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./server.js'); // Adjust the path accordingly

chai.use(chaiHttp);
const expect = chai.expect;

describe('User Management Service', () => {
  it('should create a new user', (done) => {
    chai
      .request(app)
      .post('/users')
      .send({ username: 'john_doe', email: 'john@example.com' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should get all users', (done) => {
    chai
      .request(app)
      .get('/users')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});
