const taskService = require("../services/task.service");

class TaskController {
    createTask(req, res) {
        try {
            const task = taskService.createTask(req.body);
            res.status(201).json(task);
        } catch (error) {
            if (error.message === "TASK_TITLE_EXISTS") {
                return res.status(409).json({ message: "Task title already exists" });
            }

            res.status(500).json({ message: "Internal server error" });
        }
    }

     getAllTasks(req, res) {
        try {
            const { status, priority } = req.query;

            const tasks = taskService.getAllTasks({ status, priority });
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}


module.exports = new TaskController();