const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const authenticateToken = (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token =
    authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : null;

  if (token === null) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' }); // Unauthorized
  }

  // Verify the token
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden: Invalid token' }); // Forbidden
    }
    req.user = user; // Attach the user info to the request object
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = { authenticateToken };
