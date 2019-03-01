import Joi from 'joi';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Joidate from 'joi-date-extensions';
// import 'babel-polyfill';
import moment from 'moment';
import db from '../database';

const dateJoi = Joi.extend(Joidate);
class auth {
  static validateUsers(user) {
    const userSchema = {
      firstname: Joi.string().regex(/^[A-Z]+$/).uppercase().required(),
      lastname: Joi.string().regex(/^[A-Z]+$/).uppercase().required(),
      othername: Joi.string().regex(/^[A-Z]+$/).uppercase(),
      email: Joi.string().email().lowercase().required(),
      phonenumber: Joi.string().required(),
      password: Joi.string().min(7).alphanum().required(),
      username: Joi.string(),
      isadmin: Joi.bool(),
    };
    return Joi.validate(user, userSchema);
  }

  static validateSignIn(user) {
    const loginSchema = {
      email: Joi.string().email().lowercase().required(),
      password: Joi.string().min(7).alphanum().required()
        .strict(),
    };
    return Joi.validate(user, loginSchema);
  }

  static validateMeetups(meetup) {
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
  }

  static validateQuestions(question) {
    const questionSchema = {
      meetupId: Joi.number().integer().positive().required(),
      title: Joi.string().min(6).required(),
      body: Joi.string().min(6).required(),
      votes: Joi.number().integer(),
    };
    return Joi.validate(question, questionSchema);
  }

  static validateComments(comment) {
    const commentSchema = {
      question: Joi.number().integer().positive().required(),
      comment: Joi.string().min(6).required(),
    };
    return Joi.validate(comment, commentSchema);
  }

  static validateId(id) {
    const idSchema = {
      id: Joi.number().integer().positive().required(),
    };
    return Joi.validate({ id }, idSchema);
  }

  static validateRsvp(rsvp) {
    const rsvpSchema = {
      response: Joi.any().valid(['yes', 'no', 'maybe']).required(),
    };
    return Joi.validate(rsvp, rsvpSchema);
  }

  static generateToken(user) {
    return jwt.sign({
      id: user.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d',
    });
  }

  static async verifyToken(req, res, next) {
    const token = req.headers.tokens;
    if (!token) {
      return res.status(400).send({
        message: 'Token is not provided',
      });
    }
    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      const text = 'SELECT * FROM users WHERE id = $1';
      const {
        rows,
      } = await db.query(text, [decoded.id]);
      if (!rows[0]) {
        return res.status(400).send({
          message: 'The token you provided is invalid',
        });
      }
      req.user = {
        id: decoded.id,
      };
      
      next();
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  static hashPassword(pass) {
    return bcrypt.hashSync(pass, bcrypt.genSaltSync(10));
  }

  static comparePassword(reqPassword, hashedPassword) {
    return bcrypt.compareSync(reqPassword, hashedPassword);
  }
}

export default auth;
