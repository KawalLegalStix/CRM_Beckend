const GNModel = require('../models/GNModel');

const add = (req, res) => {
    try{
        
         GNModel.add(req.body, req.ip, (error, data) => {
            if (error) {
                res.status(500).json({ status:500, success: false, message: 'Failed.', error: error.message }); //display error
                } else {
                    if (!data) {
                        res.status(404).json({ status:404, success: false, message: 'Failed.' });
                    } else {
                        res.status(200).json({ status:200, success: true, message: 'Data Inserted.' });
                    }
                }
         })

    }catch(err){
            res.status(500).json({ status:500, error: err.message, success: false, message: 'An error occurred while adding data.' });
    }
}

const edit = (req, res) => {
    try{
        
         GNModel.edit(req.body, (error, data) => {
            if (error) {
                res.status(500).json({ status:500, success: false, message: 'Failed.', error: error.message }); //display error
                } else {
                    if (!data) {
                        res.status(404).json({ status:404, success: false, message: 'Failed.' });
                    } else {
                        // res.send(data);
                        res.status(200).json({ status:200, success: true, message: 'Data Updated.' });
                    }
                }
         })

    }catch(err){
            res.status(500).json({ status:500, error: err.message, success: false, message: 'An error occurred while updating Record.' });
    }
}


const deleteRecord = (req, res) => {
    try{
        
         GNModel.deleteRecord(req.body, (error, data) => {
            if (error) {
                res.status(500).json({ status:500, success: false, message: 'Failed.', error: error.message }); //display error
                } else {
                    if (!data) {
                        res.status(404).json({ status:404, success: false, message: 'Failed.' });
                    } else {
                        // res.send(data);
                        res.status(200).json({ status:200, success: true, message: 'Data Deleted.' });
                    }
                }
         })

    }catch(err){
            res.status(500).json({ status:500, error: err.message, success: false, message: 'An error occurred while deleting Record.' });
    }
}

const showData = (req, res) => {
    try{
        
         GNModel.showData(req.body, req.params.RecordID,  (error, data) => {
            if (error) {
                res.status(500).json({ status:500, success: false, message: 'Failed.', error: error.message }); //display error
                } else {
                    if (!data) {
                        res.status(404).json({ status:404, success: false, message: 'Failed.' });
                    } else {
                        // res.send(data);
                        res.status(200).json({ status:200, success: true, message: 'Data Fetched.', data: data });
                    }
                }
         })

    }catch(err){
            res.status(500).json({ status:500, error: err.message, success: false, message: 'An error occurred while fetching Records.' });
    }
}

module.exports = {add, edit, deleteRecord, showData}