export default (req, res, next) => {
    const {id} = req.params; 
    const userId = parseInt(id, 10);
  
    if (!userId) {
      return res.status(404).send({ 
        status: 404,
         error: 'Invalid id - Id cannot be found.' });
    }
    req.params.id = userId;
    return next();
  };