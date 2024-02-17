const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'support@legalstix.com',
        pass: 'brsh ojyp jzzf gpnm',
    },
});


function sendMail(email, msg) {
    let mailOptions = {
        from: 'support@legalstix.com@gmail.com',
        to: email, 
        subject: "Demo Class",
        html:msg
    };


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Message sent:', info.messageId);
        }
    });
}


process.on('message', ({email, status, name, category, demoDate}) => {
    console.log(email)
    let msg;
    if(status == "greet"){
           msg= `
           <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
               <div style="border-bottom:1px solid #eee">
                   <a href="" style="font-size:14px;color: #00466a;text-decoration:none;font-weight:600">LegalStix Innovation Private Limited</a>
               </div>
               <p style="font-size:1.1em">Hi ${name},</p>
               <p>Thank you for choosing LegalStix. You're welcome! If you found the course interesting.</p>
               <p>It's great to hear! We have scheduled you demo for the ${category} at ${demoDate} from 7 PM to 8 PM.</b></p>
               <p style="font-size:0.9em;">Regards,<br />LegalStix Innovation Private Limited</p>
               <hr style="border:none;border-top:1px solid #eee" />
               <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                   <p>LegalStix Private Limited</p>
                   <p>311-L, First Floor, Near SBI Bank, Model Town, Karnal, Haryana 132001</p>
                   <p>Website Address: https://legalstixlawschool.com</p>
               </div>
           </div>
       </div>
   `
    }else if(status == "bookDemo"){
         msg = `
               <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                    <div style="margin:50px auto;width:70%;padding:20px 0">
                        <div style="border-bottom:1px solid #eee">
                            <a href="" style="font-size:14px;color: #00466a;text-decoration:none;font-weight:600">LegalStix Innovation Private Limited</a>
                        </div>
                        <p style="font-size:1.1em">Dear , ${name}</p>
                        <p>I hope this message finds you well. A friendly reminder that your demo for the ${category} course is scheduled for ${demoDate}, from 7 PM to 8 PM.                        </p>
                        <p>Should you have any queries about the demo, please don't hesitate to reach out in advance. We're here to assist you.                        </p>
                        <p>Join the demo using the following link:</p>
                        <p>https://meet.google.com/wif-dyhq-wdx                        </p>
                        <p>Thank you for your time, and we look forward to a productive and insightful session on Saturday.</p>
                        <p>Link To The Course: https://courses.legalstixlawschool.com/courses/UGC-NET-Law-Course-65ae7435e4b0e081ae4ebda6                        </p>
                        <p style="font-size:0.9em;">Regards,<br />LegalStix Innovation Private Limited</p>
                        <hr style="border:none;border-top:1px solid #eee" />
                        <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                            <p>LegalStix Private Limited</p>
                            <p>311-L, First Floor, Near SBI Bank, Model Town, Karnal, Haryana 132001</p>
                            <p>Website Address: https://legalstixlawschool.com</p>
                        </div>
                    </div>
                </div>
         `;
    }else if(status == "reminder"){
        msg = `
             <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                    <div style="border-bottom:1px solid #eee">
                        <a href="" style="font-size:14px;color: #00466a;text-decoration:none;font-weight:600">LegalStix Innovation Private Limited</a>
                    </div>
                    <p style="font-size:1.1em">Dear , ${name}</p>
                    <p>Your ${category} course demo is just few hours away! We're excited to have you join us.                    </p>
                    <p>Quick reminder: the session starts at 7 PM today .If you have any last-minute questions or need technical support, don't hesitate to reach out. </p>
                    <p>Join the demo using the following link:</p>
                    <p>https://meet.google.com/wif-dyhq-wdx                        </p>
                    <p>Thank you for your time, and we look forward to a productive and insightful session on Saturday.</p>
                    <p>Link To The Course: https://courses.legalstixlawschool.com/courses/UGC-NET-Law-Course-65ae7435e4b0e081ae4ebda6                      </p>
                    <p style="font-size:0.9em;">Regards,<br />LegalStix Innovation Private Limited</p>
                    <hr style="border:none;border-top:1px solid #eee" />
                    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                        <p>LegalStix Private Limited</p>
                        <p>311-L, First Floor, Near SBI Bank, Model Town, Karnal, Haryana 132001</p>
                        <p>Website Address: https://legalstixlawschool.com</p>
                    </div>
                </div>
            </div>
         `
    }
    sendMail(email, msg);
});
