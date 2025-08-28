const fs = require('fs');
const path = require('path');
const cron = require('node-cron');

const { sendScheduledMails } = require('./mailing_system');
const remindersFile = path.join(__dirname, 'user_reminder.json');



cron.schedule('* * * * *', () => {
  const data = fs.readFileSync(remindersFile, 'utf8');
  const reminders = JSON.parse(data);

  const hours = new Date().getHours();
  const mins = new Date().getMinutes();
  const time = [hours, mins].join(':');

  reminders.forEach((reminder) => {
    const currentDate = new Date().toISOString().split('T')[0];
    // Skip if already in the past
    if (reminder.date < currentDate || reminder.time < time) {
      return console.log('past date');
    }

    if(reminder.time === time) {
      console.log(`⏰ Scheduled reminder #${reminder.id} at ${reminder.time}`);
      console.log(`📧 Sending scheduled reminder #${reminder.id}`);
      sendScheduledMails(reminder);
    }
    
  });
});

