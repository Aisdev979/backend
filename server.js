
const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');

const { sendConfirmationMails } = require('./utilities/mailing_system.js');
require('./utilities/mail_schedular.js');

const { body, validationResult, matchedData, checkSchema } = require('express-validator');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const createReminderValidationSchema = require('./utilities/validationSchema.js');
const usersReminder = JSON.parse(fs.readFileSync('./utilities/user_reminder.json'), 'utf8');
const getIdIndex = require('./middlewares/findIndex.js');

app.use(express.json());
app.use(cors())

app.get('/api/reminders', (req, res) => {
    res.status(200).send(usersReminder);
});

app.post('/api/reminders', checkSchema(createReminderValidationSchema), (req, res) => {
    
    const result = validationResult(req);

    
    if(!result.isEmpty()) {
        return res.status(400).send(result.array());
    }
    
    const data = matchedData(req);
    console.log(data);
    let id;
    if(usersReminder.length === 0) {
        id = 0;
    } else {
        let newId = usersReminder[usersReminder.length-1].id;
        id  = parseInt(newId) + 1;
    }
    
    let newReminder = {id, ...data};
    usersReminder.push(newReminder);
    
    sendConfirmationMails(newReminder);

    fs.writeFile('./utilities/user_reminder.json', JSON.stringify(usersReminder), err => {
        if(err) {
            console.error('Error saving reminders:', err);
            res.status(500).send({ message: "Internal server error" });
        }
    });

    res.status(201).send({message: "Reminder added sucessfully"});
});

app.get('/api/reminders/:id', getIdIndex, (req, res) => {
    const {
        usersReminder,
        idAtIndex
    } = req;
    return res.status(200).send(usersReminder[idAtIndex]);
});

app.patch('/api/reminders/:id', getIdIndex, (req, res) => {
    const {
            userReminder,
            usersReminder,
            idAtIndex,
            body
        } = req;
    
    const newReminderUpdate = {...userReminder, ...body};
    usersReminder[idAtIndex] = newReminderUpdate;
    fs.writeFile('./utilities/user_reminder.json', JSON.stringify(usersReminder), err => {
        if(err) {
            console.error('Error saving reminders:', err);
            res.status(500).send({ message: "Internal server error" });
        }
    });
    res.status(200).send(
        {message: "Reminder updated sucessfully", newReminderUpdate}
    )
});

app.delete('/api/reminders/:id', getIdIndex, (req, res) => {
    const {
        idAtIndex,
        userReminder,
        usersReminder
    } = req;
    usersReminder.splice(idAtIndex, 1);
    fs.writeFile('./utilities/user_reminder.json', JSON.stringify(usersReminder), err => {
        if(err) {
            console.error('Error saving reminders:', err);
            res.status(500).send({ message: "Internal server error" });
        }
    });
    res.send({message: "Reminder deleted sucessfully", userReminder})
});

app.listen(PORT, () =>  console.log(`server running on port ${PORT}`));