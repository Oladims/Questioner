const responses = {};

responses.errorProcessing = (err, req, res) => res.status(500).json({
  status: 500,
  error: 'Error processing...',
  errorDetails: err,
});

responses.alreadyExist = (field, req, res) => res.status(403).json({
  status: 403,
  error: `${field} already exist`,
});

responses.nonExisting = (field, req, res) => res.status(404).json({
  status: 404,
  error: `${field} does not exist`,
});

responses.nonExistingYet = (field1, field2, req, res) => res.status(404).json({
  status: 404,
  error: `There are no ${field1} yet for this ${field2}`,
});

responses.incorrectPassword = (req, res) => res.status(400).json({
  status: 400,
  error: 'Incorrect Password',
});

responses.validationError = (error, req, res) => res.status(400).json({
  status: 400,
  error: error.details[0].message,
});

export default responses;
