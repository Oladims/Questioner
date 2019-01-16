import db from '../database';
import auth from '../validators/auth';

export default class questionController {
  static createQuestion(req, res) {
    const { error } = auth.validateQuestions(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
    const {
      createdBy, meetup, title, body, votes,
    } = req.body;
    const queryString = 'INSERT INTO questions (createdBy, meetup, title, body, votes) VALUES($1, $2, $3, $4) RETURNING *';
    const params = [createdBy, meetup, title, body, votes];
    return db.query(queryString, params, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: err,
        });
      }
      const question = result.rows[0];
      const token = auth.generateToken(question);
      return res.status(201).json({
        status: 201,
        data: [{
          token,
          question,
        }],
      });
    });
  }

  static getQuestion(req, res) {
    const { id } = req.params;
    const { error } = auth.validateId(id);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
    const queryString = 'SELECT * FROM questions WHERE id = $1';
    const params = id;
    return db.query(queryString, params, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: err,
        });
      }
      const question = result.rows[0];
      const token = auth.generateToken(question);
      return res.status(201).json({
        status: 201,
        data: [{
          token,
          question,
        }],
      });
    });
  }

  static upvoteQuestion(req, res) {
    const { id } = req.params;
    const { error } = auth.validateId(id);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
    
    const queryString = 'UPDATE questions SET votes = votes + 1 WHERE id = $1';
    const params = id;
    return db.query(queryString, params, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: err,
        });
      }
      const question = result.rows[0];
      const token = auth.generateToken(question);
      return res.status(201).json({
        status: 201,
        data: [{
          token,
          question,
        }],
      });
    });
  }

  static downvoteQuestion(req, res) {
    const { id } = req.params;
    const { error } = auth.validateId(id);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
    
    const queryString = 'UPDATE questions SET votes = votes - 1 WHERE id = $1';
    const params = id;
    return db.query(queryString, params, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: err,
        });
      }
      const question = result.rows[0];
      const token = auth.generateToken(question);
      return res.status(201).json({
        status: 201,
        data: [{
          token,
          question,
        }],
      });
    });
  }
}
