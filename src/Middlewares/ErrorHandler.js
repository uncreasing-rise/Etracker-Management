const winston = require('winston');

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: 'error.log' }),
  ],
});

// Error handler middleware
const errorHandler = (err, req, res, next) => {
  // Log the error
  logger.error(`Error: ${err.message}`, { stack: err.stack });

  // Respond to the client
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server Error',
  });
  next();
};

module.exports = errorHandler;
