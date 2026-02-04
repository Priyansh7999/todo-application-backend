const taskService = require("../services/task.service");

class TaskController {
    createTask(req, res) {
        try {
            const task = taskService.createTask(req.body);
            res.status(201).json(task);
        } catch (error) {
            res.status(400).json({
                "error": {
                    "code": "INVALID_TASK_DATA",
                    "message": error.message
                }
            })
        }
    }

    getAllTasks(req, res) {
        try {
            const { status, priority } = req.query;

            const tasks = taskService.getAllTasks({ status, priority });
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({
                "error": {
                    "code": "INTERNAL_SERVER_ERROR",
                    "message": error.message
                }
            })
        }
    }
}


module.exports = new TaskController();