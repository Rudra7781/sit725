const todoModel = require('../models/todoModel');

async function createTodo(req, res) {
    try {
        const myobj = req.body;
        const result = await todoModel.addTodo(myobj);
        res.json({ statusCode: 201, data: result, message: 'success' });
    } catch (err) {
        res.json({ statusCode: 500, data: err, message: 'error' });
    }
}

async function fetchTodos(req, res) {
    try {
        const result = await todoModel.getTodos();
        res.json({ statusCode: 200, data: result, message: 'get all todos successful' });
    } catch (err) {
        res.json({ statusCode: 500, data: err, message: 'error' });
    }
}

module.exports = {
    createTodo,
    fetchTodos
};
