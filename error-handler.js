module.exports = function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  res.status(500).send(err.toString());
};
