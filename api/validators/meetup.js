import Joi from 'joi';
import Joidate from 'joi-date-extensions';

const dateJoi = Joi.extend(Joidate);

export default (req, res) => {
  const meetup = req.body;
  const schema = {
    id: Joi.number().integer().positive(),
    topic: Joi.string().min(6).required(),
    location: Joi.string().min(6).required(),
    happeningOn: dateJoi.date().min('now').required(),
    tags: Joi.any().tags([]),
  };

  return Joi.validate(meetup, schema);

};
