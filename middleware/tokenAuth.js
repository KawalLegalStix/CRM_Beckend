const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'] || req.query.token || req.body.token;

  // Check if token is present
  if (!token) {
    return res.status(403).json({ success: false, message: 'Token is required' });
  }

  // Verify the token
  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    // If token is valid, attach the decoded payload to the request object
    req.decoded = decoded;
    next(); // Move to the next middleware or route handler
  });
};

module.exports = verifyToken;
