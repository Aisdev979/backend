const { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo, getCompletedTodos } = require('../handlers/taskHandlers');

function taskRouter(req, res) {
    const urlParts = req.url.split('/');
    const method = req.method;
    
    // GET /tasks
    if (req.url === '/tasks' && method === 'GET') {
        return getAllTodos(req, res);
    }

    // GET /tasks/completed
    if (req.url === '/tasks/completed' && method === 'GET') {
        return getCompletedTodos(req, res);
    }

    // GET /tasks/:id
    if (req.url.match('\/tasks\/[0-9]+') && method === 'GET') {
        return getTodoById(req, res, urlParts[2]);
    }

    // POST /tasks
    if (req.url === '/tasks' && method === 'POST') {
        return createTodo(req, res);
    }

    // PUT /tasks/:id
    if (req.url.match('\/tasks\/[0-9]+') && method === 'PUT' || req.url.match('\/tasks\/[0-9]+\/complete') && method === 'PUT') {
        return updateTodo(req, res, urlParts[2]);
    }

    // DELETE /tasks/:id
    if (req.url.match('\/tasks\/[0-9]+') && method === 'DELETE') {
        return deleteTodo(req, res, urlParts[2]);
    }

    // 404 Not Found
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
}

module.exports = taskRouter;
