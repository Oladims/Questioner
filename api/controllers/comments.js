import db from '../database';
import auth from '../validators/auth';
import responses from '../validators/responses';

export default class userController {
  static comments(req, res) {
    const { error } = auth.validateComments(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
      const {
        question, title, body, comment } = req.body;
      const queryString = 'INSERT INTO comments (firstname, lastname, email, phonenumber, password, username ) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
      const params = [ question, title, body, comment ];
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

 
}
