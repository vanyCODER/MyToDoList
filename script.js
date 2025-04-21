document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("add-btn");
  const taskInput = document.getElementById("input");
  const tasksList = document.getElementById("tasks-list");

  // Загружаем сохраненные задачи при запуске
  loadTasks();

  // Сохраняем текущие задачи в localStorage
  function saveTasks() {
    const tasks = [];
    document.querySelectorAll(".tasks__item").forEach((item) => {
      tasks.push({
        text: item.querySelector(".task-text").textContent,
        completed: item.classList.contains("completed"),
      });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Загружаем задачи из localStorage при загрузке страницы
  function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      const tasks = JSON.parse(savedTasks);
      tasks.forEach((task) => {
        createTaskElement(task.text, task.completed);
      });
    }
  }

  // Создаем элемент задачи (вынесено в отдельную функцию)
  function createTaskElement(taskText, isCompleted = false) {
    const taskItem = document.createElement("li");
    taskItem.className = `tasks__item ${isCompleted ? "completed" : ""}`;
    taskItem.innerHTML = `
      <span class="task-text">${taskText}</span>
      <div class="tasks__buttons">
        <button class="done-btn"><img src="done.svg" alt="done" class="done-icon"></button>
        <button class="delete-btn"><img src="trash-icon.svg" alt="Delete" class="delete-icon"></button>
      </div>
    `;

    // Добавляем в начало списка
    tasksList.insertBefore(taskItem, tasksList.firstChild);

    // Применяем стили для выполненных задач
    if (isCompleted) {
      const taskTextElement = taskItem.querySelector(".task-text");
      taskTextElement.style.textDecoration = "line-through";
      taskItem.style.opacity = "0.7";
    }

    // Обработчик удаления
    taskItem.querySelector(".delete-btn").addEventListener("click", () => {
      taskItem.remove();
      saveTasks(); // Сохраняем изменения
    });

    // Обработчик выполнения каждой задачи
    taskItem.querySelector(".done-btn").addEventListener("click", () => {
      const isNowCompleted = taskItem.classList.toggle("completed");
      const taskTextElement = taskItem.querySelector(".task-text");

      taskTextElement.style.textDecoration = isNowCompleted
        ? "line-through"
        : "none";
      taskItem.style.opacity = isNowCompleted ? "0.7" : "1";

      if (isNowCompleted) {
        tasksList.appendChild(taskItem);
      } else {
        tasksList.insertBefore(taskItem, tasksList.firstChild);
      }

      saveTasks(); // Сохраняем изменения
    });

    return taskItem;
  }

  // Функция добавления задачи
  function addTask() {
    const taskText = taskInput.value.trim();

    if (!taskText) {
      alert("Пожалуйста, введите текст задачи!");
      return;
    }

    createTaskElement(taskText);
    taskInput.value = "";
    taskInput.focus();
    saveTasks(); // Сохраняем новую задачу
  }

  // Обработчики событий
  addBtn.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
  });
});
