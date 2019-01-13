export default (req, res, next) => {
  const { id } = req.params;
  const correctInt = /^(-|\+)?(\d+|Infinity)$/;
  const filterInt = (value) => {
    if (correctInt.test(value)) {
      return Number(value);
    }
    return NaN;
  };
  const userId = filterInt(id);

  if (!userId) {
    return res.status(404).send({
      status: 404,
      error: 'Invalid id - Id cannot be found.',
    });
  }
  req.params.id = userId;
  return next();
};
