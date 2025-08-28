const nodemailer = require('nodemailer');
require('dotenv').config();

//setting up transport using gmail
const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.APP_PASSWORD,
    }
});

const sendConfirmationMails = (reminder) => {
    const emailOptions = {
        from: process.env.MY_EMAIL,
        to: "aisosamatthew247@gmail.com",
        subject:"Reminder-created",
        text: `Hello,

        You have successfully created a reminder:

        Title: ${reminder.Task}
        Description: ${reminder.description}
        Scheduled For: ${reminder.date, reminder.time}

        This is a confirmation email. You will get a reminder at the scheduled time.

        — A reminder from your automated reminder app`
    };
    
    transport.sendMail(emailOptions, (error, info) => {
        if (error) {
            return console.log("Error sending email:", error);
        }
        console.log("Email sent successfully:", info.response);
    });
};


const sendScheduledMails = (reminder) => {
    const emailOptions = {
        from: process.env.MY_EMAIL,
        to: "aisosamatthew247@gmail.com",
        subject:`Reminder-${reminder.Task}`,
        text: `Don't forget:

        ${reminder.description}

        Time: ${reminder.time}

        — A reminder from your automated reminder app`
    };
    
    transport.sendMail(emailOptions, (error, info) => {
        if (error) {
            return console.log("Error sending email:", error);
        }
        console.log("Email sent successfully:", info.response);
    });
}





module.exports = {sendConfirmationMails, sendScheduledMails}