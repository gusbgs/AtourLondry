// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    data: null,
    message: err.message || 'Internal Server Error',
    errors: err.errors || null,
  });
};

module.exports = errorHandler;
