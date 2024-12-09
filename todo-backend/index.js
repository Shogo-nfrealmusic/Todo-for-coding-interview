const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(express.json());

const STORAGE_FILE = "./tasks.json";

if (!fs.existsSync(STORAGE_FILE)) {
    fs.writeFileSync(STORAGE_FILE, JSON.stringify([]));
}

const getTasks = () => {
    const data = fs.readFileSync(STORAGE_FILE);
    return JSON.parse(data);
};

const saveTasks = (tasks) => {
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(tasks, null, 2));
};

// API Endpoints

app.get("/api/v1/tasks", (req, res) => {
    const tasks = getTasks();
    res.json(tasks);
});

app.post("/api/v1/tasks", (req, res) => {
    const { title, description } = req.body;
    const tasks = getTasks();

    const newTask = {
        id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
        title,
        description,
        isDone: false,
    };

    tasks.push(newTask);
    saveTasks(tasks);

    res.status(201).json(newTask);
});

app.get("/api/v1/tasks/:id", (req, res) => {
    const tasks = getTasks();
    const task = tasks.find((t) => t.id === parseInt(req.params.id));

    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
});

app.put("/api/v1/tasks/:id", (req, res) => {
    const { title, description, isDone } = req.body;
    const tasks = getTasks();
    const taskIndex = tasks.findIndex((t) => t.id === parseInt(req.params.id));

    if (taskIndex === -1) {
        return res.status(404).json({ error: "Task not found" });
    }

    tasks[taskIndex] = { ...tasks[taskIndex], title, description, isDone };
    saveTasks(tasks);

    res.json(tasks[taskIndex]);
});

app.delete("/api/v1/tasks/:id", (req, res) => {
    const tasks = getTasks();
    const newTasks = tasks.filter((t) => t.id !== parseInt(req.params.id));

    if (tasks.length === newTasks.length) {
        return res.status(404).json({ error: "Task not found" });
    }

    saveTasks(newTasks);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
