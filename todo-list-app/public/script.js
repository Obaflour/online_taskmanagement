document.addEventListener('DOMContentLoaded', () => {
  fetchTasks();
});

function fetchTasks() {
  fetch('/api/tasks')
    .then((response) => response.json())
    .then((data) => {
      const taskList = document.getElementById('taskList');
      taskList.innerHTML = '';

      data.forEach((task) => {
        const li = document.createElement('li');
        li.textContent = task.text;
        taskList.appendChild(li);
      });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const text = taskInput.value.trim();

  if (text === '') return;

  fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  })
    .then((response) => response.json())
    .then(() => {
      taskInput.value = '';
      fetchTasks();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
