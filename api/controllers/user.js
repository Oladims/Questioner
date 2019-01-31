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
      firstname, lastname, othername, email, phonenumber, username, password,
    } = req.body;
    const hashedPassword = auth.hashPassword(password);
    return db.query(`SELECT email FROM users WHERE email = '${email}'`, (err, result) => {
      if (err) {
        return responses.errorProcessing(req, res);
      }
      if (result.rowCount > 0) {
        return responses.alreadyExist('Email', req, res);
      }
      const queryString = 'INSERT INTO users (firstname, lastname, othername, email, phonenumber, password, username ) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
      const params = [firstname, lastname, othername, email, phonenumber, hashedPassword, username];
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
            user,
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
          return res.status(200).json({
            status: 200,
            data: [{
              token,
              user,
            }],
          });
        }
        return responses.incorrectPassword(req, res);
      }
      return responses.nonExistingAccount(req, res);
    });
  }
}
