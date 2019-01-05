import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
const { expect } = chai

import { questionRecords as questionRecords } from '../db/db';


chai.use(chaiHttp);

describe('Questions', () => {
    describe('GET all questions', () => {
        it('should all questions and an empty array if not found', (done) => {
            chai.request(app)
                .get('/api/v1/questions')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('data');
                    done();
                });
        });
    });

    describe('POST questions', () => {
        it('it should return 400 if some fields are missing', (done) => {
            chai.request(app)
                .post('/api/v1/questions')
                .send({
                    "meetup": "",
                    "title": "",
                    "body": "",
                    "createdBy": ""
                })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('error');
                    done();
                });
        });

        it('it should return 400 if meetup id is invalid', (done) => {
            chai.request(app)
                .post('/api/v1/questions')
                .send({
                    "meetup": "acf",
                    "title": 'kvxbivlb',
                    "body": "icnknoc i oil wn cik nw",
                    "createdBy": 3,
                })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('error');
                    done();
                });
        });

        it('it should return 400 if userid(createdBy) is invalid', (done) => {
            chai.request(app)
                .post('/api/v1/questions')
                .send({
                    "meetup": 1,
                    "title": 'kvxbivlb',
                    "body": "icnknoc i oil wn cik nw",
                    "createdBy": "alk",
                })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('error');
                    done();
                });
        });

        it('should return 201 if question is created successfully', (done) => {
            chai.request(app)
                .post('/api/v1/questions')
                .send(questionRecords[0])
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('data');
                    done();
                });
        });

        it('should create question with appropriate id', (done) => {
            chai.request(app)
                .post('/api/v1/questions')
                .send(questionRecords[1])
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('data');
                    done();
                });
        });
    });

    describe('upvote questions', () => {
        it('should return 404 if id does not exist', (done) => {
            chai.request(app)
                .patch('/api/v1/questions/letter/upvote')
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('error');
                    done();
                });
        });

        it('should return 200 if request is successfull', (done) => {
            chai.request(app)
                .patch('/api/v1/questions/1/upvote')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('data');
                    done();
                });
        });
    });

    describe('downvote question', () => {
        it('should return 404 if id does not exist', (done) => {
            chai.request(app)
                .patch('/api/v1/questions/letter/downvote')
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('error');
                    done();
                });
        });

        it('should return 200 if request is successfull', (done) => {
            chai.request(app)
                .patch('/api/v1/questions/1/downvote')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('data');
                    done();
                });
        });
    });
});

