import moment from 'moment';
import db from '../database';
import auth from '../validators/auth';
import responses from '../validators/responses';

export default class userController {
  static signup(req, res) {
    const { error } = auth.validateUsers(req.body);
    if (error) {
      return responses.validationError(error, req, res);
    }
    const {
      firstname, lastname, othername, email, phonenumber, username, password, isadmin,
    } = req.body;
    const registered = moment();
    const hashedPassword = auth.hashPassword(password);
    return db.query(`SELECT email FROM users WHERE email = '${email}'`, (err, result) => {
      if (err) {
        return responses.errorProcessing(req, res);
      }
      if (result.rowCount > 0) {
        return responses.alreadyExist('Email', req, res);
      }
      const queryString = 'INSERT INTO users (firstname, lastname, othername, email, phonenumber, password, username, registered, isadmin) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
      const params = [firstname, lastname, othername, email, phonenumber, hashedPassword, username, registered, isadmin];
      return db.query(queryString, params, (err, result) => {
        if (err) {
          return res.status(500).json({
            status: 500,
            error: err,
          });
        }
        const user = result.rows[0];
        const token = auth.generateToken(user);
        return res.status(201).json({
          status: 201,
          data: [{
            token,
            user: {
              id: user.id,
              firstname: user.firstname,
              lastname: user.lastname,
              othername: user.othername,
              username: user.username,
              email: user.email,
              phonenumber: user.phonenumber,
              registered: user.registered,
              isadmin: user.isadmin,
            },
          }],
        });
      });
    });
  }

  static login(req, res) {
    const { error } = auth.validateSignIn(req.body);
    if (error) {
      return responses.validationError(error, req, res);
    }
    const { email, password } = req.body;
    return db.query(`SELECT * FROM users WHERE email = '${email}'`, (err, result) => {
      if (err) {
        return responses.errorProcessing(err, req, res);
      }
      if (result.rowCount > 0) {
        const user = result.rows[0];
        if (auth.comparePassword(password, user.password.trim())) {
          delete user.password;
          const token = auth.generateToken(user);
          return res.status(201).json({
            status: 201,
            data: [{
              token,
              user,
            }],
          });
        }
        return responses.incorrectPassword(req, res);
      }
      return responses.nonExisting('Account', req, res);
    });
  }

  static getUsersCount(req, res) {
    const queryString = 'SELECT * FROM users';
    return db.query(queryString, [], (err, result) => {
      if (err) {
        responses.errorProcessing(err, req, res);
      }
      const data = result.rowCount;
      return res.status(200).json({
        status: 200,
        data,
      });
    });
  }
}
