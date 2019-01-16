import Joi from 'joi';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const auth = {};

auth.validateUsers = (user) => {
  const userSchema = {
    firstname: Joi.string().regex(/^[A-Z]+$/).uppercase().required(),
    lastname: Joi.string().regex(/^[A-Z]+$/).uppercase().required(),
    email: Joi.string().email().lowercase().required(),
    phonenumber: Joi.string().required(),
    password: Joi.string().min(7).alphanum().required().strict(),
    username: Joi.string().required()
  };
  return Joi.validate(user, userSchema );
};

auth.validateSignIn = (user) => {
  const loginSchema = {
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(7).alphanum().required().strict()
  };
  return Joi.validate(user, loginSchema);
};

auth.validateComments = (comment) => {
  const commentSchema = {
    question: Joi.number().integer().positive(),
    title: Joi.string().required(),
    body: Joi.string().required(),
    comment: Joi.string().required(),
  };
  return Joi.validate(comment, commentSchema );
};

auth.generateToken = (user) => {
  return jwt.sign({
      id: user.id
    },
    process.env.JWT_SECRET, 
    { 
      expiresIn: '1d' 
    });
}


auth.hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

auth.comparePassword = (reqPassword, hashedPassword) => {
  return bcrypt.compareSync(reqPassword, hashedPassword)
}

export default auth;
