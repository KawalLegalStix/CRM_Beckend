const db = require('../database/db');

const createLead = (requestBody, ip_address, callback) => {

      const sql = `INSERT INTO leads 
        (first_name, middle_name, last_name, gender, email, phoneNo, qualification, 
        father_name, father_phoneNo, mother_name, mother_phoneNo, aadhar_number, pan_number, 
        country_id, state_id, city_id, category_id, stage, eligibility, book_counselling, 
        source, appointment_date, remarks, created_by, updated_by, location, status, course, city, IsInterested, year, dayfordemo, profession, follow_up, created_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`;
      
      const values = [
        requestBody.first_name,
        requestBody.middle_name,
        requestBody.last_name,
        requestBody.gender,
        requestBody.email,
        requestBody.phoneNo,
        requestBody.qualification,
        requestBody.father_name,
        requestBody.father_phoneNo,
        requestBody.mother_name,
        requestBody.mother_phoneNo,
        requestBody.aadhar_number,
        requestBody.pan_number,
        requestBody.country_id,
        requestBody.state_id,
        requestBody.city_id,
        requestBody.category_id,
        requestBody.stage,
        requestBody.eligibility,
        requestBody.book_counselling,
        requestBody.source,
        requestBody.appointment_date,
        requestBody.remarks,
        requestBody.created_by,
        requestBody.updated_by,
        requestBody.location,
        requestBody.status,
        requestBody.course,
        requestBody.city,
        requestBody.IsInterested,
        requestBody.year,
        requestBody.dayfordemo,
        requestBody.profession,
        requestBody.follow_up,
       // ip_address
      ];

    db.query(sql, [...values], (err, results) => {
          if(err) return callback(err, null);
          return callback(null, results);
    })
}


const updateLead = (requestBody, ip_address, callback) => {
  const values = [
      requestBody.first_name,
      requestBody.middle_name,
      requestBody.last_name,
      requestBody.gender,
      requestBody.email,
      requestBody.phoneNo,
      requestBody.qualification,
      requestBody.father_name,
      requestBody.father_phoneNo,
      requestBody.mother_name,
      requestBody.mother_phoneNo,
      requestBody.aadhar_number,
      requestBody.pan_number,
      requestBody.country_id,
      requestBody.state_id,
      requestBody.city_id,
      requestBody.category_id,
      requestBody.stage,
      requestBody.eligibility,
      requestBody.book_counselling,
      requestBody.source,
      requestBody.appointment_date,
      requestBody.remarks,
      requestBody.created_by,
      requestBody.updated_by,
      requestBody.location,
      requestBody.status,
      requestBody.course,
      requestBody.city,
      requestBody.IsInterested,
      requestBody.year,
      requestBody.dayfordemo,
      requestBody.profession,
  ];

  const sql = `
          UPDATE leads
          SET
            first_name = ?,
            middle_name = ?,
            last_name = ?,
            gender = ?,
            email = ?,
            phoneNo = ?,
            qualification = ?,
            father_name = ?,
            father_phoneNo = ?,
            mother_name = ?,
            mother_phoneNo = ?,
            aadhar_number = ?,
            pan_number = ?,
            country_id = ?,
            state_id = ?,
            city_id = ?,
            category_id = ?,
            stage = ?,
            eligibility = ?,
            book_counselling = ?,
            source = ?,
            appointment_date = ?,
            remarks = ?,
            created_by = ?,
            updated_by = ?,
            location = ?,
            status = ?,
            course = ?,
            city = ?,
            IsInterested = ?,
            year = ?,
            dayfordemo = ?,
            profession = ?,
            ip_address = ?,
            follow_up = ?
          WHERE RecordID = ?`;

    db.query(sql, [...values, ip_address ,requestBody.follow_up, requestBody.RecordID], (err, results) => {
        if(err) return callback(err, null);
        return callback(null, results);
    })
}


const deleteLead = (requestBody, callback) => {
     const sql = `delete from leads WHERE RecordID = ?`;

     db.query(sql, [requestBody.RecordID], (err, results) => {
          if(err) return callback(err, null);
          return callback(null, results);
     })
}


const fetchLead = (requestBody, callback) => {
  const { monthID, year, IsInterested, date} = requestBody;
  let sqlStr ='';
  

  sqlStr+= `${monthID ? " AND MONTH(created_at) = "+monthID : ""}`;

  sqlStr+= `${year ? " AND YEAR(created_at) = "+year : ""}`;

  sqlStr+= `${IsInterested ? " AND IsInterested = "+IsInterested : ""}`;


  sqlStr+= `${date ? " AND date(created_at) = '"+date+"'" : ""}`;

  const sql = `select * from leads WHERE 1=1 ${sqlStr}`;
  
  db.query(sql, (err, results) => {
       if(err) return callback(err, null);
       return callback(null,  results);
  })
}


const getleads = (callback) => {
  const sql = `select * from leads`;

  db.query(sql, (err, results) => {
       if(err) return callback(err, null);
       return callback(null,  results);
  })
}


module.exports = {createLead, updateLead, deleteLead, fetchLead, getleads}