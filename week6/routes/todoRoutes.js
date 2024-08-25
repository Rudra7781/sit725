const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.post('/api/todo', todoController.createTodo);
router.get('/api/todo', todoController.fetchTodos);

module.exports = router;
