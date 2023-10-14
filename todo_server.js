const express = require('express');
const path = require('path');

const app = express();

// Serve static files
app.use(express.static('public'));
// Use body-parser to handle POST data
//app.use(bodyParser.json());
app.use(express.json());

var todos = [];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'todo.html'));
});

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.post('/add', (req, res) => {
    var task = req.body.task; // req.body.task kommer fra klient, 
    console.log("task added:", task)
    if (task) {
        todos.push(task); // legger til task i todo liste
        res.json({ success: true });
    } else {
        res.json({ success: false, message: "Task is empty" });
    }
});

app.delete('/delete/:index', (req, res) => {
    var index = parseInt(req.params.index);
    if (index >= 0 && index < todos.length) {
        todos.splice(index, 1); // sletter en task på posisjon som kommer fra req.params.index fra klient.
        res.json({ success: true });
    } else {
        res.json({ success: false, message: "Invalid index" });
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

