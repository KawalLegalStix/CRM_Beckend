const Task = require('../models/Task');
const User = require('../models/User');
const Lead = require('../models/Lead');
const nodemailer = require('nodemailer');

const showMonthWiseTask = (req, res) => {
    Task.fetchAllTask((error, data) => {
        if (error) {
            res.status(500).json({ status:500, success: false, message: 'Failed to show task.', error: error.message }); //display error
        } else {
            if (!data) {
                  res.status(404).json({ status:404, success: false, message: 'task not fetched!' });
            } else {
                    const currentYear = new Date().getFullYear();

                    const filteredData = data.filter(element => {
                        const date = new Date(element.created_at);
                        return date.getFullYear() === currentYear;
                    });
                    
                    const monthly_data = [];
                    
                    for (let i = 1; i < 13; i++) {
                        const monthName = new Date(2000, i - 1, 1).toLocaleString('default', { month: 'long' });
                        monthly_data.push({ month_id: i, monthName: monthName,completed_task: 0, pending_task: 0 });
                    }
                    
                    filteredData.forEach(element => {
                        const date = new Date(element.created_at);
                        const monthId = date.getMonth();
                    
                        if (element.status === 0) {
                            monthly_data[monthId].pending_task++;
                        } else {
                            monthly_data[monthId].completed_task++;
                        }
                    });
                    res.status(200).json({ status:200, success: true, message: 'Data fetched.', data: monthly_data });
            }
        }
    });
}


const fetchUsers = (req, res) => {
    try {
        User.fetchUsers((error, data) => {
            if (error) {
                res.status(500).json({ status:500, success: false, message: 'Failed to show users.', error: error.message }); //display error
            } else {
                if (!data) {
                      res.status(404).json({ status:404, success: false, message: 'users not fetched!' });
                } else {
                    res.status(200).json({ status:200, success: true, message: 'Users fetched.', data: data });
                }
            }
        });
    } catch (err) {
        res.status(500).json({ status:500, error: err.message, success: false, message: 'An error occurred while fetching Users.' });
    }
}


const monthlyLeadReport = (req, res) => {
    try {
        Lead.getleads((error, data) => {
            if (error) {
                res.status(500).json({ status:500, success: false, message: 'Failed to fetch leads.', error: error.message }); //display error
            } else {
                if (!data) {
                      res.status(404).json({ status:404, success: false, message: 'Failed to fetch leads.' });
                } else {
                    const currentYear = new Date().getFullYear();
                    const currentDate = new Date().getDate();
                    const filteredData = data.filter(element => {
                        const date = new Date(element.created_at);
                        return date.getFullYear() === currentYear;
                    });
                    
                    const monthly_data = [];
                    for (let i = 1; i < 13; i++) {
                        const monthName = new Date(2000, i - 1, 1).toLocaleString('default', { month: 'long' });
                        monthly_data.push({ month_id: i, monthName: monthName,intrested: 0, not_intrested: 0, total_leads:data.length, today_lead:0 });
                    }
                    
                    filteredData.forEach(element => {
                        const date = new Date(element.created_at);
                        const monthId = date.getMonth();
                        const day = date.getDate();
                        if(currentDate == day){
                              monthly_data[monthId].today_lead++;
                        }
                        if (element.status === 0) {
                            monthly_data[monthId].not_intrested++;
                        } else {
                            monthly_data[monthId].intrested++;
                        }
                    });
                    
                    res.status(200).json({ status:200, success: true, message: 'Leads fetched.', data: monthly_data });
                }
            }
        });
    } catch (err) {
        res.status(500).json({ status:500, error: err.message, success: false, message: 'An error occurred while fetching Leads.' });
    }
}

const sendMail = (req, res) => {
     
    // Create a transporter with SMTP options
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'support@legalstix.com',
            pass: 'brsh ojyp jzzf gpnm',
        },
    });

    // Define the email options

    // Get the current date
    var currentDate = new Date();
    var day =currentDate.toLocaleDateString({ weekday: 'long' }); 

    // Calculate the days until the next Monday (0 is Sunday, 1 is Monday, ..., 6 is Saturday)
    var daysUntilNextMonday = (1 - currentDate.getDay() + 7) % 7;

    // Add the days to the current date to get the next Monday
    var nextMonday = new Date(currentDate);
    nextMonday.setDate(currentDate.getDate() + daysUntilNextMonday + 7); // Add 7 to ensure we get the next Monday

    // Function to add leading zeros
    function addLeadingZero(number) {
        return number < 10 ? "0" + number : number;
    }

    // Format the dates as dd/mm/YYYY
    var formattedCurrentDate = addLeadingZero(currentDate.getDate()) + "/" + addLeadingZero(currentDate.getMonth() + 1) + "/" + currentDate.getFullYear();
    var formattedNextMonday = addLeadingZero(nextMonday.getDate()) + "/" + addLeadingZero(nextMonday.getMonth() + 1) + "/" + nextMonday.getFullYear();

    const mailOptions = {
        from: 'support@legalstix.com',
        to: req.body.tomail_id,
        subject: 'Demo Class Has Been Scheduled on '+day,
        text: `
Welcome to Legastix Law School!
Dear (${req.body.name})
I hope this message finds you well. I wanted to remind you that your demo has been scheduled for Saturday, ${formattedNextMonday} around 10 AM to 7 PM.
If you have any queries related to the demo, please feel free to let us know in advance, and we will do our best that is possible.
Here is the link to join the demo:
Thank you for your time, and we anticipate a productive and insightful session on 
Saturday.
Best regards,
Legalstix Law School

+917206378057

admin@legalstix.com

www.legalstixlawschool.com
        `,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).json({status:500, error:error});
        } else {
            console.log('Email sent:', info.response);
            res.status(200).json({ status:200, mail: 'Mail Sent.' });
        }
    }); 
}
module.exports = { showMonthWiseTask, fetchUsers, monthlyLeadReport, sendMail }