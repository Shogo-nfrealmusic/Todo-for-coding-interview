const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(express.json());

// ストレージファイルのパス
const STORAGE_FILE = "./tasks.json";

// ストレージの初期化
if (!fs.existsSync(STORAGE_FILE)) {
    fs.writeFileSync(STORAGE_FILE, JSON.stringify([]));
}

// タスクを取得
const getTasks = () => {
    const data = fs.readFileSync(STORAGE_FILE);
    return JSON.parse(data);
};

// タスクを保存
const saveTasks = (tasks) => {
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(tasks, null, 2));
};

// API Endpoints

// Get all tasks
app.get("/api/v1/tasks", (req, res) => {
    const tasks = getTasks();
    res.json(tasks);
});

// Create a new task
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

// Get a task by ID
app.get("/api/v1/tasks/:id", (req, res) => {
    const tasks = getTasks();
    const task = tasks.find((t) => t.id === parseInt(req.params.id));

    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
});

// Update a task by ID
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

// Delete a task by ID
app.delete("/api/v1/tasks/:id", (req, res) => {
    const tasks = getTasks();
    const newTasks = tasks.filter((t) => t.id !== parseInt(req.params.id));

    if (tasks.length === newTasks.length) {
        return res.status(404).json({ error: "Task not found" });
    }

    saveTasks(newTasks);
    res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
