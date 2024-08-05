document.addEventListener("DOMContentLoaded", () => {
    let getTask = document.querySelector("#addtask");
    let addTaskButton = document.querySelector("#button");
    let listOfTasks = document.querySelector("#tasks");
  
    addTaskButton.addEventListener("click", () => {
      const taskText = getTask.value.trim();
      if (taskText) {
        addTaskToDOM(taskText);
        saveTask(taskText);
        getTask.value = '';
      }
    });
  
    function addTaskToDOM(taskText, completed = false) {
      const li = document.createElement('li');
      li.className = "list";
      li.textContent = taskText;
  
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = completed;
      checkbox.className = 'cb';
      li.prepend(checkbox);
      checkbox.addEventListener('change', () => {
        li.classList.toggle('completed');
        updateTaskStatus(taskText, checkbox.checked);
      });
  
      if (completed) {
        li.classList.add('completed');
      }
  
      const btn = document.createElement('button');
      btn.textContent = 'X';
      btn.className = 'btn';
      btn.addEventListener('click', () => {
        removeTask(taskText);
        li.remove();
      });
  
      listOfTasks.appendChild(li);
      li.appendChild(btn);
    }
  
    function saveTask(taskText) {
      const tasks = getTasksFromLocalStorage();
      tasks.push({ text: taskText, completed: false });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    function removeTask(taskText) {
      const tasks = getTasksFromLocalStorage();
      const updatedTasks = tasks.filter(task => task.text !== taskText);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
  
    function updateTaskStatus(taskText, completed) {
      const tasks = getTasksFromLocalStorage();
      const updatedTasks = tasks.map(task =>
        task.text === taskText ? { ...task, completed } : task
      );
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
  
    function getTasksFromLocalStorage() {
      return JSON.parse(localStorage.getItem('tasks')) || [];
    }
  
    function loadTasks() {
      const tasks = getTasksFromLocalStorage();
      tasks.forEach(task => addTaskToDOM(task.text, task.completed));
    }
  
    loadTasks();
  });
  
