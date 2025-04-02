// Sample tasks data
const tasks = [
    {
        id: 1,
        title: "Kalkulator",
        description: "Prosty kalkulator wykonujący podstawowe operacje matematyczne",
        preview: `
            <div style="text-align: center;">
                <input type="number" id="num1" placeholder="Pierwsza liczba">
                <select id="operator">
                    <option value="+">+</option>
                    <option value="-">-</option>
                    <option value="*">×</option>
                    <option value="/">÷</option>
                </select>
                <input type="number" id="num2" placeholder="Druga liczba">
                <button onclick="calculate()">Oblicz</button>
                <p id="result">Wynik: </p>
            </div>
        `,
        code: `
<!-- HTML -->
<div style="text-align: center;">
    <input type="number" id="num1" placeholder="Pierwsza liczba">
    <select id="operator">
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">×</option>
        <option value="/">÷</option>
    </select>
    <input type="number" id="num2" placeholder="Druga liczba">
    <button onclick="calculate()">Oblicz</button>
    <p id="result">Wynik: </p>
</div>

<!-- JavaScript -->
function calculate() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operator = document.getElementById('operator').value;
    let result;

    switch(operator) {
        case '+': result = num1 + num2; break;
        case '-': result = num1 - num2; break;
        case '*': result = num1 * num2; break;
        case '/': result = num1 / num2; break;
    }

    document.getElementById('result').textContent = \`Wynik: \${result}\`;
}`
    },
    {
        id: 2,
        title: "Lista zadań (Todo)",
        description: "Aplikacja do zarządzania listą zadań",
        preview: `
            <div style="text-align: center;">
                <input type="text" id="todoInput" placeholder="Wpisz zadanie">
                <button onclick="addTodo()">Dodaj</button>
                <ul id="todoList" style="list-style: none; padding: 0;"></ul>
            </div>
        `,
        code: `
<!-- HTML -->
<div style="text-align: center;">
    <input type="text" id="todoInput" placeholder="Wpisz zadanie">
    <button onclick="addTodo()">Dodaj</button>
    <ul id="todoList" style="list-style: none; padding: 0;"></ul>
</div>

<!-- JavaScript -->
function addTodo() {
    const input = document.getElementById('todoInput');
    const list = document.getElementById('todoList');
    
    if (input.value.trim() !== '') {
        const li = document.createElement('li');
        li.textContent = input.value;
        li.style.cursor = 'pointer';
        li.onclick = function() {
            this.style.textDecoration = 
                this.style.textDecoration === 'line-through' ? 
                'none' : 'line-through';
        };
        list.appendChild(li);
        input.value = '';
    }
}`
    }
];

// Initialize the task list
function initializeTasks() {
    const taskList = document.getElementById('taskList');
    
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task-item';
        taskElement.innerHTML = `
            <h3 class="task-title">${task.title}</h3>
            <p class="task-description">${task.description}</p>
        `;
        taskElement.onclick = () => showTaskDetails(task);
        taskList.appendChild(taskElement);
    });
}

// Show task details in modal
function showTaskDetails(task) {
    const modal = document.getElementById('taskModal');
    const modalTitle = document.getElementById('modalTitle');
    const taskPreview = document.getElementById('taskPreview');
    const taskCode = document.getElementById('taskCode');

    modalTitle.textContent = task.title;
    taskPreview.innerHTML = task.preview;
    taskCode.textContent = task.code;

    modal.style.display = 'block';

    // Add necessary functions for the preview
    if (task.id === 1) {
        window.calculate = function() {
            const num1 = parseFloat(document.getElementById('num1').value);
            const num2 = parseFloat(document.getElementById('num2').value);
            const operator = document.getElementById('operator').value;
            let result;

            switch(operator) {
                case '+': result = num1 + num2; break;
                case '-': result = num1 - num2; break;
                case '*': result = num1 * num2; break;
                case '/': result = num2 !== 0 ? num1 / num2 : 'Nie można dzielić przez zero'; break;
            }

            document.getElementById('result').textContent = `Wynik: ${result}`;
        };
    } else if (task.id === 2) {
        window.addTodo = function() {
            const input = document.getElementById('todoInput');
            const list = document.getElementById('todoList');
            
            if (input.value.trim() !== '') {
                const li = document.createElement('li');
                li.textContent = input.value;
                li.style.cursor = 'pointer';
                li.onclick = function() {
                    this.style.textDecoration = 
                        this.style.textDecoration === 'line-through' ? 
                        'none' : 'line-through';
                };
                list.appendChild(li);
                input.value = '';
            }
        };
    }
}

// Close modal
document.querySelector('.close').onclick = function() {
    document.getElementById('taskModal').style.display = 'none';
};

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('taskModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// Initialize the page
document.addEventListener('DOMContentLoaded', initializeTasks);
