export default (req, res, next) => {
  const correctInput = /[!@#$%^&*()_+\-=[\]{};':"\\|<>/?]/;
  const correctDate = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
  const meetup = req.body;
  const {
    topic, location, happeningOn,
  } = meetup;
  const fields = [topic, location, happeningOn];
  const meetupErrors = {};
  let emptyField;
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

  if (correctInput.test(meetup.topic)) {
    meetupErrors.Topic = 'Meetup title should contain only alphabets and numbers.';
  }

  if (correctInput.test(meetup.location)) {
    meetupErrors.Location = 'Location should contain only alphabets and numbers.';
  }
  if (!correctDate.test(meetup.happeningOn)) {
    meetupErrors.date = 'Enter a valid date and time';
  }
  if (Object.keys(meetupErrors).length !== 0) {
    return res.status(400).send({
      status: 400,
      error: meetupErrors,
    });
  }
  return next();
};
