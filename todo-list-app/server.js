const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB (change the URL to your MongoDB instance)
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a schema and model for the tasks
const taskSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
});

const Task = mongoose.model('Task', taskSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// Routes
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/tasks', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const task = new Task({ text, completed: false });
    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
