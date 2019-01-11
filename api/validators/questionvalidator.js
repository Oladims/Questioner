export default (req, res, next) => {
  const errors = {};
  const question = req.body;
  const {
    meetup, title, body, createdBy,
  } = question;

  const fields = [meetup, title, body, createdBy];
  let emptyField;
  const correctInt = /^(-|\+)?(\d+|Infinity)$/;
  const filterInt = (value) => {
    if (correctInt.test(value)) {
      return Number(value);
    }
    return NaN;
  };

  fields.map((field) => {
    if (!field) {
      emptyField = true;
    }
    return emptyField;
  });
  if (emptyField) {
    return res.status(400).send({
      status: 400,
      error: 'Please fill all empty fields.',
    });
  }

  if (!filterInt(fields[0])) {
    errors.meetup = 'Meetup id should be a number';
  }
  if (!filterInt(fields[3])) {
    errors.createdBy = 'User id should be a number';
  }
  if (Object.keys(errors).length > 0) {
    return res.status(400).send({
      status: 400,
      error: errors,
    });
  }
  return next();
};
