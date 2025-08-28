const fs = require('fs');
const path = require('path');

const getIdIndex = (req, res, next) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).send({ message: "Invalid id parameter" });
    }

    let usersReminder;
    try {
        usersReminder = JSON.parse(fs.readFileSync(path.join(__dirname, '../utilities/user_reminder.json'), 'utf8'));
    } catch (err) {
        return res.status(500).send({ message: "Failed to load reminders data" });
    }

    const idAtIndex = usersReminder.findIndex(userReminder => userReminder.id === id);
    if (idAtIndex === -1) {
        return res.status(404).send({ message: "Reminder not found" });
    }

    req.idAtIndex = idAtIndex;
    req.userReminder = usersReminder[idAtIndex];
    req.usersReminder = usersReminder; 
    next();
};

module.exports = getIdIndex;
