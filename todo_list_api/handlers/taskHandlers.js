let todos = [
    {
        id: 0,
        task: 'Buy Sugar',
        description: 'At 1200hrs, buy sugar at sugar store in ring road.',
        priority: 'medium',
        isComplete: false
    },
    {
        id: 1,
        task: 'Meet with PM',
        description: 'At 1500hrs, meet with Project Manager.',
        priority: 'high',
        isComplete: false
    }
];

exports.getAllTodos = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(todos));
};

exports.getTodoById = (req, res, id) => {
    const todoItem = todos.find(todo => todo.id === parseInt(id));
    if (todoItem) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(todoItem));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Todo not found' }));
    }
};

exports.createTodo = (req, res) => {
    const newTodo = req.body;
    todos.push(newTodo);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(newTodo));
};

exports.updateTodo = (req, res, id) => {
    const index = todos.findIndex(todo => todo.id === parseInt(id));
    if (index !== -1) {
        todos[index] = req.body;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Todo updated', todo: todos[index] }));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Todo not found' }));
    }
};

exports.deleteTodo = (req, res, id) => {
    const index = todos.findIndex(todo => todo.id === parseInt(id));
    if (index !== -1) {
        todos.splice(index, 1);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Todo deleted' }));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Todo not found' }));
    }
};

exports.getCompletedTodos = (req, res) => {
    const completed = todos.filter(todo => todo.isComplete);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(completed.length ? completed : { message: 'No tasks completed' }));
};
