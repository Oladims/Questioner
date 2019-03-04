import moment from 'moment';
import jwt from 'jsonwebtoken';
import db from '../database';
import auth from '../validators/auth';
import responses from '../validators/responses';

export default class questionController {
  static createQuestion(req, res) {
    const { error } = auth.validateQuestions(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
    const token = req.headers.tokens;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const {
      meetupId, title, body, votes,
    } = req.body;
    const createdBy = decoded.id;
    const createdOn = moment();
    const queryString = 'INSERT INTO questions (createdBy, createdOn, meetup, title, body) VALUES($1, $2, $3, $4, $5) RETURNING *';
    const params = [createdBy, createdOn, meetupId, title, body];
    return db.query(queryString, params, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: err,
        });
      }
      const question = result.rows[0];
      return res.status(200).json({
        status: 200,
        data: [{
          question,
        }],
      });
    });
  }

  static comment(req, res) {
    const token = req.headers.tokens;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const {
      comment, question,
    } = req.body;
    const createdBy = decoded.id;
    const createdOn = moment();
    const queryString = 'SELECT * FROM questions WHERE id = $1';
    const params = [question];
    const { error } = auth.validateComments(req.body);
    const queryString2 = 'INSERT INTO comments (createdBy, createdOn, question, comment) VALUES($1, $2, $3, $4) RETURNING *';
    const params2 = [createdBy, createdOn, question, comment];

    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
    return db.query(queryString, params, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: err,
        });
      }
      if (result.rowCount > 0) {
        return db.query(queryString2, params2, (err, result) => {
          if (err) {
            return res.status(500).json({
              status: 500,
              error: err,
            });
          }
          const comments = result.rows[0];
          return res.status(200).json({
            status: 200,
            data: [{
              comments,
            }],
          });
        });
      }
      return responses.nonExisting('question', req, res);
    });
  }

  static getComments(req, res) {
    const { error } = auth.validateId(req.params.id);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
    const queryString = 'SELECT * FROM comments WHERE question = $1';
    const params = [req.params.id];
    return db.query(queryString, params, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: err,
        });
      }
      const data = result.rows;
      if (result.rowCount > 0) {
        return res.status(200).json({
          status: 200,
          data,
        });
      }
      return responses.nonExisting('comment', req, res);
    });
  }

  static getQuestionsCount(req, res) {
      const queryString = 'SELECT * FROM questions';
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

  static getCommentsByUserId(req, res) {
    const token = req.headers.tokens;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const createdBy = decoded.id;
    const queryString = 'SELECT * FROM comments WHERE createdby = $1';
    const params = [createdBy];
    return db.query(queryString, params, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: err,
        });
      }
      const data = result.rows;
      const count = result.rowCount;
      if (result.rowCount > 0) {
        return res.status(200).json({
          status: 200,
          data,
          count,
        });
      }
      return responses.nonExisting('question', req, res);
    });
  }

  static getQuestionsByUserId(req, res) {
    const token = req.headers.tokens;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const createdBy = decoded.id;
    const queryString = 'SELECT * FROM questions WHERE createdby = $1';
    const params = [createdBy];
    return db.query(queryString, params, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: err,
        });
      }
      const data = result.rows;
      const count = result.rowCount;
      if (result.rowCount > 0) {
        return res.status(200).json({
          status: 200,
          data,
          count,
        });
      }
      return responses.nonExisting('question', req, res);
    });
  }

  static getQuestionsByMeetupId(req, res) {
    const { error } = auth.validateId(req.params.id);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
    const queryString = 'SELECT * FROM questions WHERE meetup = $1';
    const params = [req.params.id];
    return db.query(queryString, params, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: err,
        });
      }
      const question = result.rows;
      const count = result.rowCount;
      if (result.rowCount > 0) {
        return res.status(200).json({
          status: 200,
          data: [{
            question,
            count,
          }],
        });
      }
      return responses.nonExistingYet('questions', 'meetup', req, res);
    });
  }

  static getQuestionById(req, res) {
    const { error } = auth.validateId(req.params.id);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
    const queryString = 'SELECT * FROM questions WHERE id = $1';
    const params = [req.params.id];
    return db.query(queryString, params, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: err,
        });
      }
      const data = result.rows;
      if (result.rowCount > 0) {
        return res.status(200).json({
          status: 200,
          data,
        });
      }
      return responses.nonExisting('question', req, res);
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
    
    const queryString = 'UPDATE questions SET votes = 1 WHERE id = $1 returning *';
    const params = [id];
    return db.query(queryString, params, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: err,
        });
      }
      const question = result.rows[0];
      const data = [{
        meetup: question.meetup,
        title: question.title,
        body: question.body,
        votes: question.votes,
      }];
      return res.status(201).json({
        status: 201,
        data: [{
          data,
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
    
    const queryString = 'UPDATE questions SET votes = 0 WHERE id = $1 returning *';
    const params = [id];
    return db.query(queryString, params, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: err,
        });
      }
      const question = result.rows[0];
      const data = [{
        meetup: question.meetup,
        title: question.title,
        body: question.body,
        votes: question.votes,
      }];
      return res.status(201).json({
        status: 201,
        data: [{
          data,
        }],
      });
    });
  }
}
