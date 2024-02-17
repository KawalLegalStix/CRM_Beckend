const User = require('../models/User');
const tokenUtils = require('../utils/token');
const Lead = require('../models/Lead');

const addLead = (req, res) => {
    try {
        Lead.createLead(req.body, req.ip, (error, data) => {
            if (error) {
                res.status(500).json({ status:500, success: false, message: 'Failed to create lead.', error: error.message }); //display error
            } else {
                if (!data) {
                    res.status(404).json({ success: false, message: 'Lead not created!' });
                } else {
                    res.status(200).json({ success: true, message: 'Lead Created.' });
                }
            }
        });
    } catch (err) {
        res.status(500).json({ status:500, error: err.message, success: false, message: 'An error occurred while creating lead.' });
    }
};


const updateLead = (req, res) => {
    try {
        Lead.updateLead(req.body, req.ip, (error, data) => {
            if (error) {
                res.status(500).json({ status:500, success: false, message: 'Failed to update lead.', error: error.message }); //display error
            } else {
                if (!data) {
                    res.status(404).json({ status:404, success: false, message: 'Lead not updated!' });
                } else {
                    res.status(200).json({ status:200, success: true, message: 'Lead updated.' });
                }
            }
        });
    } catch (err) {
        res.status(500).json({ status:500, error: err.message, success: false, message: 'An error occurred while updating lead.' });
    }
};


const deleteLead = (req, res) => {
    try {
        Lead.deleteLead(req.body, (error, data) => {
            if (error) {
                res.status(500).json({ status:500, success: false, message: 'Failed to delete lead.', error: error.message }); //display error
            } else {
                if (!data) {
                      res.status(404).json({ status:404, success: false, message: 'Lead not deleted!' });
                } else {
                    res.status(200).json({ status:200, success: true, message: 'Lead deleted.' });
                }
            }
        });
    } catch (err) {
        res.status(500).json({ status:500, error: err.message, success: false, message: 'An error occurred while deleting lead.' });
    }
};


const fetchLead = (req, res) => {
    try {
        Lead.fetchLead(req.body, (error, data) => {
            if (error) {
                res.status(500).json({ status:500, success: false, message: 'Failed to show lead.', error: error.message }); //display error
            } else {
                if (!data) {
                      res.status(404).json({ status:404, success: false, message: 'Lead not fetched!' });
                } else {
                    res.status(200).json({ status:200, success: true, message: 'Lead fetched.', data: data });
                }
            }
        });
    } catch (err) {
        res.status(500).json({ status:500, error: err.message, success: false, message: 'An error occurred while fetching lead.' });
    }
}

module.exports = { addLead, updateLead, deleteLead, fetchLead }