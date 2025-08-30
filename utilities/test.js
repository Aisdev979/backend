fetch('https://node-reminder-api.onrender.com/api/reminders')
.then(res => console.log(res.json()))