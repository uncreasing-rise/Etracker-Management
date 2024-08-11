const setHeaders = (req, res, next) => {
  // Set custom headers
  res.setHeader('X-Powered-By', 'Node.js');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Proceed to the next middleware or route handler
  next();
};

module.exports = setHeaders;
