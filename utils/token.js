const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username
  };
  return jwt.sign(payload, 'your_secret_key', { expiresIn: '12h' });
};

const verifyToken = (token, callback) => {
  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) return callback(err, null);
    return callback(null, decoded);
  });
};

module.exports = { generateToken, verifyToken };
