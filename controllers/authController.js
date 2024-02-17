// controllers/authController.js
const User = require('../models/User');
const tokenUtils = require('../utils/token');

const login = (req, res) => {
  const { username, password } = req.body;
  User.loginUser(req.body, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
    } else {
        const token = tokenUtils.generateToken(user);
        res.status(200).json({ success: true, name: user.username, role: user.RoleName, user_id:user.RecordID, category_id:JSON.parse(user.category_id), role_id: user.role_id,token: `Bearer ${token}`, message: 'Login successful' });
    }
  });
};

module.exports = { login };
