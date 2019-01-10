export default (req, res, next) => {
  const correctInput = /[!@#$%^&*()_+\-=[\]{};':"\\|<>/?]/;
  const correctDate = /[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}/;
  const meetup = req.body;

  const meetuperrors = {};

  if (correctInput.test(meetup.title)) {
    meetuperrors.validtitle = 'Meetup title should contain only alphabets and numbers.';
  }
  if (correctInput.test(meetup.location)) {
    meetuperrors.validtitle = 'Location should can contain only alphabets and numbers.';
  }
  if (!correctDate.test(meetup.happeningOn)) {
    meetuperrors.date = 'Enter a valid date and time';
  }
  if (Object.keys(meetuperrors).length !== 0) {
    return res.status(400).send({
      status: 400,
      error: meetuperrors,
    });
  }
  return next();
};
