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

// Aktualna wybrana zadanie
let currentTask = null;

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
    
    // Inicjalizacja przycisków akcji
    document.getElementById('downloadBtn').addEventListener('click', downloadTask);
    document.getElementById('fullscreenBtn').addEventListener('click', openFullscreenPreview);
}

// Show task details in modal
function showTaskDetails(task) {
    const modal = document.getElementById('taskModal');
    const modalTitle = document.getElementById('modalTitle');
    const taskPreview = document.getElementById('taskPreview');
    const taskCode = document.getElementById('taskCode');

    // Zapisz aktualne zadanie
    currentTask = task;

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

// Funkcja pobierania zadania jako plik HTML
function downloadTask() {
    if (!currentTask) return;
    
    // Utwórz zawartość pliku HTML
    const htmlContent = `
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${currentTask.title} - bylezdac</title>
    <style>
        body {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            background-color: #1a1a1a;
            color: #ffffff;
            line-height: 1.6;
            min-height: 100vh;
            padding: 2rem;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background-color: #242424;
            padding: 2rem;
            border-radius: 12px;
        }
        h1 {
            color: #8b5cf6;
            text-align: center;
        }
        .preview {
            background-color: #1a1a1a;
            padding: 2rem;
            border-radius: 8px;
            margin-bottom: 2rem;
        }
        pre {
            background-color: #1a1a1a;
            padding: 1rem;
            border-radius: 8px;
            overflow-x: auto;
            color: #ffffff;
        }
        code {
            font-family: 'Consolas', 'Monaco', monospace;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>${currentTask.title}</h1>
        <h2>Podgląd:</h2>
        <div class="preview">
            ${currentTask.preview}
        </div>
        <h2>Kod źródłowy:</h2>
        <pre><code>${currentTask.code}</code></pre>
    </div>
    <script>
        // Dodaj niezbędne funkcje dla podglądu
        ${currentTask.id === 1 ? `
        function calculate() {
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

            document.getElementById('result').textContent = \`Wynik: \${result}\`;
        }` : ''}
        ${currentTask.id === 2 ? `
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
        }` : ''}
    </script>
</body>
</html>`;

    // Utwórz blob i link do pobrania
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = `${currentTask.title.toLowerCase().replace(/\s+/g, '-')}.html`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    setTimeout(() => {
        URL.revokeObjectURL(url);
    }, 100);
}

// Funkcja otwierająca pełnoekranowy podgląd
function openFullscreenPreview() {
    if (!currentTask) return;
    
    // Utwórz element pełnoekranowego podglądu
    const fullscreenElement = document.createElement('div');
    fullscreenElement.className = 'fullscreen-preview';
    
    fullscreenElement.innerHTML = `
        <span class="close-fullscreen">&times;</span>
        <div class="preview-content">
            <h1>${currentTask.title}</h1>
            <div class="preview-container">
                ${currentTask.preview}
            </div>
        </div>
    `;
    
    document.body.appendChild(fullscreenElement);
    
    // Dodaj funkcję zamykania
    const closeButton = fullscreenElement.querySelector('.close-fullscreen');
    closeButton.addEventListener('click', () => {
        document.body.removeChild(fullscreenElement);
    });
    
    // Dodaj niezbędne funkcje dla podglądu
    if (currentTask.id === 1) {
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
    } else if (currentTask.id === 2) {
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
