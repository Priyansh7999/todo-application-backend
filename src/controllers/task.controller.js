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
    updateTask(req, res) {
        try {
            const task = taskService.updateTask(req.params.id, req.body);
            res.json(task);
        } catch (err) {
            res.status(404).json({
                "error": {
                    "code": "TASK_NOT_FOUND",
                    "message": err.message
                }
            })
        }
    };


    getSingleTask(req, res) {
        try {
            const { id } = req.params;
            const task = taskService.getTaskById(id);
            res.status(200).json(task);
        } catch (error) {
            res.status(404).json({
                "error": {
                    "code": "TASK_NOT_FOUND",
                    "message": error.message
                }
            })
        }   
    }

   /* To delete a task 
    * @param {object} req - The request object
    * @param {object} res - The response object
    * @return
    */

    deleteTask(req, res) {
        try {
            const { id } = req.params;
            taskService.deleteTask(id);
            res.status(204).json("Task deleted successfully");
        } catch (error) {
            res.status(404).json({
                "error": {
                    "code": "TASK_NOT_FOUND",
                    "message": error.message
                }
            })
        }
    }
}


module.exports = new TaskController();