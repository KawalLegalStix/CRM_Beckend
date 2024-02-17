const mysql = require('mysql');

// const pool = mysql.createPool({
//   connectionLimit: 10, // Adjust the number of connections based on your requirements
//   host: '43.230.202.147',
//   user: 'crm_devkawal',
//   password: 'nQl39(De6(~f',
//   database: 'crm_legalstix',
// });

const pool = mysql.createPool({
  connectionLimit: 10, // Adjust the number of connections based on your requirements
  host: '43.231.127.238',
  user: 'crm_devkawals',
  password: 'nQl39(De6(~f',
  database: 'crm_legalstix',
});


pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database!');
  connection.release(); 
});

module.exports = pool;
