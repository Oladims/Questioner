import Joi from 'joi';
import Joidate from 'joi-date-extensions';

const dateJoi = Joi.extend(Joidate);

export default (req, res, next) => {
  const meetup = req.body;
  const schema = {
    id: Joi.number().integer().positive(),
    topic: Joi.string().min(6).required(),
    location: Joi.string().min(6).required(),
    happeningOn: dateJoi.date().format('YYYY-MM-DD').required(),
    tags: Joi.any().tags([]),
  };

  const result = Joi.validate(meetup, schema);
  if (result.error) {
    return res.status(400).send({
      status: 400,
      error: result.error.details[0].message,
    });
  }
  return next();
};
