const db = require('../database/db');

const add = (requestBody, ip_addres, callback) => {

    let ip_address;
    if(requestBody.table == 'logs'){
        requestBody.ip_address = ip_addres;
    }
       
    let sql = 'INSERT INTO '+requestBody.table+' (';

    delete requestBody.table;

    const keys = Object.keys(requestBody);
    const values = Object.values(requestBody); 
    
    sql += keys+' ) VALUES(';
    
    for(var i = 0; i < values.length; i++){
          sql += '?';
          if (i !== values.length - 1) {
                sql += ', ';
            }
    }
    
    sql += ')';

    db.query(sql, [...values], (err, results) => {
        if(err) return callback(err, null);
        return callback(null, results);
    })

}


const edit = (requestBody, callback) => {
    let sql = 'UPDATE '+requestBody.table+' SET ';
    const RecordID = requestBody.RecordID;
    delete requestBody.table;
    delete requestBody.RecordID;
    const keys = Object.keys(requestBody);
    const values = Object.values(requestBody);

    for(var i = 0; i < keys.length; i++){
            sql+= keys[i]+' = ?';

            if (i !== values.length - 1) {
                sql += ', ';
            }
    }

    sql += ' WHERE RecordID = ?';
    db.query(sql, [...values, RecordID], (err, results) => {
        if(err) return callback(err, null);
        return callback(null, results);
    })
}


const deleteRecord = (requestBody, callback) => {
    let sql = 'DELETE from '+ requestBody.table + ' WHERE RecordID = ?';

    db.query(sql, [requestBody.RecordID], (err, results) => {
        if(err) return callback(err, null);
        return callback(null, results);
    })
}


const showData = (requestBody, RecordID, callback) => {
    let sql = 'SELECT * FROM '+ requestBody.table;
        
    if (RecordID && RecordID > 0) {
        sql += ` WHERE RecordID = ${RecordID}`;
    }

    db.query(sql, (err, results) => {
        if (err) return callback(err, null);
        return callback(null, results);
    });
}

module.exports = { add, edit, deleteRecord, showData }