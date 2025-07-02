const express = require('express');
const router = express.Router();

// Load tasks from localStorage or initialize empty array
let tasks = [];

// Helper functions for data persistence
const loadTasks = () => {
  try {
    const data = require('fs').readFileSync('tasks.json', 'utf8');
    tasks = JSON.parse(data);
  } catch (error) {
    tasks = [];
  }
};

const saveTasks = () => {
  require('fs').writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));
};

// Load initial data
loadTasks();

// GET all tasks
router.get('/', (req, res) => {
  loadTasks(); // Refresh data before sending
  res.json(tasks);
});

// GET single task
router.get('/:id', (req, res) => {
  loadTasks(); // Refresh data before searching
  const { id } = req.params;
  const task = tasks.find(task => task.id === id);
  
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  res.json(task);
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
  saveTasks(); // Save after adding
  res.status(201).json(newTask);
});

// PUT update task
router.put('/:id', (req, res) => {
  loadTasks(); // Refresh data before updating
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

  saveTasks(); // Save after updating
  res.json(tasks[taskIndex]);
});

// DELETE task
router.delete('/:id', (req, res) => {
  loadTasks(); // Refresh data before deleting
  const { id } = req.params;
  const taskIndex = tasks.findIndex(task => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  tasks = tasks.filter(task => task.id !== id);
  saveTasks(); // Save after deleting
  res.status(204).send();
});

module.exports = router;