const express = require('express');
const router = express.Router();

// In-memory storage
let tasks = [];

// GET all tasks
router.get('/', (req, res) => {
  res.json(tasks);
});

// POST new task
router.post('/', (req, res) => {
  const { title, description, status = 'pending' } = req.body;
  
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const newTask = {
    id: Date.now().toString(),
    title,
    description,
    status,
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT update task
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  const taskIndex = tasks.findIndex(task => task.id === id);
  
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title: title || tasks[taskIndex].title,
    description: description || tasks[taskIndex].description,
    status: status || tasks[taskIndex].status,
    updatedAt: new Date().toISOString()
  };

  res.json(tasks[taskIndex]);
});

// DELETE task
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(task => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  tasks = tasks.filter(task => task.id !== id);
  res.status(204).send();
});

module.exports = router;