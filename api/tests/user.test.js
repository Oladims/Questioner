import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
const { expect } = chai

const signup = {
    'firstname': 'Pogba',
    'lastname': 'Pogba',
    'othername': 'Pogba',
    'username': 'Pogba',
    'email': 'Pogba@test.com',
    'phonenumber': '08037139168',
    'password': 'pogba1234',
};
const signup_invalidDetails = {
    'firstname': 'Pogba12',
    'lastname': 'Pogba.;',
    'othername': 'Pogba12',
    'username': 'Pogba11112132',
    'email': 'Pogba1@testom',
    'phonenumber': '08037139168',
    'password': 'pogb4',
};
const signup_existingEmail = {
    'firstname': 'Pogba',
    'lastname': 'Pogba',
    'othername': 'Pogba',
    'username': 'Pogba',
    'email': 'demo1@demo.com',
    'phonenumber': '08037139168',
    'password': 'pogba1234',
};
const signup_existingUsername = {
    'firstname': 'Pogba',
    'lastname': 'Pogba',
    'othername': 'Pogba',
    'username': 'Pogba',
    'email': 'Pogba1@test.com',
    'phonenumber': '08037139168',
    'password': 'pogba1234',
};

const login = {
    'email': 'demo1@demo.com',
    'password': 'oladimeji',
};

const login_invalidPassword = {
    'email': 'demo1@demo.com',
    'password': 'incorrectPassword',
};

const login_invalidUser = {
    'email': 'error@error.com',
    'password': 'errorerror',
};

const login_invalidEmailFormat = {
    'email': 'error.com',
    'password': 'errorerror',
};

describe('/POST /api/v1/user/signup', () => {
    it('return 201 if user is created successfully', (done) => {
        chai.request(app)
            .post('/api/v1/user/signup')
            .send(signup)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('data');
                done();
            });
    });
    it('return 400 if user details are not in valid format', (done) => {
        chai.request(app)
            .post('/api/v1/user/signup')
            .send(signup_invalidDetails)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                done();
            });
    });
    it('return 403 if user Email already exist', (done) => {
        chai.request(app)
            .post('/api/v1/user/signup')
            .send(signup_existingEmail)
            .end((err, res) => {
                expect(res).to.have.status(403);
                expect(res.body).to.have.property('error');
                done();
            });
    });
    it('return 500 if username already exist', (done) => {
        chai.request(app)
            .post('/api/v1/user/signup')
            .send(signup_existingUsername)
            .end((err, res) => {
                expect(res).to.have.status(500);
                expect(res.body).to.have.property('error');
                done();
            });
    });
});

describe('/POST /api/v1/user/login', () => {
    it('return 201 if login is successfull', (done) => {
        chai.request(app)
            .post('/api/v1/user/login')
            .send(login)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('data');
                done();
            });
    });
    
    it('return 400 if password is invalid', (done) => {
        chai.request(app)
            .post('/api/v1/user/login')
            .send(login_invalidPassword)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                done();
            });
    });
    
    it('return 404 if user does not exist', (done) => {
        chai.request(app)
            .post('/api/v1/user/login')
            .send(login_invalidUser)
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('error');
                done();
            });
    });
   
    it('return 400 if login details are invalid', (done) => {
        chai.request(app)
            .post('/api/v1/user/login')
            .send(login_invalidEmailFormat)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                done();
            });
    });
});
