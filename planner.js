// Simulated weather cycling for suggestions
let weatherIndex = 0;
let colorIndex = 0;
const weatherCycle = ['Clear', 'Clouds', 'Rain'];
const colors = ['#E6F3FA', '#FCE4EC', '#F9E79F'];

// DOM Elements
const addTaskBtn = document.getElementById('add-task-btn');
const taskInput = document.getElementById('task-input');
const userNameInput = document.getElementById('user-name');
const taskDay = document.getElementById('task-day');
const taskList = document.getElementById('task-list');
const suggestionText = document.getElementById('suggestion-text');
const errorMessage = document.getElementById('error-message');
const suggestionsCard = document.querySelector('.suggestions');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        const weatherIcon = getWeatherIcon(task.weather);
        taskItem.innerHTML = `
            <p><i class="${weatherIcon}"></i> ${task.userName}: ${task.text} - ${task.dayText}</p>
            <button class="delete-task">Delete <i class="fas fa-trash"></i></button>
        `;
        taskList.appendChild(taskItem);

        taskItem.querySelector('.delete-task').addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });
    });
    updateBackground();
}

// Map weather conditions to Font Awesome icons and background classes
function getWeatherIcon(weather) {
    const weatherIcons = {
        'Clear': 'fas fa-sun',
        'Clouds': 'fas fa-cloud',
        'Rain': 'fas fa-cloud-rain'
    };
    return weatherIcons[weather] || 'fas fa-cloud';
}

function getBackgroundClass(weather) {
    const backgroundClasses = {
        'Clear': 'sunny',
        'Clouds': 'cloudy',
        'Rain': 'rainy'
    };
    return backgroundClasses[weather] || 'cloudy';
}

// Update page background based on the first task's weather
function updateBackground() {
    document.body.className = tasks.length && tasks[0].weather ? getBackgroundClass(tasks[0].weather) : '';
}

// Suggest activities based on simulated weather and user input
function getActivitySuggestions(userName, dayText, weather) {
    const isGoodWeather = ['Clear', 'Clouds'].includes(weather);
    const suggestions = {
        goodWeather: [
            'enjoy a hike in the hills',
            'have a picnic by the lake',
            'try cycling around the city',
            'visit a botanical garden',
            'play outdoor games with friends'
        ],
        badWeather: [
            'watch a movie marathon at home',
            'bake cookies indoors',
            'read a book by the window',
            'visit a museum',
            'play board games with family'
        ]
    };

    const selectedSuggestions = isGoodWeather ? suggestions.goodWeather : suggestions.badWeather;
    const suggestionText = selectedSuggestions.map(s => s).join(', ');
    return `Hey ${userName}, here are some great ideas for ${dayText}: ${suggestionText}.`;
}

// Advanced validation
function validateTask(userName, taskText, dayText) {
    if (!userName || userName.length < 3) {
        return { isValid: false, message: 'Please enter a name with at least 3 characters.' };
    }
    if (!taskText || taskText.length < 5) {
        return { isValid: false, message: 'Please enter a task with at least 5 characters.' };
    }
    if (tasks.length >= 10) {
        return { isValid: false, message: 'Task limit reached (10). Delete some tasks to add more.' };
    }
    const isDuplicate = tasks.some(
        task => task.userName.toLowerCase() === userName.toLowerCase() &&
                task.text.toLowerCase() === taskText.toLowerCase() &&
                task.dayText === dayText
    );
    if (isDuplicate) {
        return { isValid: false, message: 'This task already exists for this user and day.' };
    }
    return { isValid: true };
}

// Add task and update suggestions
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    const userName = userNameInput.value.trim();
    const dayIndex = parseInt(taskDay.value);
    const dayText = taskDay.options[taskDay.selectedIndex].text;

    const validation = validateTask(userName, taskText, dayText);
    if (!validation.isValid) {
        errorMessage.textContent = validation.message;
        errorMessage.style.display = 'block';
        return;
    }

    errorMessage.style.display = 'none';
    const weather = weatherCycle[weatherIndex % weatherCycle.length];
    weatherIndex++;
    const suggestion = getActivitySuggestions(userName, dayText, weather);
    suggestionText.textContent = suggestion;

    // Change suggestion card color
    suggestionsCard.style.background = colors[colorIndex % colors.length];
    colorIndex++;

    tasks.push({
        userName,
        text: taskText,
        dayText,
        weather
    });
    saveTasks();
    renderTasks();

    taskInput.value = '';
    userNameInput.value = '';
});

// Initial render
renderTasks();