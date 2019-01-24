import Joi from 'joi';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Joidate from 'joi-date-extensions';
import moment from 'moment';

const dateJoi = Joi.extend(Joidate);
const auth = {};

auth.validateUsers = (user) => {
  const userSchema = {
    firstname: Joi.string().regex(/^[A-Z]+$/).uppercase().required(),
    lastname: Joi.string().regex(/^[A-Z]+$/).uppercase().required(),
    othername: Joi.string().regex(/^[A-Z]+$/).uppercase(),
    email: Joi.string().email().lowercase().required(),
    phonenumber: Joi.string().required(),
    password: Joi.string().min(7).alphanum().required()
.strict(),
    username: Joi.string(),
  };
  return Joi.validate(user, userSchema);
};

auth.validateSignIn = (user) => {
  const loginSchema = {
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(7).alphanum().required()
.strict(),
  };
  return Joi.validate(user, loginSchema);
};


auth.validateMeetups = (meetup) => {
  const meetupSchema = {
    images: Joi.any(),
    topic: Joi.string().min(6).required(),
    location: Joi.string().min(6).required(),
    name: Joi.string().min(3).required(),
    description: Joi.string().min(15).required(),
    happeningOn: dateJoi.date().format('DD-MM-YYYY').required(),
    tags: Joi.any().tags([]),
    createdOn: moment().format('DD-MM-YYYY'),
  };
  return Joi.validate(meetup, meetupSchema);
};

auth.validateQuestions = (question) => {
  const questionSchema = {
    createdBy: Joi.number().integer().positive().required(),
    meetup: Joi.number().integer().positive().required(),
    title: Joi.string().min(6).required(),
    body: Joi.string().min(6).required(),
    votes: Joi.number().integer(),
  };
  return Joi.validate(question, questionSchema);
};

auth.validateId = (id) => {
  const idSchema = {
    id: Joi.number().integer().positive().required(),
  };
  return Joi.validate({ id }, idSchema);
};

auth.validateRsvp = (rsvp) => {
  const rsvpSchema = {
    userId: Joi.number().integer().positive().required(),
    response: Joi.any().valid(['yes', 'no', 'maybe']).required(),
  };
  return Joi.validate(rsvp, rsvpSchema);
};

auth.generateToken = (user) => jwt.sign({
    id: user.id,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: '1d',
  });

auth.hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(8));

auth.comparePassword = (reqPassword, hashedPassword) => bcrypt.compareSync(reqPassword, hashedPassword);

export default auth;
