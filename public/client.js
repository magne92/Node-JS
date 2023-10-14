document.addEventListener('DOMContentLoaded', loadTodos);

function loadTodos() {
    fetch('/todos')
        .then(res => res.json())
        .then(data => {
            const ul = document.getElementById('todo-list');
            ul.innerHTML = '';
            data.forEach((todo, index) => {
                const li = document.createElement('li');
                li.textContent = todo;
                const btn = document.createElement('button');
                btn.textContent = 'Delete';
                btn.onclick = function() {
                    deleteTodo(index);
                };
                li.appendChild(btn);
                ul.appendChild(li);
            });
        });
}

function addTodo() {
    const task = document.getElementById('task').value;
    fetch('/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task: task })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            loadTodos();
            document.getElementById('task').value = '';
        } else {
            alert(data.message);
        }
    });
}

function deleteTodo(index) {
    fetch(`/delete/${index}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            loadTodos();
        } else {
            alert(data.message);
        }
    });
}
