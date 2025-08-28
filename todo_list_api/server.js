const { createServer } = require('http');
const jsonParser = require('./middleware/jsonParser');
const taskRouter = require('./routes/tasks');

const server = createServer((req, res) => {
    if (req.method === 'POST' || req.method === 'PUT') {
        // Use middleware to parse body
        jsonParser(req, res, () => {
            taskRouter(req, res);
        });
    } else {
        taskRouter(req, res);
    }
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
