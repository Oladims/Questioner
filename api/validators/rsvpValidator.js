export default (req, res, next) => {
  const errors = {};
  const rsvp = req.body;
  const { meetup } = rsvp;
  const { response } = rsvp;

  const responses = ['yes', 'no', 'maybe'];

  const fields = [meetup, response];
  let emptyField;
  fields.map((field) => {
    if (!field) {
      emptyField = true;
    }
    return emptyField;
  });
  if (emptyField) {
    return res.status(400)
      .send({ status: 400, error: 'Please fill in all fields.' });
  }
  if (!responses.includes(response.toLowerCase())) {
    errors.response = 'Please insert a valid response.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).send({ status: 400, error: errors });
  }
  return next();
};
