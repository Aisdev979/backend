const createReminderValidationSchema = {
    Task: {
        trim: true,
        isString: {
            errorMessage: "Must provide a task title"
        },
        notEmpty: {
            errorMessage: "Task title must not be empty"
        }
    },
    description: {
        trim: true,
        isString: {
            errorMessage: "Must provide a description"
        },
        notEmpty: {
            errorMessage: "Description field must not be empty"
        },
        isLength: {
            options: {
                min: 20,
                max: 200
            },
            errorMessage: "Must be 20-200 characters long!"
        }
    },
    date: {
        isString: {
            errorMessage: "Must provide a valid date"
        },
        isISO8601: {
            errorMessage: "Must be a valid ISO8601 date. e.g, 2025-08-29."
        },
        custom: {
            options: function(value) {
                
                const inputDate = new Date(value);
                const currentDate = new Date();
                console.log(inputDate, currentDate)
                /*
                    setting currentDate time to
                    (hour: 0, min: 0, secs: 0, milisecs: 0)
                    cause inputDate has no time set
                */
                if(inputDate < currentDate.setHours(0, 0, 0, 0)) {
                    throw new Error('Date cant be in the past');
                }
                return true;
            }
        }
    },
    time: {
        isString: {
            errorMessage: "Must provide a valid time"
        },
        matches: {
            options: /^(?:[01]?\d|2[0-3])(?::[0-5]\d){1,2}$/,
            errorMessage: "Time must be in HH:MM format (24-hours clock)."
        }
    }
}

module.exports = createReminderValidationSchema