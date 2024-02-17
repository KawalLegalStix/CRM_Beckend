const db = require('../database/db');

const Task = {
     
      createTask: (requestBody, callback) => {
            const { task, remarks, created_by, location, ip_address, asssigned_to, eta } = requestBody;

            db.query('INSERT INTO tasks(task, remarks, created_by, location, ip_address, AssignedTo, eta) VALUES( ?, ?, ?, ?, ?, ?, ?) ', [ task, remarks, created_by, location, ip_address, asssigned_to, eta ], (err, result) => {
                 if (err) return callback(err, null);
                 return callback(null, result);
            });
      },

      updateTask: (requestBody, callback) => {
        const { RecordID, task, remarks, updated_by, location, ip_address, assigned_to, status, eta } = requestBody;
    
        db.query(
            'UPDATE tasks SET task = ?, eta = ?, remarks = ?, updated_by = ?, location = ?, ip_address = ?, AssignedTo = ?, status = ? WHERE RecordID = ?',
            [task, eta, remarks, updated_by, location, ip_address, assigned_to, status, RecordID],
            (err, result) => {
                if (err) return callback(err, null);
                return callback(null, result);
            }
        );
      },
      
      deleteTask: (requestBody, callback) => {
            const sql = `delete from tasks WHERE RecordID = ?`;

            db.query(sql, [requestBody.RecordID], (err, results) => {
                if(err) return callback(err, null);
                return callback(null, results);
            })
      },

      fetchTask: (req, AssignedTo, callback) => {
            let sql = 'SELECT * FROM tasks';
        
            if (AssignedTo && AssignedTo > 0) {
                sql += ` WHERE AssignedTo = ${AssignedTo} AND status=0`;
            }
        
            db.query(sql, (err, results) => {
                if (err) return callback(err, null);
                return callback(null, results);
            });
        },

      fetchAllTask: (callback) => {
            let sql = 'SELECT * FROM tasks';
            db.query(sql, (err, results) => {
                if (err) return callback(err, null);
                return callback(null, results);
            });
      },

      updateTaskStatus: (requestBody, callback) => {
                const sql = `UPDATE tasks SET status=? WHERE RecordID = ?`;

                db.query(sql, [requestBody.status, requestBody.RecordID], (err, results) => {
                    if(err) return callback(err, null);
                    return callback(null, results);
                })
        },
    
}

module.exports = Task