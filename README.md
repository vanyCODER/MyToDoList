# MyToDoList
DoToList my first project using JS
📝 To-Do List на чистом JavaScript
Простое приложение для управления задачами с сохранением данных в браузере.
✨ Особенности
Добавление новых задач
Отметка задач как выполненных
Удаление задач
Автосохранение в localStorage
🛠 Технологии
Vanilla JavaScript (ES6)
HTML5 и CSS3
Web Storage API (localStorage)
📚 Структура кода
Основные функции:
createTaskElement(taskText, isCompleted)
Создает DOM-элемент задачи с:
Текстом задачи
Кнопкой выполнения
Кнопкой удаления
Обработчиками событий
saveTasks()
Сохраняет все задачи в localStorage в формате JSON
loadTasks()
Загружает задачи из localStorage при старте приложения
