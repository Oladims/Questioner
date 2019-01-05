import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;

chai.use(chaiHttp);

describe('User can view frontend pages', () => {
    it('should detect invalid routes', (done) => {
      const res = chai.request(app)
        .get('/api/v1/')
        .end((err, res) => {
          if (err) throw err;
          expect(res).to.have.status(200);
          done();
        });
    });
  });
