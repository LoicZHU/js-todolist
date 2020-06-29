/**
 * Todolist
 */
const app = {
  taskCount: 0,

  init: function() {
    // cibler la div 'todo' et y créer une div
    const todoDivElement = document.getElementById('todo');

    // créer 1 form
    const addTaskForm = document.createElement('form');
    addTaskForm.setAttribute('id', 'addTaskForm');
    const addTaskInput = document.createElement('input');
    addTaskInput.setAttribute('id', 'addTaskInput');
    addTaskInput.setAttribute('placeholder', 'Ajouter une tâche');
    addTaskForm.appendChild(addTaskInput);

    // ajouter le form à la div 'todo'
    todoDivElement.appendChild(addTaskForm);

    // créer 1 section contenant la partie des tâches
    const taskSection = document.createElement('section');
    taskSection.setAttribute('id', 'runningTask');
    todoDivElement.appendChild(taskSection);

    // créer 1 div du nb de tâche en cours
    const taskCountElement = document.createElement('div');
    taskCountElement.textContent = `${app.taskCount} tâche en cours`;
    console.log(app.task);
    taskCountElement.setAttribute('id', 'taskCount');
    taskSection.appendChild(taskCountElement);

    // créer 1 div de la liste des tâches
    const tasks = document.createElement('div');
    tasks.setAttribute('id', 'tasks');
    taskSection.appendChild(tasks);

    // écouter le form
    addTaskForm.addEventListener('submit', app.handleSubmitTaskForm);
  },

  handleSubmitTaskForm: function(evt) {
    evt.preventDefault();

    let addTaskInputValue = document.getElementById('addTaskInput').value;
    addTaskInputValue.trim();
    
    if (addTaskInputValue !== '') {
      // +1 au nombre de tâche en cours
      app.modifyRunningTaskTitle('+1');

      // cibler la div de la liste des tâches
      const tasksElement = document.getElementById('tasks');

      // créer 1 div de tâche
      const task = document.createElement('div');
      task.classList.add('task');
      task.classList.add('task--todo');
      tasksElement.appendChild(task);

      // créer 1 div contenant : 1 checkbox + le nom de tâche
      const taskContent = document.createElement('div');
      taskContent.classList.add('task__content');
      task.appendChild(taskContent);
      
      // créer 1 div avec la checkbox
      const checkboxInputElement = document.createElement('input');
      checkboxInputElement.setAttribute('id', 'checkboxInput');
      checkboxInputElement.setAttribute('type', 'checkbox');
      taskContent.appendChild(checkboxInputElement);
      // écouter le checkbox
      checkboxInputElement.addEventListener('click', app.handleClickCheckbox);

      // créer 1 p avec le nom de la tâche + ajouter la value de l'input dans le p
      const taskName = document.createElement('p');
            
      taskName.textContent = addTaskInputValue;
      taskContent.appendChild(taskName);

      // vider le champs d'ajout de tâche
      document.getElementById('addTaskInput').value = '';
    }
  },

  handleClickCheckbox: function(evt) {
    // cibler la div de la tâche à modifier
    let checkboxInput = evt.currentTarget;
    const taskElement = checkboxInput.closest('.task');
    
    if (checkboxInput.checked) {
      taskElement.classList.replace('task--todo', 'task--complete');
      app.modifyRunningTaskTitle('-1');
    } else {
      taskElement.classList.replace('task--complete', 'task--todo');
      app.modifyRunningTaskTitle('+1');
    }
  },

  modifyRunningTaskTitle: function(operation) {
    const taskCountElement = document.getElementById('taskCount');

    if (operation==='+1') {
      app.taskCount++;
    } else if (operation==='-1' && app.taskCount>=0) {
      app.taskCount--;
    }

    if (app.taskCount<=1) {
      taskCountElement.textContent = `${app.taskCount} tâche en cours`;
    } else {
      taskCountElement.textContent = `${app.taskCount} tâches en cours`;
    }
  }
};

// Chargement du DOM
document.addEventListener('DOMContentLoaded', app.init);
