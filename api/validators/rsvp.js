import Joi from 'joi';

export default (req, res, next) => {
  const rsvp = req.body;
  const schema = {
    meetup: Joi.number().integer().positive().required(),
    topic: Joi.string().min(6).required(),
    response: Joi.any().valid(['yes', 'no', 'maybe']).required(),
  };

  const result = Joi.validate(rsvp, schema);
  if (result.error) {
    return res.status(400).send({
      status: 400,
      error: result.error.details[0].message,
    });
  }
  return next();
};
