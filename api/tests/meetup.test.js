
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { meetupRecords as meetupRecords } from '../db/db';
const { expect } = chai

chai.use(chaiHttp);

describe('Meetups', () => {
  describe('POST /meetups', () => {
    it('it should return 201 if meetup is created successfully', (done) => {
    chai.request(app)
        .post('/api/v1/meetups')
        .send(meetupRecords[0])
        .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('data');
          done();
        });
    });
    it('it should return 400 if fields are not complete', (done) => {
    chai.request(app)
        .post('/api/v1/meetups')
        .send({
          topic: "",
          location: "",
          happeningOn: "",
        })
        .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
          done();
        });
    });
    it('it should return 400 if some fields are invalid', (done) => {
    chai.request(app)
        .post('/api/v1/meetups')
        .send({
          "topic": 45,
          "location": "Lagos",
          "happeningOn": "04-09-2015",
      })
        .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
          done();
        });
    });
  });

  describe('GET /meetups', () => {
    it('should return 200', (done) => {
      const res = chai.request(app)
        .get('/api/v1/meetups')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('data');
          done();
          });
    });
  });

  describe('GET /meetups/:id', () => {
    it('should return an 404 when meetup id is invalid', (done) => {
      chai.request(app)
        .get('/api/v1/meetups/invalidId')
        .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error');
          done();
        });
    });
    it('should return 404 if meetup id does not exist', (done) => {
      const res = chai.request(app)
        .get('/api/v1/meetups/2093904')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
            done();
          });
    });

    it('should return 200', (done) => {
      const res = chai.request(app)
        .get('/api/v1/meetups/1')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('data');
            done();
          });
    });
  });

});

