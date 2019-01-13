import Joi from 'joi';

export default (req, res, next) => {
  const question = req.body;
  const schema = {
    id: Joi.number().integer().positive(),
    createdBy: Joi.number().integer().positive().required(),
    meetup: Joi.number().integer().positive().required(),
    title: Joi.string().min(6).required(),
    body: Joi.string().min(6).required(),
    votes: Joi.number().integer(),
  };

  const result = Joi.validate(question, schema);
  if (result.error) {
    return res.status(400).send({
      status: 400,
      error: result.error.details[0].message,
    });
  }
  return next();
};
