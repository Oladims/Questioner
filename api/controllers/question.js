import moment from 'moment';
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
    const {
      createdBy, meetup, title, body, votes,
    } = req.body;
    const createdOn = moment();
    const queryString = 'INSERT INTO question (createdBy, createdOn, meetup, title, body) VALUES($1, $2, $3, $4, $5) RETURNING *';
    const params = [createdBy, createdOn, meetup, title, body];
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

  static getQuestionByMeetupId(req, res) {
    
    const { error } = auth.validateId(req.params.id);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
    const queryString = 'SELECT * FROM question WHERE meetup = $1';
    const params = [req.params.id];
    return db.query(queryString, params, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: err,
        });
      }
      const question = result.rows;
      if (result.rowCount > 0) {
        return res.status(200).json({
          status: 200,
          data: [{
            question,
          }],
        });
      }
      return responses.nonExisting('question', req, res);
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
    const queryString = 'SELECT * FROM question WHERE id = $1';
    const params = [req.params.id];
    return db.query(queryString, params, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: err,
        });
      }
      const question = result.rows;
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
    
    const queryString = 'UPDATE question SET votes = 1 WHERE id = $1 returning *';
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
    
    const queryString = 'UPDATE question SET votes = 0 WHERE id = $1 returning *';
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
