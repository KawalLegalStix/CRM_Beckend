// models/User.js
const db = require('../database/db');
const bcrypt = require('bcryptjs');

const User = {
  createUser: (username, password, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;
        db.query(
          'INSERT INTO users (username, password) VALUES (?, ?)',
          [username, hash],
          (err, result) => {
            if (err) return callback(err, null);
            return callback(null, result);
          }
        );
      });
    });
  },

  loginUser: (requestBody, callback) => {
      const { username, password } = requestBody;
      const updateQuery = `
        UPDATE users
        SET last_login = CURRENT_TIMESTAMP
        WHERE username = ? AND password = ?;
      `;
    
      const selectQuery = `
        SELECT users.*, roles.name AS RoleName FROM users 
        INNER JOIN roles ON roles.RecordID = users.role_id
        WHERE username = ? AND password = ?;
      `;
    
      db.query(updateQuery, [username, password], (updateErr, updateResult) => {
        if (updateErr) return callback(updateErr, null);
    
        db.query(selectQuery, [username, password], (selectErr, selectResult) => {
          if (selectErr) return callback(selectErr, null);
    
          const user = selectResult[0];
          return callback(null, user);
        });
      });
    },
  


  fetchUsers: (callback) => {
        db.query('SELECT users.*, roles.name AS RoleName FROM users INNER JOIN roles ON roles.RecordID = users.role_id', (err, result) => {
          if (err) return callback(err, null);
          return callback(null, result);
        });
  }
};

module.exports = User;
