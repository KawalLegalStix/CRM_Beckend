const LatestLead = require("./getLatestLead");
const cron = require('node-cron');
const db = require("../database/db");
const nodemailer = require("nodemailer");
const { fork } = require("child_process");
const sendMailProcess = fork('./email.js');

const args = process.argv.slice(2);

switch(args[1]){
     
    case "LatestLeadCollection":
        cron.schedule('* * * * *', () => {
            LatestLead.InsertLatestLead();
            console.log("Latest Lead Collected!")
        });
    break;

    case "communication":
        cron.schedule('16 17 * * *', () => {
            LatestLead.getLatestLead(data => {
                
                data.forEach(element => {
                    let demoDate = new Date(element.demo_date).toDateString();
                    let demoDateV = new Date(element.demo_date).getDate();
                    let currentDate = new Date().getDate();
                    let diffDate = demoDateV - currentDate;
                    let status = element.status;
                    let IsCompleted = 0;
                    let phone = element.phone;
                    let category = element.category;
                    let name = element.name;
                    let RecordID = element.RecordID;
                    let email = element.email;

                    if(phone !== 9416840483) return;

                            if(diffDate == 1){
                                console.log("Communicated regarding demo with "+name);
                                msg = `
Dear , ${name}
I hope this message finds you well. A friendly reminder that your demo for the ${category} course is scheduled for ${demoDate}, from 7 PM to 8 PM.

Should you have any queries about the demo, please don't hesitate to reach out in advance. We're here to assist you.

Join the demo using the following link:

https://meet.google.com/wif-dyhq-wdx
Thank you for your time, and we look forward to a productive and insightful session on Saturday.
Link To The Course: https://courses.legalstixlawschool.com/courses/UGC-NET-Law-Course-65ae7435e4b0e081ae4ebda6
                                                                                                                                                                                    
Best regards,
Legalstix Law School
https://legalstixlawschool.com
+917206378057`;
                                    SendMail(email, "bookDemo", name, category, demoDate)
                                    SendWhatsappMsg(phone, msg);
                                    status = 3;
                            }else if(diffDate == 0){
                                console.log("Communicated regarding reminder with "+name);

                                    msg = `
Dear , ${name}

Your ${category} course demo is just few hours away! We're excited to have you join us.

Quick reminder: the session starts at 7 PM today .If you have any last-minute questions or need technical support, don't hesitate to reach out.

Join the demo using the following link:

https://meet.google.com/wif-dyhq-wdx
Look forward to a great session!
Link To The Course: https://courses.legalstixlawschool.com/courses/UGC-NET-Law-Course-65ae7435e4b0e081ae4ebda6
Best regards,
Legalstix Law School
https://legalstixlawschool.com
+917206378057         
                                    `;
                                    SendMail(email, "reminder", name, category, demoDate)
                                    SendWhatsappMsg(phone, msg);
                                    status = 4;
                            }else if(diffDate == -1){
                                   // SendMail(email)
                                console.log("Communicated after demo with "+name);
                                    status = 5;
                                    IsCompleted = 1;
                            }

                    db.query(`UPDATE latest_leads SET status = '${status}', isCompleted='${IsCompleted}'
                              WHERE RecordID = ${RecordID}`);
                });
            })
        })
    break;

    case "welcome":

    cron.schedule('* * * * *', () => {
        LatestLead.getLatestLead(data => {
            
                data.forEach(element => {
                    let demoDate = new Date(element.demo_date).toDateString();
                    let demoDateV = new Date(element.demo_date).getDate();
                    let currentDate = new Date().getDate();
                    let diffDate = demoDateV - currentDate;
                    let status = element.status;
                    let IsCompleted = 0;
                    let phone = element.phone;
                    let email = element.email;
                    let category = element.category;
                    let name = element.name;
                    let RecordID = element.RecordID;

                    if(phone !== 9416840483) return;

                    let msg;
                    if(element.status == 1){
                        console.log("Welcome Message Sent To "+name);
                        status = 2; 

                        msg = `
Dear ${name},
You're welcome! If you found the course interesting, it's great to hear! We have scheduled you demo for the ${category} at ${demoDate} from 7 PM to 8 PM.

Best regards,
Legalstix Law School
https://legalstixlawschool.com
+917206378057
                        `;

                        SendMail(email, "greet", name, category, demoDate)
                        SendWhatsappMsg(phone, msg);
                    }


                    db.query(`UPDATE latest_leads SET status = '${status}', isCompleted='${IsCompleted}'
                              WHERE RecordID = ${RecordID}`);
                })
             });
          });

    break;
}


function SendMail(email, status, name, category, demoDate){
    // Send email data to the child process
    sendMailProcess.send({email, status , name, category, demoDate});

    // Listen for messages from the child process
    sendMailProcess.on('message', (message) => {
        console.log('Received message from child process:', message);
    });
}

function SendWhatsappMsg(phone, msg){
      if(phone.toString().length == 10){
           // console.log(phone, msg)
      }
} 