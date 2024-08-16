const authorization = (roles) => (req, res, next) => {
  // Ensure req.user and req.user.role are defined
  if (!req.user || !req.user.role) {
    return res.status(401).json({ error: 'Unauthorized: User role not found' });
  }

  // Check if the user's role is included in the allowed roles
  if (roles.includes(req.user.role)) {
    return next(); // User is authorized, proceed to the next middleware/route handler
  }

  // Forbidden: User role is not included in allowed roles
  return res
    .status(403)
    .json({ error: 'Access forbidden: Insufficient permissions' });
};

module.exports = { authorization };
